// test-algorithm-accuracy.js
// Tests whether binpackingjs finds truly optimal boxes or leaves gaps

const { BP3D } = require('binpackingjs');
const { Item, Bin, Packer } = BP3D;

const SCALE = 100000;

// Test case 1: Four identical cubes (known optimal: 2×2×1 arrangement)
function testIdenticalCubes() {
  console.log('\n=== TEST 1: Four 5×5×5 cubes ===');
  console.log('Optimal: 10×10×5 = 500 cu in (2×2×1 grid)');
  
  const packer = new Packer();
  packer.addBin(new Bin('test', 50, 50, 50, 1000)); // Big enough for any arrangement
  
  for (let i = 0; i < 4; i++) {
    packer.addItem(new Item(`cube_${i}`, 5, 5, 5, 1));
  }
  
  packer.pack();
  const bin = packer.bins[0];
  
  let maxX = 0, maxY = 0, maxZ = 0;
  bin.items.forEach(item => {
    const dims = item.getDimension();
    maxX = Math.max(maxX, item.position[0] + dims[0]);
    maxY = Math.max(maxY, item.position[1] + dims[1]);
    maxZ = Math.max(maxZ, item.position[2] + dims[2]);
  });
  
  const result = [(maxX/SCALE), (maxY/SCALE), (maxZ/SCALE)].sort((a,b) => b-a);
  const volume = result[0] * result[1] * result[2];
  
  console.log(`FFD Result: ${result[0]}×${result[1]}×${result[2]} = ${volume} cu in`);
  console.log(`Gap: ${((volume - 500) / 500 * 100).toFixed(1)}% wasted space`);
}

// Test case 2: Mixed items (realistic art supplies)
function testMixedItems() {
  console.log('\n=== TEST 2: Mixed art supplies ===');
  
  const items = [
    { name: 'book1', l: 11, w: 8.5, h: 0.8 },
    { name: 'book2', l: 10, w: 8, h: 0.5 },
    { name: 'palette', l: 12, w: 4, h: 0.7 },
    { name: 'brush_set', l: 10, w: 3.5, h: 1 },
  ];
  
  const totalItemVolume = items.reduce((sum, i) => sum + i.l * i.w * i.h, 0);
  console.log(`Total item volume: ${totalItemVolume.toFixed(1)} cu in`);
  console.log(`Theoretical minimum (100% efficiency): ${totalItemVolume.toFixed(1)} cu in`);
  
  const packer = new Packer();
  packer.addBin(new Bin('test', 50, 50, 50, 1000));
  
  items.forEach((item, i) => {
    packer.addItem(new Item(item.name, item.l, item.w, item.h, 1));
  });
  
  packer.pack();
  const bin = packer.bins[0];
  
  let maxX = 0, maxY = 0, maxZ = 0;
  bin.items.forEach(item => {
    const dims = item.getDimension();
    maxX = Math.max(maxX, item.position[0] + dims[0]);
    maxY = Math.max(maxY, item.position[1] + dims[1]);
    maxZ = Math.max(maxZ, item.position[2] + dims[2]);
  });
  
  const result = [(maxX/SCALE), (maxY/SCALE), (maxZ/SCALE)].sort((a,b) => b-a);
  const volume = result[0] * result[1] * result[2];
  const efficiency = (totalItemVolume / volume * 100);
  
  console.log(`FFD Result: ${result[0].toFixed(1)}×${result[1].toFixed(1)}×${result[2].toFixed(1)} = ${volume.toFixed(1)} cu in`);
  console.log(`Packing efficiency: ${efficiency.toFixed(1)}%`);
  console.log(`Wasted space: ${(100 - efficiency).toFixed(1)}%`);
}

// Test case 3: Same items, different orderings
function testOrderingImpact() {
  console.log('\n=== TEST 3: Same items, different orderings ===');
  
  const items = [
    { name: 'large', l: 12, w: 10, h: 2 },
    { name: 'medium', l: 8, w: 6, h: 3 },
    { name: 'small', l: 5, w: 5, h: 5 },
  ];
  
  const orderings = [
    ['large', 'medium', 'small'],
    ['small', 'medium', 'large'],
    ['medium', 'large', 'small'],
    ['large', 'small', 'medium'],
  ];
  
  const results = [];
  
  for (const order of orderings) {
    const packer = new Packer();
    packer.addBin(new Bin('test', 50, 50, 50, 1000));
    
    for (const name of order) {
      const item = items.find(i => i.name === name);
      packer.addItem(new Item(item.name, item.l, item.w, item.h, 1));
    }
    
    packer.pack();
    const bin = packer.bins[0];
    
    let maxX = 0, maxY = 0, maxZ = 0;
    bin.items.forEach(item => {
      const dims = item.getDimension();
      maxX = Math.max(maxX, item.position[0] + dims[0]);
      maxY = Math.max(maxY, item.position[1] + dims[1]);
      maxZ = Math.max(maxZ, item.position[2] + dims[2]);
    });
    
    const dims = [(maxX/SCALE), (maxY/SCALE), (maxZ/SCALE)].sort((a,b) => b-a);
    const volume = dims[0] * dims[1] * dims[2];
    
    results.push({ order: order.join('→'), dims, volume });
    console.log(`${order.join('→')}: ${dims[0]}×${dims[1]}×${dims[2]} = ${volume} cu in`);
  }
  
  const best = Math.min(...results.map(r => r.volume));
  const worst = Math.max(...results.map(r => r.volume));
  console.log(`\nVariance: ${worst} vs ${best} = ${((worst-best)/best*100).toFixed(1)}% difference just from ordering!`);
}

