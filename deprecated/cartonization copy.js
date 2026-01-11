// cartonization.js - Browser-compatible cartonization service
// 
// COORDINATE SYSTEM:
// ==================
// binpackingjs library:
//   - Bin(name, width, height, depth, maxWeight)
//   - Item(name, width, height, depth, weight)
//   - getDimension() returns [width, height, depth] after rotation
//   - position = [width-axis, height-axis, depth-axis]
//   - "height" is the vertical axis (Y)
//
// Three.js (in index.html):
//   - BoxGeometry(width, height, depth) where height is Y-up
//   - X = left/right, Y = up/down, Z = front/back
//
// Our box objects use: length (X), width (Z), height (Y-vertical)
// Our packed items use: x, y, z positions and packedLength (X), packedHeight (Y), packedWidth (Z)
//
// Mapping: library width->X, library height->Y(vertical), library depth->Z
//
// ALGORITHM:
// ==========
// Uses multi-strategy bin constraints to find optimal packing.
// Instead of brute-force permutations (n! complexity), we try ~10 different
// bin shapes that guide FFD to pack differently. This is O(strategies) not O(n!).

const { BP3D } = require('binpackingjs');
const { Item, Bin, Packer } = BP3D;

// The library uses this internally to avoid floating point issues
const SCALE = 100000;

class CartonizationService {
  constructor(boxes = []) {
    this.boxInventory = boxes;
  }

  setBoxInventory(boxes) {
    this.boxInventory = boxes;
  }

  /**
   * Expand items with quantities into individual items for packing.
   * Normalize dimensions so smallest is always height - this encourages
   * flat packing while still allowing the library to rotate as needed.
   */
  expandItems(items) {
    const expanded = [];
    items.forEach(item => {
      for (let i = 0; i < (item.quantity || 1); i++) {
        // Sort dimensions: largest to smallest
        const dims = [
          Math.max(item.length || 1, 0.1),
          Math.max(item.width || 1, 0.1),
          Math.max(item.height || 1, 0.1)
        ].sort((a, b) => b - a);
        
        expanded.push({
          sku: item.sku || 'unknown',
          // Normalized: length >= width >= height
          length: dims[0],
          width: dims[1],
          height: dims[2],
          weight: item.weight || 1,
          color: item.color,
          originalIndex: expanded.length
        });
      }
    });
    return expanded;
  }

  /**
   * Generate bin constraint strategies based on item dimensions.
   * Different constraints guide FFD to pack in different ways.
   */
  generateStrategies(items) {
    // Find dimension ranges across all items
    let maxL = 0, maxW = 0, maxH = 0;
    let sumL = 0, sumW = 0, sumH = 0;
    
    items.forEach(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      maxL = Math.max(maxL, dims[0]);
      maxW = Math.max(maxW, dims[1]);
      maxH = Math.max(maxH, dims[2]);
      sumL += dims[0];
      sumW += dims[1];
      sumH += dims[2];
    });
    
    const avgL = sumL / items.length;
    const avgW = sumW / items.length;
    const avgH = sumH / items.length;
    
