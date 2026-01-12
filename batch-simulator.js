// Batch Cartonization Simulator
// Analyzes historical orders against current box inventory to find gaps

const fs = require('fs');
const { BP3D } = require('binpackingjs');
const { Container, Item: EBAFITItem, PackingService } = require('3d-bin-packing-ts');

const { Item: BPItem, Bin, Packer } = BP3D;

// ============================================================
// Data Loading
// ============================================================

function loadTSV(filepath, keyField = null) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split('\t').map(h => h.replace(/"/g, '').trim());
  
  const rows = lines.slice(1).map(line => {
    const values = line.split('\t');
    const row = {};
    headers.forEach((h, i) => {
      let val = values[i] || '';
      val = val.replace(/"/g, '').trim();
      row[h] = val;
    });
    return row;
  });

  if (keyField) {
    const map = {};
    rows.forEach(row => {
      map[row[keyField]] = row;
    });
    return map;
  }
  return rows;
}

function loadBoxes(filepath) {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  // For now, just Texas Art boxes - this is the gap analysis focus
  return data.texasArt.map(box => ({
    name: box.name,
    length: box.length,
    width: box.width,
    height: box.height,
    max_weight: box.max_weight,
    box_weight: box.box_weight,
    volume: box.length * box.width * box.height
  })).sort((a, b) => a.volume - b.volume);
}

function groupOrdersByID(salesRows) {
  const orders = {};
  salesRows.forEach(row => {
    const orderId = row.SALESID;
    const sku = row.ITEMID;
    const qty = Math.max(1, Math.round(parseFloat(row.QTYORDERED) || 1));
    
    if (!orders[orderId]) {
      orders[orderId] = {
        orderId,
        destinationZip: row.DELIVERYZIPCODE || '',
        items: []
      };
    }
    orders[orderId].items.push({ sku, quantity: qty });
  });
  return orders;
}

// ============================================================
// Packing Logic (simplified from browser-entry.js)
// ============================================================

function expandItems(items, products) {
  const expanded = [];
  let skipped = [];
  
  items.forEach(item => {
    const product = products[item.sku];
    if (!product) {
      skipped.push(item.sku);
      return;
    }
    
    const length = parseFloat(product.LENGTH) || 0;
    const width = parseFloat(product.WIDTH) || 0;
    const height = parseFloat(product.HEIGHT) || 0;
    const weight = parseFloat(product.WEIGHT) || 0;
    
    if (length <= 0 || width <= 0 || height <= 0) {
      skipped.push(item.sku);
      return;
    }
    
    const qty = item.quantity || 1;
    for (let i = 0; i < qty; i++) {
      // Sort dimensions largest to smallest
      const dims = [length, width, height].sort((a, b) => b - a);
      expanded.push({
        sku: item.sku,
        length: dims[0],
        width: dims[1],
        height: dims[2],
        weight: weight
      });
    }
  });
  
  return { expanded, skipped };
}

function calculateTotals(items) {
  return {
    weight: items.reduce((sum, i) => sum + i.weight, 0),
    volume: items.reduce((sum, i) => sum + i.length * i.width * i.height, 0),
    count: items.length
  };
}

function getValidBoxes(items, boxes) {
  const totals = calculateTotals(items);
  
  // Find minimum dimensions needed (largest item in each dimension)
  const allDims = items.map(i => [i.length, i.width, i.height].sort((a, b) => b - a));
  const minDims = [
    Math.max(...allDims.map(d => d[0])),
    Math.max(...allDims.map(d => d[1])),
    Math.max(...allDims.map(d => d[2]))
  ].sort((a, b) => b - a);
  
  return boxes.filter(box => {
    if (totals.weight > box.max_weight) return false;
    const boxDims = [box.length, box.width, box.height].sort((a, b) => b - a);
    if (minDims[0] > boxDims[0] || minDims[1] > boxDims[1] || minDims[2] > boxDims[2]) {
      return false;
    }
    return true;
  });
}

function tryPackFFD(items, box) {
  const packer = new Packer();
  packer.addBin(new Bin('box', box.length, box.height, box.width, box.max_weight || 1000));
  
  const sorted = [...items].sort((a, b) => 
    (b.length * b.width * b.height) - (a.length * a.width * a.height)
  );
  
  sorted.forEach((item, i) => {
    packer.addItem(new BPItem(
      `item_${i}`,
      item.length,
      item.height,
      item.width,
      item.weight
    ));
  });
  
  packer.pack();
  
  const packedBin = packer.bins[0];
  if (!packedBin || !packedBin.items) {
    return { packed: 0, total: items.length };
  }
  
  return { packed: packedBin.items.length, total: items.length };
}

function packOrder(items, boxes, products) {
  const { expanded, skipped } = expandItems(items, products);
  
  if (expanded.length === 0) {
    return { 
      success: false, 
      reason: 'no_valid_items',
      skippedSkus: skipped 
    };
  }
  
  if (skipped.length > 0) {
    return { 
      success: false, 
      reason: 'missing_skus',
      skippedSkus: skipped 
    };
  }
  
  const totals = calculateTotals(expanded);
  const validBoxes = getValidBoxes(expanded, boxes);
  
  if (validBoxes.length === 0) {
    return { 
      success: false, 
      reason: 'no_valid_box',
      totals,
      expanded
    };
  }
  
  // Try each box, smallest first
  for (const box of validBoxes) {
    const result = tryPackFFD(expanded, box);
    if (result.packed === result.total) {
      const efficiency = (totals.volume / box.volume) * 100;
      return {
        success: true,
        box: box.name,
        boxVolume: box.volume,
        boxDims: { l: box.length, w: box.width, h: box.height },
        itemsVolume: totals.volume,
        itemsWeight: totals.weight,
        itemCount: expanded.length,
        efficiency: Math.round(efficiency * 10) / 10,
        idealBoxVolume: totals.volume * 1.3 // rough estimate with some headroom
      };
    }
  }
  
  // Couldn't fit in any box
  return {
    success: false,
    reason: 'packing_failed',
    totals,
    expanded,
    triedBoxes: validBoxes.length
  };
}

// ============================================================
// Analysis
// ============================================================

function analyzeResults(results) {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  // Failure breakdown
  const failureReasons = {};
  failed.forEach(r => {
    failureReasons[r.reason] = (failureReasons[r.reason] || 0) + 1;
  });
  
  // Box usage distribution
  const boxUsage = {};
  successful.forEach(r => {
    boxUsage[r.box] = (boxUsage[r.box] || 0) + 1;
  });
  
  // Efficiency distribution
  const efficiencyBuckets = {
    'excellent (>70%)': 0,
    'good (50-70%)': 0,
    'fair (30-50%)': 0,
    'poor (<30%)': 0
  };
  
  successful.forEach(r => {
    if (r.efficiency > 70) efficiencyBuckets['excellent (>70%)']++;
    else if (r.efficiency > 50) efficiencyBuckets['good (50-70%)']++;
    else if (r.efficiency > 30) efficiencyBuckets['fair (30-50%)']++;
    else efficiencyBuckets['poor (<30%)']++;
  });
  
  // Low efficiency orders - candidates for box gap analysis
  const lowEfficiencyOrders = successful
    .filter(r => r.efficiency < 40)
    .map(r => ({
      orderId: r.orderId,
      box: r.box,
      efficiency: r.efficiency,
      itemsVolume: r.itemsVolume,
      boxVolume: r.boxVolume,
      idealBoxVolume: r.idealBoxVolume,
      itemCount: r.itemCount
    }));
  
  // Cluster ideal box sizes for low-efficiency orders
  const idealBoxAnalysis = analyzeIdealBoxes(lowEfficiencyOrders);
  
  return {
    summary: {
      totalOrders: results.length,
      successful: successful.length,
      failed: failed.length,
      successRate: ((successful.length / results.length) * 100).toFixed(1) + '%'
    },
    failureReasons,
    boxUsage: Object.entries(boxUsage)
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [k, v]) => { obj[k] = v; return obj; }, {}),
    efficiencyDistribution: efficiencyBuckets,
    lowEfficiencyCount: lowEfficiencyOrders.length,
    idealBoxAnalysis
  };
}