// Test case 4: Your actual scenario - checking "ideal" accuracy
function testIdealBoxAccuracy() {
  console.log('\n=== TEST 4: Realistic order (your 16×16×11 vs 14×10×8 scenario) ===');
  
  // Simulating items that might produce those dimensions
  const items = [
    { name: 'item1', l: 13, w: 9, h: 2 },
    { name: 'item2', l: 10, w: 8, h: 3 },
    { name: 'item3', l: 12, w: 7, h: 2 },
    { name: 'item4', l: 8, w: 6, h: 4 },
  ];
  
  const totalItemVolume = items.reduce((sum, i) => sum + i.l * i.w * i.h, 0);
  
  // Try multiple orderings to find range
  const allPerms = permutations(items);
  let bestVol = Infinity, worstVol = 0, bestDims, worstDims;
  
  for (const perm of allPerms) {
    const packer = new Packer();
    packer.addBin(new Bin('test', 50, 50, 50, 1000));
    
    for (const item of perm) {
      packer.addItem(new Item(item.name, item.l, item.w, item.h, 1));
    }
    
    packer.pack();
    const bin = packer.bins[0];
    
    let maxX = 0, maxY = 0, maxZ = 0;
    bin.items.forEach(item => {
      const dims = item.getDimension();
      maxX = Math.max(maxX, item.position[0] + dims[0]);
      maxY = Math.max(maxY, item.position[1] + dims[1]);
      maxZ = Math.max(maxZ, item.position[2] + dims[2]);
    });
    
    const dims = [(maxX/SCALE), (maxY/SCALE), (maxZ/SCALE)].sort((a,b) => b-a);
    const vol = dims[0] * dims[1] * dims[2];
    
    if (vol < bestVol) { bestVol = vol; bestDims = dims; }
    if (vol > worstVol) { worstVol = vol; worstDims = dims; }
  }
  
  console.log(`Total item volume: ${totalItemVolume} cu in`);
  console.log(`Single FFD pass (random order): might get worst case`);
  console.log(`Worst ordering: ${worstDims[0]}×${worstDims[1]}×${worstDims[2]} = ${worstVol} cu in`);
  console.log(`Best ordering:  ${bestDims[0]}×${bestDims[1]}×${bestDims[2]} = ${bestVol} cu in`);
  console.log(`\nDIM weight difference (÷139):`);
  console.log(`  Worst: ${(worstVol/139).toFixed(1)} lbs`);
  console.log(`  Best:  ${(bestVol/139).toFixed(1)} lbs`);
  console.log(`  Gap:   ${((worstVol-bestVol)/139).toFixed(1)} lbs = ~$${((worstVol-bestVol)/139 * 0.50).toFixed(2)} shipping difference`);
}

function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

// Run all tests
console.log('====================================================');
console.log('BINPACKINGJS FFD ALGORITHM ACCURACY TEST');
console.log('====================================================');

testIdenticalCubes();
testMixedItems();
testOrderingImpact();
testIdealBoxAccuracy();

// Test case 5: Constrained bin approach (production's trick)
function testConstrainedBin() {
  console.log('\n=== TEST 5: Constrained bin (production approach) ===');
  
  const items = [
    { name: 'book1', l: 11, w: 8.5, h: 0.8 },
    { name: 'book2', l: 10, w: 8, h: 0.5 },
    { name: 'palette', l: 12, w: 4, h: 0.7 },
    { name: 'brush_set', l: 10, w: 3.5, h: 1 },
  ];
  
  const totalItemVolume = items.reduce((sum, i) => sum + i.l * i.w * i.h, 0);
  
  // Find largest footprint
  let maxDim1 = 0, maxDim2 = 0;
  items.forEach(item => {
    const dims = [item.l, item.w, item.h].sort((a, b) => b - a);
    maxDim1 = Math.max(maxDim1, dims[0]);
    maxDim2 = Math.max(maxDim2, dims[1]);
  });
  
  console.log(`Constraining bin to footprint: ${maxDim1}×${maxDim2}`);
  
  const packer = new Packer();
  // Constrained bin: fixed footprint, tall height
  packer.addBin(new Bin('constrained', maxDim1, maxDim2, 50, 1000));
  
  items.forEach((item, i) => {
    packer.addItem(new Item(item.name, item.l, item.w, item.h, 1));
  });
  
  packer.pack();
  const bin = packer.bins[0];
  
  if (!bin || !bin.items || bin.items.length === 0) {
    console.log('FAILED: Items did not fit in constrained bin');
    return;
  }
  
  if (bin.items.length < items.length) {
    console.log(`WARNING: Only ${bin.items.length}/${items.length} items fit`);
  }
  
  let maxX = 0, maxY = 0, maxZ = 0;
  bin.items.forEach(item => {
    const dims = item.getDimension();
    maxX = Math.max(maxX, item.position[0] + dims[0]);
    maxY = Math.max(maxY, item.position[1] + dims[1]);
    maxZ = Math.max(maxZ, item.position[2] + dims[2]);
  });
  
  const result = [(maxX/SCALE), (maxY/SCALE), (maxZ/SCALE)].sort((a,b) => b-a);
  const volume = result[0] * result[1] * result[2];
  const efficiency = (totalItemVolume / volume * 100);
  
  console.log(`Constrained Result: ${result[0].toFixed(1)}×${result[1].toFixed(1)}×${result[2].toFixed(1)} = ${volume.toFixed(1)} cu in`);
  console.log(`Packing efficiency: ${efficiency.toFixed(1)}%`);
  console.log(`\nComparison:`);
  console.log(`  Unconstrained: 43.0×8.5×1.0 = 365.5 cu in (50% efficient)`);
  console.log(`  Constrained:   ${result[0].toFixed(1)}×${result[1].toFixed(1)}×${result[2].toFixed(1)} = ${volume.toFixed(1)} cu in (${efficiency.toFixed(0)}% efficient)`);
  console.log(`  Improvement:   ${((365.5 - volume) / 365.5 * 100).toFixed(0)}% smaller box!`);
}