    // Various bin shapes to try - each guides FFD differently
    return [
      { name: 'unconstrained', dims: [200, 200, 200] },
      { name: 'footprint_LW', dims: [maxL, maxW, 200] },
      { name: 'footprint_LH', dims: [maxL, maxH, 200] },
      { name: 'footprint_WH', dims: [maxW, maxH, 200] },
      { name: 'wide_shallow', dims: [maxL * 2, maxW * 2, maxH * 3] },
      { name: 'tall_narrow', dims: [maxL, maxH * 2, 200] },
      { name: 'cube_ish', dims: [maxL * 1.5, maxL * 1.5, maxL * 1.5] },
      { name: 'sum_based', dims: [sumL, maxW, maxH * 2] },
      { name: 'avg_scaled', dims: [avgL * 2, avgW * 2, avgH * items.length] },
      { name: 'flat_spread', dims: [sumL * 0.5, sumW * 0.5, maxH * 2] },
    ];
  }

  /**
   * Pack items into optimal box from inventory
   */
  packItems(items, paddingPerSide = 0) {
    if (!items || items.length === 0) {
      return { success: false, box: null, packedItems: [], totalWeight: 0, itemsVolume: 0 };
    }

    const expandedItems = this.expandItems(items);
    const totalWeight = expandedItems.reduce((sum, i) => sum + i.weight, 0);
    const totalVolume = expandedItems.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
    
    const padding = paddingPerSide * 2;

    // Find minimum required dimensions (largest single item dimension)
    const allItemDims = expandedItems.map(i => [i.length, i.width, i.height].sort((a, b) => b - a));
    const minDim1 = Math.max(...allItemDims.map(d => d[0])) + padding;
    const minDim2 = Math.max(...allItemDims.map(d => d[1])) + padding;
    const minDim3 = Math.max(...allItemDims.map(d => d[2])) + padding;

    // Filter boxes that could potentially fit
    const validBoxes = this.boxInventory
      .filter(box => {
        if (totalWeight > box.max_weight) return false;
        
        const boxDims = [box.length, box.width, box.height].sort((a, b) => b - a);
        const reqDims = [minDim1, minDim2, minDim3].sort((a, b) => b - a);
        
        return reqDims[0] <= boxDims[0] && reqDims[1] <= boxDims[1] && reqDims[2] <= boxDims[2];
      })
      .sort((a, b) => (a.length * a.width * a.height) - (b.length * b.width * b.height));

    if (validBoxes.length === 0) {
      return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
    }

    // Try boxes from smallest to largest until one works
    for (const candidateBox of validBoxes) {
      const result = this.tryPackInBin(
        expandedItems,
        candidateBox.length - padding,
        candidateBox.height - padding,
        candidateBox.width - padding
      );
      
      if (result && result.packedItems.length === expandedItems.length) {
        const adjustedItems = result.packedItems.map(item => ({
          ...item,
          x: item.x + paddingPerSide,
          y: item.y + paddingPerSide,
          z: item.z + paddingPerSide
        }));
        
        return {
          success: true,
          algorithm: result.algorithm || 'single_box',
          box: candidateBox,
          packedItems: adjustedItems,
          totalWeight: totalWeight + candidateBox.box_weight,
          itemsVolume: totalVolume,
          strategiesTried: result.strategiesTried,
          bestStrategy: result.bestStrategy
        };
      }
    }

    // No box fit all items - use largest and report partial
    const largestBox = validBoxes[validBoxes.length - 1];
    const partialResult = this.tryPackInBin(
      expandedItems,
      largestBox.length - padding,
      largestBox.height - padding,
      largestBox.width - padding
    );

    if (partialResult) {
      const adjustedItems = partialResult.packedItems.map(item => ({
        ...item,
        x: item.x + paddingPerSide,
        y: item.y + paddingPerSide,
        z: item.z + paddingPerSide
      }));
      
      return {
        success: false,
        algorithm: 'single_box_partial',
        box: largestBox,
        packedItems: adjustedItems,
        totalWeight: totalWeight + largestBox.box_weight,
        itemsVolume: totalVolume,
        unpackedCount: expandedItems.length - partialResult.packedItems.length
      };
    }

    return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
  }

  /**
   * Pack items into ideal (perfect-fit) box
   * Strategy: Constrain bin to largest item footprint, forcing vertical stacking
   */
  packItemsIdeal(items, paddingPerSide = 0) {
    if (!items || items.length === 0) {
      return { success: false, box: null, packedItems: [], totalWeight: 0, itemsVolume: 0 };
    }

    const expandedItems = this.expandItems(items);
    const totalWeight = expandedItems.reduce((sum, i) => sum + i.weight, 0);
    const totalVolume = expandedItems.reduce((sum, i) => sum + i.length * i.width * i.height, 0);

    // Find the largest footprint dimensions (when items are flat)
    let maxL = 0, maxW = 0;
    expandedItems.forEach(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      maxL = Math.max(maxL, dims[0]);
      maxW = Math.max(maxW, dims[1]);
    });
    
    // Constrain bin to largest footprint - this forces vertical stacking
    // Height is unlimited (200) to allow stacking
    const result = this.tryPackDirect(expandedItems, maxL, 200, maxW);
    
    if (!result || result.packedItems.length !== expandedItems.length) {
      return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
    }

    const padding = paddingPerSide * 2;
    
    // The ideal box is the actual bounding box of packed items
    const idealBox = {
      name: 'Ideal',
      length: Math.ceil(result.extentX + padding),
      width: Math.ceil(result.extentZ + padding),
      height: Math.ceil(result.extentY + padding),
      box_weight: 0.3,
      max_weight: 1000
    };

    const adjustedItems = result.packedItems.map(item => ({
      ...item,
      x: item.x + paddingPerSide,
      y: item.y + paddingPerSide,
      z: item.z + paddingPerSide
    }));

    const boxVol = result.extentX * result.extentY * result.extentZ;

    return {
      success: true,
      algorithm: 'ffd_constrained',
      box: idealBox,
      packedItems: adjustedItems,
      totalWeight: totalWeight + 0.3,
      itemsVolume: totalVolume,
      efficiency: (totalVolume / boxVol * 100).toFixed(1) + '%'
    };
  }

  /**
   * Optimal stacking: arrange items in grid layers for realistic box shapes
   */
  optimalStackResult(items) {
    if (items.length === 0) return null;
    
    // Calculate dimensions for each item when laid FLAT (smallest dim = height)
    const flatItems = items.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      return {
        ...item,
        flatL: dims[0],  // Largest dimension
        flatW: dims[1],  // Middle dimension  
        flatH: dims[2],  // Smallest dimension (height when flat)
      };
    });
    
    // Sort by footprint (largest first)
    flatItems.sort((a, b) => (b.flatL * b.flatW) - (a.flatL * a.flatW));
    
    // Calculate total volume and target a roughly cubic box
    const totalVol = flatItems.reduce((sum, i) => sum + i.flatL * i.flatW * i.flatH, 0);
    const targetSide = Math.cbrt(totalVol * 1.3); // Cube root with 30% packing inefficiency
    
    // Find the minimum footprint (constrained by largest item)
    const minL = Math.max(...flatItems.map(i => i.flatL));
    const minW = Math.max(...flatItems.map(i => i.flatW));
    
    // Target footprint should be at least as big as largest item
    // but expand to create reasonable aspect ratio
    let targetL = Math.max(minL, targetSide);
    let targetW = Math.max(minW, targetSide);
    
    // Pack items into layers
    const packedItems = [];
    const remaining = [...flatItems];
    let currentY = 0;
    
    while (remaining.length > 0) {
      const layer = this.packLayer(remaining, targetL, targetW, currentY);
      packedItems.push(...layer.placed);
      
      // Update remaining items
      const placedSet = new Set(layer.placed.map(p => p._index));
      const newRemaining = [];
      for (let i = 0; i < remaining.length; i++) {
        if (!placedSet.has(i)) {
          newRemaining.push(remaining[i]);
        }
      }
      remaining.length = 0;
      remaining.push(...newRemaining);
      
      currentY += layer.height;
    }
    
    // Calculate actual extents
    let extentX = 0, extentY = 0, extentZ = 0;
    packedItems.forEach(item => {
      extentX = Math.max(extentX, item.x + item.packedLength);
      extentY = Math.max(extentY, item.y + item.packedHeight);
      extentZ = Math.max(extentZ, item.z + item.packedWidth);
    });
    
    return {
      extentX,
      extentY,
      extentZ,
      packedItems,
      strategy: 'grid_layers'
    };
  }

  /**
   * Pack a single layer with items using simple row-based approach
   */
  packLayer(items, maxL, maxW, startY) {
    const placed = [];
    let currentX = 0;
    let currentZ = 0;
    let rowMaxW = 0;
    let layerHeight = 0;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Check if item fits in current position
      if (currentX + item.flatL <= maxL && currentZ + item.flatW <= maxW) {
        placed.push({
          sku: item.sku,
          color: item.color,
          x: currentX,
          y: startY,
          z: currentZ,
          packedLength: item.flatL,
          packedHeight: item.flatH,
          packedWidth: item.flatW,
          _index: i
        });
        currentX += item.flatL;
        rowMaxW = Math.max(rowMaxW, item.flatW);
        layerHeight = Math.max(layerHeight, item.flatH);
      }
      // Try starting a new row
      else if (currentZ + rowMaxW + item.flatW <= maxW && item.flatL <= maxL) {
        currentX = 0;
        currentZ += rowMaxW;
        rowMaxW = 0;
        
        placed.push({
          sku: item.sku,
          color: item.color,
          x: currentX,
          y: startY,
          z: currentZ,
          packedLength: item.flatL,
          packedHeight: item.flatH,
          packedWidth: item.flatW,
          _index: i
        });
        currentX += item.flatL;
        rowMaxW = Math.max(rowMaxW, item.flatW);
        layerHeight = Math.max(layerHeight, item.flatH);
      }
      // Item doesn't fit in this layer - will go to next layer
    }
    
    // If nothing was placed (item too big), force place the first one
    if (placed.length === 0 && items.length > 0) {
      const item = items[0];
      placed.push({
        sku: item.sku,
        color: item.color,
        x: 0,
        y: startY,
        z: 0,
        packedLength: item.flatL,
        packedHeight: item.flatH,
        packedWidth: item.flatW,
        _index: 0
      });
      layerHeight = item.flatH;
    }
    
    return { placed, height: layerHeight };
  }

  /**
   * Theoretical minimum: all items laid flat, using max footprint
   * This is the absolute smallest box possible (without nesting)
   */
  theoreticalMinimum(items) {
    let maxL = 0, maxW = 0, totalH = 0;
    
    // Find max footprint and sum of heights (when all items are flat)
    items.forEach(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      maxL = Math.max(maxL, dims[0]);
      maxW = Math.max(maxW, dims[1]);
      totalH += dims[2]; // Smallest dim = height when flat
    });
    
    // Sort items by footprint for visual consistency
    const sorted = [...items].sort((a, b) => {
      const aDims = [a.length, a.width, a.height].sort((x, y) => y - x);
      const bDims = [b.length, b.width, b.height].sort((x, y) => y - x);
      return (bDims[0] * bDims[1]) - (aDims[0] * aDims[1]);
    });
    
    // Stack all items flat, flush to corner (not centered)
    let currentY = 0;
    const packedItems = sorted.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      const sizeX = dims[0];  // Largest = length
      const sizeZ = dims[1];  // Middle = width  
      const sizeY = dims[2];  // Smallest = height (flat)
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: 0,  // Flush to corner
        y: currentY,
        z: 0,  // Flush to corner
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
      
      currentY += sizeY;
      return result;
    });
    
    return {
      extentX: maxL,
      extentY: totalH,
      extentZ: maxW,
      packedItems
    };
  }

  /**
   * Nesting stack: place smaller items on top of larger items' footprints
   * Tries to minimize wasted vertical space
   */
  nestingStack(items) {
    // Sort by footprint (largest first)
    const sorted = [...items].sort((a, b) => {
      const aDims = [a.length, a.width, a.height].sort((x, y) => y - x);
      const bDims = [b.length, b.width, b.height].sort((x, y) => y - x);
      return (bDims[0] * bDims[1]) - (aDims[0] * aDims[1]);
    });
    
    // Get dimensions for each item (laid flat)
    const itemDims = sorted.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      return { item, sizeX: dims[0], sizeZ: dims[1], sizeY: dims[2] };
    });
    
    // Max footprint
    const maxL = Math.max(...itemDims.map(d => d.sizeX));
    const maxW = Math.max(...itemDims.map(d => d.sizeZ));
    
    // Place items, trying to nest smaller ones in available space
    const packedItems = [];
    const placed = new Set();
    
    // Simple approach: group items that can share vertical space
    let currentY = 0;
    
    for (let i = 0; i < itemDims.length; i++) {
      if (placed.has(i)) continue;
      
      const base = itemDims[i];
      placed.add(i);
      
      // Place the base item
      packedItems.push({
        sku: base.item.sku,
        color: base.item.color,
        x: 0,
        y: currentY,
        z: 0,
        packedLength: base.sizeX,
        packedHeight: base.sizeY,
        packedWidth: base.sizeZ
      });
      
      // Try to fit other items next to it in the same layer
      let layerX = base.sizeX;
      let layerZ = 0;
      let layerMaxH = base.sizeY;
      let rowMaxZ = base.sizeZ;
      
      for (let j = i + 1; j < itemDims.length; j++) {
        if (placed.has(j)) continue;
        
        const other = itemDims[j];
        
        // Can it fit next to current items in X direction?
        if (layerX + other.sizeX <= maxL && other.sizeZ <= rowMaxZ) {
          packedItems.push({
            sku: other.item.sku,
            color: other.item.color,
            x: layerX,
            y: currentY,
            z: layerZ,
            packedLength: other.sizeX,
            packedHeight: other.sizeY,
            packedWidth: other.sizeZ
          });
          layerX += other.sizeX;
          layerMaxH = Math.max(layerMaxH, other.sizeY);
          placed.add(j);
        }
        // Can it fit in a new row within this layer?
        else if (other.sizeX <= maxL && layerZ + rowMaxZ + other.sizeZ <= maxW) {
          layerZ += rowMaxZ;
          rowMaxZ = other.sizeZ;
          layerX = other.sizeX;
          
          packedItems.push({
            sku: other.item.sku,
            color: other.item.color,
            x: 0,
            y: currentY,
            z: layerZ,
            packedLength: other.sizeX,
            packedHeight: other.sizeY,
            packedWidth: other.sizeZ
          });
          layerMaxH = Math.max(layerMaxH, other.sizeY);
          placed.add(j);
        }
      }
      
      currentY += layerMaxH;
    }
    
    // Calculate extents
    let extentX = 0, extentY = 0, extentZ = 0;
    packedItems.forEach(item => {
      extentX = Math.max(extentX, item.x + item.packedLength);
      extentY = Math.max(extentY, item.y + item.packedHeight);
      extentZ = Math.max(extentZ, item.z + item.packedWidth);
    });
    
    return { extentX, extentY, extentZ, packedItems };
  }

  /**
   * Stack all items flat (largest footprint down), vertically
   */
  stackFlat(items) {
    // Sort by footprint (largest first)
    const sorted = [...items].sort((a, b) => 
      (b.length * b.width) - (a.length * a.width)
    );
    
    // Find the largest footprint for the base
    let maxL = 0, maxW = 0;
    sorted.forEach(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      maxL = Math.max(maxL, dims[0]);
      maxW = Math.max(maxW, dims[1]);
    });
    
    // Stack vertically
    let currentY = 0;
    const packedItems = sorted.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2]; // Lay flat
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: 0,
        y: currentY,
        z: 0,
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
      
      currentY += sizeY;
      return result;
    });
    
    return {
      extentX: maxL,
      extentY: currentY,
      extentZ: maxW,
      packedItems
    };
  }

  /**
   * Stack items grouped by similar footprint
   */
  stackByFootprint(items) {
    // Sort by footprint
    const sorted = [...items].sort((a, b) => {
      const aFoot = Math.max(a.length, a.width) * Math.min(a.length, a.width);
      const bFoot = Math.max(b.length, b.width) * Math.min(b.length, b.width);
      return bFoot - aFoot;
    });
    
    return this.stackFlat(sorted);
  }

  /**
   * Arrange items in rows (side by side, then stack)
   */
  stackInRows(items) {
    const sorted = [...items].sort((a, b) => 
      (b.length * b.width * b.height) - (a.length * a.width * a.height)
    );
    
    // Calculate target row width based on total volume
    const totalVol = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
    const targetSide = Math.cbrt(totalVol * 1.2);
    
    let currentX = 0, currentY = 0, currentZ = 0;
    let rowMaxZ = 0, layerMaxY = 0;
    
    const packedItems = sorted.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
      
      // Start new row if this item would exceed target width
      if (currentX > 0 && currentX + sizeX > targetSide * 1.5) {
        currentX = 0;
        currentZ += rowMaxZ;
        rowMaxZ = 0;
      }
      
      // Start new layer if this row would exceed target depth
      if (currentZ + sizeZ > targetSide * 1.5) {
        currentX = 0;
        currentZ = 0;
        currentY += layerMaxY;
        layerMaxY = 0;
        rowMaxZ = 0;
      }
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: currentX,
        y: currentY,
        z: currentZ,
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
      
      currentX += sizeX;
      rowMaxZ = Math.max(rowMaxZ, sizeZ);
      layerMaxY = Math.max(layerMaxY, sizeY);
      
      return result;
    });
    
    // Calculate extents
    let extentX = 0, extentY = 0, extentZ = 0;
    packedItems.forEach(item => {
      extentX = Math.max(extentX, item.x + item.packedLength);
      extentY = Math.max(extentY, item.y + item.packedHeight);
      extentZ = Math.max(extentZ, item.z + item.packedWidth);
    });
    
    return { extentX, extentY, extentZ, packedItems };
  }

  /**
   * Check if dimensions have a reasonable aspect ratio.
   * Rejects "pencil boxes" and "pizza boxes".
   */
  hasReasonableAspectRatio(x, y, z, maxRatio = 4) {
    const dims = [x, y, z].sort((a, b) => b - a);
    return dims[0] / dims[2] <= maxRatio;
  }

  /**
   * Try packing with multiple bin constraint strategies.
   * Returns the result with smallest bounding volume that has reasonable proportions.
   */
  tryPackMultiStrategy(items) {
    const strategies = this.generateStrategies(items);
    
    let bestResult = null;
    let bestVolume = Infinity;
    let bestStrategy = null;
    
    // First pass: find best result with reasonable aspect ratio
    for (const strategy of strategies) {
      const result = this.tryPackWithConstraint(items, strategy.dims);
      
      if (result && result.packedItems.length === items.length) {
        // Check aspect ratio - reject extreme shapes
        if (!this.hasReasonableAspectRatio(result.extentX, result.extentY, result.extentZ)) {
          continue; // Skip this result
        }
        
        const vol = result.extentX * result.extentY * result.extentZ;
        if (vol < bestVolume) {
          bestVolume = vol;
          bestResult = result;
          bestStrategy = strategy.name;
        }
      }
    }
    
    // If no reasonable result found, try forcing a cube-ish constraint
    if (!bestResult) {
      const totalVol = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
      const targetSide = Math.cbrt(totalVol * 1.5); // Cube root with 50% headroom
      
      const forcedStrategies = [
        { name: 'forced_cube', dims: [targetSide * 1.5, targetSide * 1.5, targetSide * 1.5] },
        { name: 'forced_cube_2x', dims: [targetSide * 2, targetSide * 2, targetSide * 2] },
        { name: 'forced_cube_3x', dims: [targetSide * 3, targetSide * 3, targetSide * 3] },
      ];
      
      for (const strategy of forcedStrategies) {
        const result = this.tryPackWithConstraint(items, strategy.dims);
        
        if (result && result.packedItems.length === items.length) {
          if (this.hasReasonableAspectRatio(result.extentX, result.extentY, result.extentZ, 5)) {
            bestResult = result;
            bestStrategy = strategy.name;
            break;
          }
        }
      }
    }
    
    // Last resort: use simple stacking which guarantees reasonable shape
    if (!bestResult) {
      bestResult = this.smartStackResult(items);
      bestStrategy = 'smart_stack';
    }
    
    if (bestResult) {
      bestResult.algorithm = 'multi_strategy';
      bestResult.strategiesTried = strategies.length;
      bestResult.bestStrategy = bestStrategy;
    }
    
    return bestResult;
  }

  /**
   * Smart stacking: arrange items in a grid pattern for reasonable box shape.
   * Targets roughly cubic output by calculating optimal grid dimensions.
   */
  smartStackResult(items) {
    // Sort by footprint (largest first)
    const sorted = [...items].sort((a, b) => 
      (b.length * b.width) - (a.length * a.width)
    );
    
    // Calculate average item dimensions
    const avgL = items.reduce((sum, i) => sum + i.length, 0) / items.length;
    const avgW = items.reduce((sum, i) => sum + i.width, 0) / items.length;
    const avgH = items.reduce((sum, i) => sum + i.height, 0) / items.length;
    
    // Estimate how many items per row/layer for roughly cubic result
    const totalVol = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
    const targetSide = Math.cbrt(totalVol * 1.3); // Target cube side with 30% headroom
    
    // Calculate grid dimensions
    const itemsPerRow = Math.max(1, Math.ceil(targetSide / avgL));
    const itemsPerLayer = Math.max(1, Math.ceil(targetSide / avgW));
    
    // Place items in grid
    let gridX = 0, gridZ = 0, gridY = 0;
    let rowCount = 0, layerCount = 0;
    let currentRowMaxH = 0;
    let currentLayerMaxZ = 0;
    let currentX = 0;
    
    const packedItems = sorted.map((item, index) => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: currentX,
        y: gridY,
        z: gridZ,
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
      
      currentX += sizeX;
      currentRowMaxH = Math.max(currentRowMaxH, sizeY);
      currentLayerMaxZ = Math.max(currentLayerMaxZ, sizeZ);
      rowCount++;
      
      // Move to next row
      if (rowCount >= itemsPerRow) {
        rowCount = 0;
        currentX = 0;
        gridZ += currentLayerMaxZ;
        currentLayerMaxZ = 0;
        layerCount++;
        
        // Move to next layer
        if (layerCount >= itemsPerLayer) {
          layerCount = 0;
          gridZ = 0;
          gridY += currentRowMaxH;
          currentRowMaxH = 0;
        }
      }
      
      return result;
    });
    
    // Calculate extents
    let extentX = 0, extentY = 0, extentZ = 0;
    packedItems.forEach(item => {
      extentX = Math.max(extentX, item.x + item.packedLength);
      extentY = Math.max(extentY, item.y + item.packedHeight);
      extentZ = Math.max(extentZ, item.z + item.packedWidth);
    });
    
    return { extentX, extentY, extentZ, packedItems };
  }

  /**
   * Try packing items with a specific bin constraint.
   * The constraint guides FFD to arrange items differently.
   */
  tryPackWithConstraint(items, constraintDims) {
    const packer = new Packer();
    
    packer.addBin(new Bin('constrained', constraintDims[0], constraintDims[1], constraintDims[2], 10000));
    
    // Sort items by volume (largest first) - FFD standard approach
    const sortedItems = [...items].sort((a, b) => 
      (b.length * b.width * b.height) - (a.length * a.width * a.height)
    );
    
    sortedItems.forEach((item, i) => {
      const idx = item.originalIndex !== undefined ? item.originalIndex : i;
      packer.addItem(new Item(
        `${item.sku}__${idx}`,
        item.length,
        item.height,
        item.width,
        item.weight
      ));
    });
    
    packer.pack();

    const packedBin = packer.bins[0];
    
    if (!packedBin || !packedBin.items || packedBin.items.length === 0) {
      return null;
    }

    // Build index map for matching
    const itemMap = new Map();
    items.forEach((item, i) => {
      const idx = item.originalIndex !== undefined ? item.originalIndex : i;
      itemMap.set(idx, item);
    });
    
    // Track bounding box extents
    let extentX = 0, extentY = 0, extentZ = 0;
    
    const packedItems = packedBin.items.map((packedItem) => {
      const nameParts = packedItem.name.split('__');
      const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
      const originalItem = itemMap.get(originalIndex) || items[0];
      
      const dims = packedItem.getDimension();
      const sizeX = dims[0] / SCALE;
      const sizeY = dims[1] / SCALE;
      const sizeZ = dims[2] / SCALE;
      
      const posX = packedItem.position[0] / SCALE;
      const posY = packedItem.position[1] / SCALE;
      const posZ = packedItem.position[2] / SCALE;
      
      extentX = Math.max(extentX, posX + sizeX);
      extentY = Math.max(extentY, posY + sizeY);
      extentZ = Math.max(extentZ, posZ + sizeZ);
      
      return {
        sku: originalItem.sku,
        color: originalItem.color,
        x: posX,
        y: posY,
        z: posZ,
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
    });

    return {
      extentX,
      extentY,
      extentZ,
      packedItems
    };
  }

  /**
   * Try packing items into a specific bin size.
   * Used by packItems() for inventory box testing.
   * Simple approach: just try direct FFD packing.
   */
  tryPackInBin(items, binX, binY, binZ) {
    const result = this.tryPackDirect(items, binX, binY, binZ);
    
    if (result && result.packedItems.length === items.length) {
      // Verify items actually fit within bin bounds
      if (result.extentX <= binX && result.extentY <= binY && result.extentZ <= binZ) {
        result.algorithm = 'direct';
        return result;
      }
    }
    
    return null;
  }

  /**
   * Direct packing attempt with exact bin dimensions
   */
  tryPackDirect(items, binX, binY, binZ) {
    const packer = new Packer();
    
    packer.addBin(new Bin('test', binX, binY, binZ, 10000));
    
    // Sort items by volume (largest first)
    const sortedItems = [...items].sort((a, b) => 
      (b.length * b.width * b.height) - (a.length * a.width * a.height)
    );
    
    sortedItems.forEach((item, i) => {
      const idx = item.originalIndex !== undefined ? item.originalIndex : i;
      packer.addItem(new Item(
        `${item.sku}__${idx}`,
        item.length,
        item.height,
        item.width,
        item.weight
      ));
    });
    
    packer.pack();

    const packedBin = packer.bins[0];
    
    if (!packedBin || !packedBin.items || packedBin.items.length === 0) {
      return null;
    }

    // Build index map for matching
    const itemMap = new Map();
    items.forEach((item, i) => {
      const idx = item.originalIndex !== undefined ? item.originalIndex : i;
      itemMap.set(idx, item);
    });
    
    // Track bounding box extents
    let extentX = 0, extentY = 0, extentZ = 0;
    
    const packedItems = packedBin.items.map((packedItem) => {
      const nameParts = packedItem.name.split('__');
      const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
      const originalItem = itemMap.get(originalIndex) || items[0];
      
      const dims = packedItem.getDimension();
      const sizeX = dims[0] / SCALE;
      const sizeY = dims[1] / SCALE;
      const sizeZ = dims[2] / SCALE;
      
      const posX = packedItem.position[0] / SCALE;
      const posY = packedItem.position[1] / SCALE;
      const posZ = packedItem.position[2] / SCALE;
      
      extentX = Math.max(extentX, posX + sizeX);
      extentY = Math.max(extentY, posY + sizeY);
      extentZ = Math.max(extentZ, posZ + sizeZ);
      
      return {
        sku: originalItem.sku,
        color: originalItem.color,
        x: posX,
        y: posY,
        z: posZ,
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
    });

    return {
      extentX,
      extentY,
      extentZ,
      packedItems
    };
  }

  /**
   * Simple vertical stack fallback
   */
  simpleStackResult(items) {
    let maxX = 0, maxZ = 0, stackY = 0;
    
    const packedItems = items.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
      
      maxX = Math.max(maxX, sizeX);
      maxZ = Math.max(maxZ, sizeZ);
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: 0,
        y: stackY,
        z: 0,
        packedLength: sizeX,
        packedHeight: sizeY,
        packedWidth: sizeZ
      };
      
      stackY += sizeY;
      return result;
    });

    return {
      extentX: maxX,
      extentY: stackY,
      extentZ: maxZ,
      packedItems
    };
  }

  /**
   * Fallback for oversized items - uses smart grid stacking
   */
  createFallbackResult(items, totalWeight, totalVolume, paddingPerSide) {
    const result = this.smartStackResult(items);
    const padding = paddingPerSide * 2;

    const box = {
      name: 'Custom/Oversized',
      length: Math.ceil(result.extentX + padding),
      width: Math.ceil(result.extentZ + padding),
      height: Math.ceil(result.extentY + padding),
      box_weight: 1.0,
      max_weight: 1000
    };

    const adjustedItems = result.packedItems.map(item => ({
      ...item,
      x: item.x + paddingPerSide,
      y: item.y + paddingPerSide,
      z: item.z + paddingPerSide
    }));

    return {
      success: false,
      algorithm: 'fallback',
      box,
      packedItems: adjustedItems,
      totalWeight: totalWeight + 1.0,
      itemsVolume: totalVolume
    };
  }
}

window.CartonizationService = CartonizationService;