function analyzeIdealBoxes(lowEfficiencyOrders) {
  if (lowEfficiencyOrders.length === 0) return [];
  
  // Group by volume ranges to identify common gap sizes
  const volumeRanges = [
    { min: 0, max: 100, label: '0-100 cu.in.' },
    { min: 100, max: 200, label: '100-200 cu.in.' },
    { min: 200, max: 400, label: '200-400 cu.in.' },
    { min: 400, max: 700, label: '400-700 cu.in.' },
    { min: 700, max: 1000, label: '700-1000 cu.in.' },
    { min: 1000, max: 1500, label: '1000-1500 cu.in.' },
    { min: 1500, max: 2500, label: '1500-2500 cu.in.' },
    { min: 2500, max: 5000, label: '2500-5000 cu.in.' },
    { min: 5000, max: Infinity, label: '5000+ cu.in.' }
  ];
  
  const rangeAnalysis = volumeRanges.map(range => {
    const ordersInRange = lowEfficiencyOrders.filter(
      o => o.idealBoxVolume >= range.min && o.idealBoxVolume < range.max
    );
    
    if (ordersInRange.length === 0) return null;
    
    const avgIdealVolume = ordersInRange.reduce((sum, o) => sum + o.idealBoxVolume, 0) / ordersInRange.length;
    const currentBoxes = {};
    ordersInRange.forEach(o => {
      currentBoxes[o.box] = (currentBoxes[o.box] || 0) + 1;
    });
    
    return {
      range: range.label,
      orderCount: ordersInRange.length,
      avgIdealVolume: Math.round(avgIdealVolume),
      forcedIntoBoxes: currentBoxes
    };
  }).filter(Boolean);
  
  return rangeAnalysis;
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log('Loading data...');
  
  const products = loadTSV('./PIM_SKU_DATA.tsv', 'SKU');
  console.log(`  Products loaded: ${Object.keys(products).length}`);
  
  const salesRows = loadTSV('./SALES_DATA.tsv');
  console.log(`  Sales rows loaded: ${salesRows.length}`);
  
  const orders = groupOrdersByID(salesRows);
  const orderList = Object.values(orders);
  console.log(`  Unique orders: ${orderList.length}`);
  
  const boxes = loadBoxes('./boxes.json');
  console.log(`  Boxes loaded: ${boxes.length}`);
  console.log('');
  
  console.log('Running simulation...');
  const startTime = Date.now();
  
  const results = [];
  let processed = 0;
  
  for (const order of orderList) {
    const result = packOrder(order.items, boxes, products);
    result.orderId = order.orderId;
    result.destinationZip = order.destinationZip;
    results.push(result);
    
    processed++;
    if (processed % 5000 === 0) {
      console.log(`  Processed ${processed} / ${orderList.length} orders...`);
    }
  }
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Completed in ${elapsed}s`);
  console.log('');
  
  console.log('Analyzing results...');
  const analysis = analyzeResults(results);
  
  // Output
  console.log('\n' + '='.repeat(60));
  console.log('BATCH SIMULATION RESULTS');
  console.log('='.repeat(60));
  
  console.log('\n--- Summary ---');
  console.log(`Total orders:    ${analysis.summary.totalOrders}`);
  console.log(`Successful:      ${analysis.summary.successful}`);
  console.log(`Failed:          ${analysis.summary.failed}`);
  console.log(`Success rate:    ${analysis.summary.successRate}`);
  
  console.log('\n--- Failure Reasons ---');
  Object.entries(analysis.failureReasons).forEach(([reason, count]) => {
    console.log(`  ${reason}: ${count}`);
  });
  
  console.log('\n--- Box Usage (Top 10) ---');
  Object.entries(analysis.boxUsage).slice(0, 10).forEach(([box, count]) => {
    const pct = ((count / analysis.summary.successful) * 100).toFixed(1);
    console.log(`  ${box}: ${count} (${pct}%)`);
  });
  
  console.log('\n--- Fill Efficiency Distribution ---');
  Object.entries(analysis.efficiencyDistribution).forEach(([bucket, count]) => {
    const pct = ((count / analysis.summary.successful) * 100).toFixed(1);
    console.log(`  ${bucket}: ${count} (${pct}%)`);
  });
  
  console.log('\n--- Box Gap Analysis ---');
  console.log(`Orders with <40% fill efficiency: ${analysis.lowEfficiencyCount}`);
  console.log('\nIdeal box volume ranges for low-efficiency orders:');
  analysis.idealBoxAnalysis.forEach(range => {
    console.log(`\n  ${range.range}: ${range.orderCount} orders`);
    console.log(`    Avg ideal volume: ~${range.avgIdealVolume} cu.in.`);
    console.log('    Currently forced into:');
    Object.entries(range.forcedIntoBoxes).forEach(([box, count]) => {
      console.log(`      - ${box}: ${count}`);
    });
  });
  
  // Save detailed results
  const outputPath = './simulation_results.json';
  fs.writeFileSync(outputPath, JSON.stringify({
    analysis,
    timestamp: new Date().toISOString(),
    config: {
      boxInventory: 'texasArt only',
      algorithm: 'FFD'
    }
  }, null, 2));
  console.log(`\nDetailed results saved to: ${outputPath}`);
}

main().catch(console.error);
