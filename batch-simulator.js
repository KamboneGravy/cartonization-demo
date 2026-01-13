// Batch Cartonization Simulator v2
// ================================
// Features:
// 1. Texas Art boxes + Candidate boxes + USPS Flat Rate boxes
// 2. Algorithm comparison (FFD vs EB-AFIT)
// 3. Prepares data for rate lookups
//
// Run: node batch-simulator.js

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
  
  const processBoxes = (boxes, category) => boxes.map(box => ({
    name: box.name,
    length: box.length,
    width: box.width,
    height: box.height,
    max_weight: box.max_weight,
    box_weight: box.box_weight || 0,
    volume: box.length * box.width * box.height,
    category: category,
    candidate: box.candidate || false,
    flatRate: box.flat_rate || false,
    carrier: box.carrier || null
  }));
  
  const texasArt = processBoxes(data.texasArt || [], 'texasArt');
  const candidates = processBoxes(data.candidates || [], 'candidate');
  const usps = processBoxes(data.usps || [], 'usps');
  
  return {
    texasArt: texasArt.sort((a, b) => a.volume - b.volume),
    candidates: candidates.sort((a, b) => a.volume - b.volume),
    usps: usps.sort((a, b) => a.volume - b.volume),
    // Combined sets for different simulation scenarios
    current: texasArt.sort((a, b) => a.volume - b.volume),
    withCandidates: [...texasArt, ...candidates].sort((a, b) => a.volume - b.volume),
    withUSPS: [...texasArt, ...usps].sort((a, b) => a.volume - b.volume),
    all: [...texasArt, ...candidates, ...usps].sort((a, b) => a.volume - b.volume)
  };
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
// Item Processing
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
      const dims = [length, width, height].sort((a, b) => b - a);
      expanded.push({
        sku: item.sku,
        length: dims[0],
        width: dims[1],
        height: dims[2],
        weight: weight,
        originalIndex: expanded.length
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

// ============================================================
// Packing Algorithms
// ============================================================

function tryPackFFD(items, box) {
  const packer = new Packer();
  packer.addBin(new Bin('box', box.length, box.height, box.width, box.max_weight || 1000));
  
  const sorted = [...items].sort((a, b) => 
    (b.length * b.width * b.height) - (a.length * a.width * a.height)
  );
  
  sorted.forEach((item, i) => {
    packer.addItem(new BPItem(
      `item_${item.originalIndex}`,
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

function tryPackEBAFIT(items, box) {
  try {
    const container = new Container('box', box.length, box.width, box.height);
    
    const ebafitItems = items.map((item, i) => 
      new EBAFITItem(`item_${item.originalIndex}`, item.length, item.width, item.height, 1)
    );
    
    const result = PackingService.packSingle(container, ebafitItems);
    const packResult = result.algorithmPackingResults[0];
    
    if (!packResult) {
      return { packed: 0, total: items.length };
    }
    
    return { packed: packResult.packedItems.length, total: items.length };
  } catch (e) {
    // EB-AFIT can throw on edge cases
    return { packed: 0, total: items.length };
  }
}

// ============================================================
// Order Packing (Single Algorithm)
// ============================================================

function packOrderWithAlgorithm(items, boxes, products, algorithm = 'ffd') {
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
  
  const tryPack = algorithm === 'ebafit' ? tryPackEBAFIT : tryPackFFD;
  
  for (const box of validBoxes) {
    const result = tryPack(expanded, box);
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
        category: box.category,
        flatRate: box.flatRate,
        carrier: box.carrier
      };
    }
  }
  
  return {
    success: false,
    reason: 'packing_failed',
    totals,
    expanded,
    triedBoxes: validBoxes.length
  };
}

// ============================================================
// Analysis Functions
// ============================================================

function analyzeResults(results, label = '') {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  const failureReasons = {};
  failed.forEach(r => {
    failureReasons[r.reason] = (failureReasons[r.reason] || 0) + 1;
  });
  
  const boxUsage = {};
  successful.forEach(r => {
    boxUsage[r.box] = (boxUsage[r.box] || 0) + 1;
  });
  
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
  
  // USPS Flat Rate analysis
  const flatRateUsage = {};
  successful.forEach(r => {
    if (r.flatRate) {
      flatRateUsage[r.box] = (flatRateUsage[r.box] || 0) + 1;
    }
  });
  
  const lowEfficiencyOrders = successful
    .filter(r => r.efficiency < 40)
    .map(r => ({
      orderId: r.orderId,
      box: r.box,
      efficiency: r.efficiency,
      itemsVolume: r.itemsVolume,
      boxVolume: r.boxVolume,
      idealBoxVolume: r.itemsVolume * 1.3,
      itemCount: r.itemCount
    }));
  
  const idealBoxAnalysis = analyzeIdealBoxes(lowEfficiencyOrders);
  
  return {
    label,
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
    flatRateUsage,
    efficiencyDistribution: efficiencyBuckets,
    lowEfficiencyCount: lowEfficiencyOrders.length,
    idealBoxAnalysis
  };
}

function analyzeIdealBoxes(lowEfficiencyOrders) {
  if (lowEfficiencyOrders.length === 0) return [];
  
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
  
  return volumeRanges.map(range => {
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
}

function analyzeCandidateImpact(baselineResults, candidateResults, candidateBoxes) {
  const impact = {};
  
  candidateBoxes.forEach(box => {
    impact[box.name] = {
      name: box.name,
      volume: box.volume,
      dims: `${box.length}x${box.width}x${box.height}`,
      ordersCaptured: 0,
      previousBoxes: {},
      efficiencyBefore: [],
      efficiencyAfter: []
    };
  });
  
  baselineResults.forEach((baseline, i) => {
    const withCandidate = candidateResults[i];
    
    if (!baseline.success || !withCandidate.success) return;
    if (baseline.box === withCandidate.box) return;
    
    // Check if new box is a candidate
    const candidateBox = candidateBoxes.find(b => b.name === withCandidate.box);
    if (candidateBox && impact[withCandidate.box]) {
      const candidate = impact[withCandidate.box];
      candidate.ordersCaptured++;
      candidate.previousBoxes[baseline.box] = (candidate.previousBoxes[baseline.box] || 0) + 1;
      candidate.efficiencyBefore.push(baseline.efficiency);
      candidate.efficiencyAfter.push(withCandidate.efficiency);
    }
  });
  
  const results = Object.values(impact)
    .map(c => ({
      ...c,
      avgEfficiencyBefore: c.efficiencyBefore.length > 0 
        ? Math.round(c.efficiencyBefore.reduce((a, b) => a + b, 0) / c.efficiencyBefore.length * 10) / 10
        : 0,
      avgEfficiencyAfter: c.efficiencyAfter.length > 0
        ? Math.round(c.efficiencyAfter.reduce((a, b) => a + b, 0) / c.efficiencyAfter.length * 10) / 10
        : 0
    }))
    .filter(c => c.ordersCaptured > 0)
    .sort((a, b) => b.ordersCaptured - a.ordersCaptured);
  
  let cumulative = 0;
  results.forEach(r => {
    cumulative += r.ordersCaptured;
    r.cumulativeOrders = cumulative;
  });
  
  return results;
}

function analyzeUSPSFlatRateImpact(baselineResults, uspsResults, uspsBoxes) {
  const impact = {};
  
  uspsBoxes.forEach(box => {
    impact[box.name] = {
      name: box.name,
      volume: box.volume,
      dims: `${box.length}x${box.width}x${box.height}`,
      ordersCaptured: 0,
      previousBoxes: {},
      orderWeights: []
    };
  });
  
  baselineResults.forEach((baseline, i) => {
    const withUSPS = uspsResults[i];
    
    if (!baseline.success || !withUSPS.success) return;
    if (baseline.box === withUSPS.box) return;
    
    // Check if new box is USPS flat rate
    const uspsBox = uspsBoxes.find(b => b.name === withUSPS.box);
    if (uspsBox && impact[withUSPS.box]) {
      const uspsImpact = impact[withUSPS.box];
      uspsImpact.ordersCaptured++;
      uspsImpact.previousBoxes[baseline.box] = (uspsImpact.previousBoxes[baseline.box] || 0) + 1;
      uspsImpact.orderWeights.push(withUSPS.itemsWeight);
    }
  });
  
  return Object.values(impact)
    .map(u => ({
      ...u,
      avgWeight: u.orderWeights.length > 0
        ? Math.round(u.orderWeights.reduce((a, b) => a + b, 0) / u.orderWeights.length * 100) / 100
        : 0,
      maxWeight: u.orderWeights.length > 0 ? Math.max(...u.orderWeights) : 0,
      minWeight: u.orderWeights.length > 0 ? Math.min(...u.orderWeights) : 0
    }))
    .filter(u => u.ordersCaptured > 0)
    .sort((a, b) => b.ordersCaptured - a.ordersCaptured);
}

function compareAlgorithms(ffdResults, ebafitResults) {
  let ffdWins = 0;
  let ebafitWins = 0;
  let ties = 0;
  let bothFailed = 0;
  
  const differences = [];
  
  ffdResults.forEach((ffd, i) => {
    const ebafit = ebafitResults[i];
    
    if (!ffd.success && !ebafit.success) {
      bothFailed++;
      return;
    }
    
    if (ffd.success && !ebafit.success) {
      ffdWins++;
      return;
    }
    
    if (!ffd.success && ebafit.success) {
      ebafitWins++;
      return;
    }
    
    // Both succeeded - compare box sizes
    if (ffd.boxVolume < ebafit.boxVolume) {
      ffdWins++;
      differences.push({
        orderId: ffd.orderId,
        winner: 'ffd',
        ffdBox: ffd.box,
        ebafitBox: ebafit.box,
        volumeDiff: ebafit.boxVolume - ffd.boxVolume
      });
    } else if (ebafit.boxVolume < ffd.boxVolume) {
      ebafitWins++;
      differences.push({
        orderId: ebafit.orderId,
        winner: 'ebafit',
        ffdBox: ffd.box,
        ebafitBox: ebafit.box,
        volumeDiff: ffd.boxVolume - ebafit.boxVolume
      });
    } else {
      ties++;
    }
  });
  
  return {
    ffdWins,
    ebafitWins,
    ties,
    bothFailed,
    totalCompared: ffdResults.length,
    significantDifferences: differences.length,
    sampleDifferences: differences.slice(0, 10)
  };
}

// ============================================================
// Simulation Runner
// ============================================================

function runSimulation(orderList, boxes, products, algorithm, label) {
  console.log(`Running ${label}...`);
  const startTime = Date.now();
  const results = [];
  let processed = 0;
  
  for (const order of orderList) {
    const result = packOrderWithAlgorithm(order.items, boxes, products, algorithm);
    result.orderId = order.orderId;
    result.destinationZip = order.destinationZip;
    results.push(result);
    
    processed++;
    if (processed % 10000 === 0) {
      console.log(`  Processed ${processed} / ${orderList.length} orders...`);
    }
  }
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Completed in ${elapsed}s`);
  
  return results;
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log('='.repeat(60));
  console.log('BATCH CARTONIZATION SIMULATOR v2');
  console.log('='.repeat(60));
  console.log('');
  
  console.log('Loading data...');
  
  const products = loadTSV('./PIM_SKU_DATA.tsv', 'SKU');
  console.log(`  Products loaded: ${Object.keys(products).length}`);
  
  const salesRows = loadTSV('./SALES_DATA.tsv');
  console.log(`  Sales rows loaded: ${salesRows.length}`);
  
  const orders = groupOrdersByID(salesRows);
  const orderList = Object.values(orders);
  console.log(`  Unique orders: ${orderList.length}`);
  
  const boxes = loadBoxes('./boxes.json');
  console.log(`  Texas Art boxes: ${boxes.texasArt.length}`);
  console.log(`  Candidate boxes: ${boxes.candidates.length}`);
  console.log(`  USPS Flat Rate boxes: ${boxes.usps.length}`);
  console.log('');
  
  // ========== SIMULATION 1: Baseline FFD (Texas Art only) ==========
  const baselineFFD = runSimulation(orderList, boxes.current, products, 'ffd', 'Baseline FFD (Texas Art boxes)');
  
  // ========== SIMULATION 2: Baseline EB-AFIT (Texas Art only) ==========
  const baselineEBAFIT = runSimulation(orderList, boxes.current, products, 'ebafit', 'Baseline EB-AFIT (Texas Art boxes)');
  
  // ========== SIMULATION 3: With Candidates (FFD) ==========
  const withCandidatesFFD = runSimulation(orderList, boxes.withCandidates, products, 'ffd', 'With Candidates FFD');
  
  // ========== SIMULATION 4: With USPS Flat Rate (FFD) ==========
  const withUSPSFFD = runSimulation(orderList, boxes.withUSPS, products, 'ffd', 'With USPS Flat Rate FFD');
  
  // ========== SIMULATION 5: All boxes (FFD) ==========
  const allBoxesFFD = runSimulation(orderList, boxes.all, products, 'ffd', 'All Boxes FFD');
  
  console.log('');
  console.log('Analyzing results...');
  
  // Analyses
  const baselineFFDAnalysis = analyzeResults(baselineFFD, 'Baseline FFD');
  const baselineEBAFITAnalysis = analyzeResults(baselineEBAFIT, 'Baseline EB-AFIT');
  const withCandidatesAnalysis = analyzeResults(withCandidatesFFD, 'With Candidates');
  const withUSPSAnalysis = analyzeResults(withUSPSFFD, 'With USPS Flat Rate');
  const allBoxesAnalysis = analyzeResults(allBoxesFFD, 'All Boxes');
  
  // Comparisons
  const algorithmComparison = compareAlgorithms(baselineFFD, baselineEBAFIT);
  const candidateImpact = analyzeCandidateImpact(baselineFFD, withCandidatesFFD, boxes.candidates);
  const uspsImpact = analyzeUSPSFlatRateImpact(baselineFFD, withUSPSFFD, boxes.usps);
  
  // ========== CONSOLE OUTPUT ==========
  console.log('');
  console.log('='.repeat(60));
  console.log('RESULTS SUMMARY');
  console.log('='.repeat(60));
  
  console.log('\n--- Baseline (Texas Art boxes only) ---');
  console.log(`Total orders:    ${baselineFFDAnalysis.summary.totalOrders}`);
  console.log(`Successful:      ${baselineFFDAnalysis.summary.successful}`);
  console.log(`Failed:          ${baselineFFDAnalysis.summary.failed}`);
  console.log(`Success rate:    ${baselineFFDAnalysis.summary.successRate}`);
  
  console.log('\n--- Efficiency Distribution (Baseline FFD) ---');
  Object.entries(baselineFFDAnalysis.efficiencyDistribution).forEach(([bucket, count]) => {
    const pct = ((count / baselineFFDAnalysis.summary.successful) * 100).toFixed(1);
    console.log(`  ${bucket}: ${count} (${pct}%)`);
  });
  
  console.log('\n--- Algorithm Comparison (FFD vs EB-AFIT) ---');
  console.log(`  FFD wins (smaller box):     ${algorithmComparison.ffdWins}`);
  console.log(`  EB-AFIT wins (smaller box): ${algorithmComparison.ebafitWins}`);
  console.log(`  Ties (same box):            ${algorithmComparison.ties}`);
  console.log(`  Both failed:                ${algorithmComparison.bothFailed}`);
  
  console.log('\n--- Candidate Box Impact ---');
  console.log(`Poor efficiency baseline: ${baselineFFDAnalysis.efficiencyDistribution['poor (<30%)']} orders`);
  console.log(`Poor efficiency with candidates: ${withCandidatesAnalysis.efficiencyDistribution['poor (<30%)']} orders`);
  console.log(`Improvement: ${baselineFFDAnalysis.efficiencyDistribution['poor (<30%)'] - withCandidatesAnalysis.efficiencyDistribution['poor (<30%)']} orders`);
  
  if (candidateImpact.length > 0) {
    console.log('\nTop candidate boxes:');
    candidateImpact.slice(0, 5).forEach((c, i) => {
      console.log(`  ${i+1}. ${c.dims} (${c.volume} cu.in.): ${c.ordersCaptured} orders, efficiency ${c.avgEfficiencyBefore}% → ${c.avgEfficiencyAfter}%`);
    });
  }
  
  console.log('\n--- USPS Flat Rate Impact ---');
  if (uspsImpact.length > 0) {
    console.log('Orders that could use USPS Flat Rate:');
    uspsImpact.forEach(u => {
      console.log(`  ${u.name}: ${u.ordersCaptured} orders`);
      console.log(`    Weight range: ${u.minWeight.toFixed(2)} - ${u.maxWeight.toFixed(2)} lbs (avg: ${u.avgWeight.toFixed(2)} lbs)`);
    });
  } else {
    console.log('  No orders would benefit from USPS Flat Rate boxes');
  }
  
  // ========== SAVE RESULTS ==========
  const outputPath = './simulation_results.json';
  const output = {
    timestamp: new Date().toISOString(),
    config: {
      boxInventory: 'texasArt',
      candidateBoxes: boxes.candidates.map(b => b.name),
      uspsBoxes: boxes.usps.map(b => b.name),
      algorithms: ['ffd', 'ebafit']
    },
    analysis: baselineFFDAnalysis,
    algorithmComparison,
    candidateAnalysis: {
      summary: withCandidatesAnalysis.summary,
      efficiencyDistribution: withCandidatesAnalysis.efficiencyDistribution,
      boxUsage: withCandidatesAnalysis.boxUsage
    },
    candidateImpact,
    uspsAnalysis: {
      summary: withUSPSAnalysis.summary,
      efficiencyDistribution: withUSPSAnalysis.efficiencyDistribution,
      flatRateUsage: withUSPSAnalysis.flatRateUsage
    },
    uspsImpact,
    allBoxesAnalysis: {
      summary: allBoxesAnalysis.summary,
      efficiencyDistribution: allBoxesAnalysis.efficiencyDistribution,
      boxUsage: allBoxesAnalysis.boxUsage
    },
    // Data for rate lookups - orders that could use different boxes
    rateComparisonData: {
      totalSuccessfulOrders: baselineFFD.filter(r => r.success).length,
      ordersForUSPSComparison: uspsImpact.reduce((sum, u) => sum + u.ordersCaptured, 0),
      ordersForCandidateComparison: candidateImpact.reduce((sum, c) => sum + c.ordersCaptured, 0)
    }
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);
  
  // Save detailed data for rate lookups
  const rateDataPath = './rate_comparison_orders.json';
  const rateData = {
    timestamp: new Date().toISOString(),
    // Orders where USPS flat rate could be used
    uspsEligibleOrders: baselineFFD
      .map((baseline, i) => {
        const withUSPS = withUSPSFFD[i];
        if (!baseline.success || !withUSPS.success) return null;
        if (!withUSPS.flatRate) return null;
        
        return {
          orderId: baseline.orderId,
          destinationZip: baseline.destinationZip,
          currentBox: baseline.box,
          currentBoxDims: baseline.boxDims,
          uspsBox: withUSPS.box,
          uspsBoxDims: withUSPS.boxDims,
          itemsWeight: baseline.itemsWeight,
          itemsVolume: baseline.itemsVolume
        };
      })
      .filter(Boolean),
    // Orders where candidate boxes improve efficiency
    candidateEligibleOrders: baselineFFD
      .map((baseline, i) => {
        const withCandidate = withCandidatesFFD[i];
        if (!baseline.success || !withCandidate.success) return null;
        if (baseline.box === withCandidate.box) return null;
        
        const candidateBox = boxes.candidates.find(b => b.name === withCandidate.box);
        if (!candidateBox) return null;
        
        return {
          orderId: baseline.orderId,
          destinationZip: baseline.destinationZip,
          currentBox: baseline.box,
          currentBoxDims: baseline.boxDims,
          candidateBox: withCandidate.box,
          candidateBoxDims: withCandidate.boxDims,
          itemsWeight: baseline.itemsWeight,
          itemsVolume: baseline.itemsVolume,
          efficiencyBefore: baseline.efficiency,
          efficiencyAfter: withCandidate.efficiency
        };
      })
      .filter(Boolean)
  };
  
  fs.writeFileSync(rateDataPath, JSON.stringify(rateData, null, 2));
  console.log(`Rate comparison data saved to: ${rateDataPath}`);
}

main().catch(console.error);