testConstrainedBin();

// Test case 6: Multi-strategy approach (try several, keep best)
function testMultiStrategy() {
  console.log('\n=== TEST 6: Multi-strategy (try several, keep best) ===');
  
  const items = [
    { name: 'book1', l: 11, w: 8.5, h: 0.8 },
    { name: 'book2', l: 10, w: 8, h: 0.5 },
    { name: 'palette', l: 12, w: 4, h: 0.7 },
    { name: 'brush_set', l: 10, w: 3.5, h: 1 },
  ];
  
  const totalItemVolume = items.reduce((sum, i) => sum + i.l * i.w * i.h, 0);
  
  // Find dimension ranges
  let maxL = 0, maxW = 0, maxH = 0;
  items.forEach(item => {
    const dims = [item.l, item.w, item.h].sort((a, b) => b - a);
    maxL = Math.max(maxL, dims[0]);
    maxW = Math.max(maxW, dims[1]);
    maxH = Math.max(maxH, dims[2]);
  });
  
  // Different bin constraint strategies
  const strategies = [
    { name: 'Unconstrained', bin: [100, 100, 100] },
    { name: 'Footprint L×W', bin: [maxL, maxW, 100] },
    { name: 'Footprint L×H', bin: [maxL, maxH, 100] },
    { name: 'Footprint W×H', bin: [maxW, maxH, 100] },
    { name: 'Tall narrow', bin: [maxL, maxH * 2, 100] },
    { name: 'Wide shallow', bin: [maxL * 2, maxW * 2, maxH * 2] },
    { name: 'Cube-ish', bin: [maxL * 1.5, maxL * 1.5, maxL * 1.5] },
  ];
  
  let bestResult = null;
  let bestVolume = Infinity;
  
  for (const strategy of strategies) {
    const packer = new Packer();
    packer.addBin(new Bin(strategy.name, strategy.bin[0], strategy.bin[1], strategy.bin[2], 1000));
    
    items.forEach((item, i) => {
      packer.addItem(new Item(item.name, item.l, item.w, item.h, 1));
    });
    
    packer.pack();
    const bin = packer.bins[0];
    
    if (!bin || !bin.items || bin.items.length < items.length) {
      console.log(`  ${strategy.name}: FAILED (items didn't fit)`);
      continue;
    }
    
    let maxX = 0, maxY = 0, maxZ = 0;
    bin.items.forEach(item => {
      const dims = item.getDimension();
      maxX = Math.max(maxX, item.position[0] + dims[0]);
      maxY = Math.max(maxY, item.position[1] + dims[1]);
      maxZ = Math.max(maxZ, item.position[2] + dims[2]);
    });
    
    const result = [(maxX/SCALE), (maxY/SCALE), (maxZ/SCALE)].sort((a,b) => b-a);
    const volume = result[0] * result[1] * result[2];
    
    console.log(`  ${strategy.name}: ${result[0].toFixed(1)}×${result[1].toFixed(1)}×${result[2].toFixed(1)} = ${volume.toFixed(1)} cu in`);
    
    if (volume < bestVolume) {
      bestVolume = volume;
      bestResult = { strategy: strategy.name, dims: result, volume };
    }
  }
  
  console.log(`\n  BEST: ${bestResult.strategy}`);
  console.log(`  Dims: ${bestResult.dims[0].toFixed(1)}×${bestResult.dims[1].toFixed(1)}×${bestResult.dims[2].toFixed(1)}`);
  console.log(`  Volume: ${bestResult.volume.toFixed(1)} cu in`);
  console.log(`  Efficiency: ${(totalItemVolume / bestResult.volume * 100).toFixed(1)}%`);
}

testMultiStrategy();

console.log('\n====================================================');
console.log('CONCLUSION');
console.log('====================================================');
