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
      // Pass to library as (width=length, height=height, depth=width) to match our convention
      const result = this.tryPackInBin(
        expandedItems,
        candidateBox.length - padding,  // X dimension
        candidateBox.height - padding,  // Y dimension (vertical)
        candidateBox.width - padding    // Z dimension
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
          algorithm: 'single_box',
          box: candidateBox,
          packedItems: adjustedItems,
          totalWeight: totalWeight + candidateBox.box_weight,
          itemsVolume: totalVolume
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
   * Strategy: Search for minimum volume with reasonable aspect ratio constraints
   */
  packItemsIdeal(items, paddingPerSide = 0) {
    if (!items || items.length === 0) {
      return { success: false, box: null, packedItems: [], totalWeight: 0, itemsVolume: 0 };
    }

    const expandedItems = this.expandItems(items);
    const totalWeight = expandedItems.reduce((sum, i) => sum + i.weight, 0);
    const totalVolume = expandedItems.reduce((sum, i) => sum + i.length * i.width * i.height, 0);

    // Get minimum dimension requirements
    const itemDimsSorted = expandedItems.map(i => 
      [i.length, i.width, i.height].sort((a, b) => b - a)
    );
    const minDim1 = Math.max(...itemDimsSorted.map(d => d[0])); // Largest item dimension
    const minDim2 = Math.max(...itemDimsSorted.map(d => d[1])); // Second largest
    const minDim3 = Math.max(...itemDimsSorted.map(d => d[2])); // Smallest (min height)

    // Estimate reasonable box size range
    const volumeTarget = totalVolume * 1.15; // 15% overhead for packing inefficiency
    const baseDim = Math.cbrt(volumeTarget);
    
    let bestResult = null;
    let bestVolume = Infinity;
    
    // Try various box configurations with REASONABLE aspect ratios
    // Max aspect ratio ~3:1 to avoid pizza boxes or towers
    const dimMultipliers = [0.6, 0.8, 1.0, 1.2, 1.5, 1.8, 2.0, 2.5];
    
    for (const mx of dimMultipliers) {
      for (const mz of dimMultipliers) {
        for (const my of dimMultipliers) {
          const testX = Math.max(minDim1, baseDim * mx);
          const testZ = Math.max(minDim2, baseDim * mz);
          const testY = Math.max(minDim3, baseDim * my);
          
          // Skip unreasonable aspect ratios (no dimension more than 3x another)
          const dims = [testX, testY, testZ].sort((a, b) => b - a);
          if (dims[0] / dims[2] > 4) continue;
          
          // Skip if volume is already worse than best
          const testVolume = testX * testY * testZ;
          if (testVolume >= bestVolume) continue;
          
          const result = this.tryPackInBin(expandedItems, testX, testY, testZ);
          
          if (result && result.packedItems.length === expandedItems.length) {
            const actualVolume = result.extentX * result.extentY * result.extentZ;
            if (actualVolume < bestVolume) {
              bestVolume = actualVolume;
              bestResult = result;
            }
          }
        }
      }
    }

    // Fallback: try increasingly large cubes
    if (!bestResult) {
      for (let scale = 1.5; scale <= 4; scale += 0.5) {
        const size = baseDim * scale;
        const result = this.tryPackInBin(expandedItems, size, size, size);
        if (result && result.packedItems.length === expandedItems.length) {
          bestResult = result;
          break;
        }
      }
    }

    if (!bestResult) {
      return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
    }

    const padding = paddingPerSide * 2;
    const idealBox = {
      name: 'Ideal',
      length: Math.ceil(bestResult.extentX + padding),
      width: Math.ceil(bestResult.extentZ + padding),
      height: Math.ceil(bestResult.extentY + padding),
      box_weight: 0.3,
      max_weight: 1000
    };

    const adjustedItems = bestResult.packedItems.map(item => ({
      ...item,
      x: item.x + paddingPerSide,
      y: item.y + paddingPerSide,
      z: item.z + paddingPerSide
    }));

    return {
      success: true,
      algorithm: 'ideal_box',
      box: idealBox,
      packedItems: adjustedItems,
      totalWeight: totalWeight + 0.3,
      itemsVolume: totalVolume
    };
  }

  /**
   * Try packing items into a bin of given dimensions.
   * Attempts multiple item orderings to find better packing.
   * Parameters: binX (width/length), binY (height/vertical), binZ (depth/width)
   */
  tryPackInBin(items, binX, binY, binZ) {
    // Try different item orderings to find best packing
    const orderings = [
      [...items], // Original order
      [...items].sort((a, b) => (b.length * b.width * b.height) - (a.length * a.width * a.height)), // By volume desc
      [...items].sort((a, b) => b.length - a.length), // By longest dimension
      [...items].sort((a, b) => (b.length * b.width) - (a.length * a.width)), // By footprint
      [...items].sort((a, b) => b.height - a.height), // By height desc (tallest first)
    ];
    
    let bestResult = null;
    let bestVolume = Infinity;
    
    for (const orderedItems of orderings) {
      const result = this.tryPackInBinOnce(orderedItems, binX, binY, binZ);
      
      if (result && result.packedItems.length === items.length) {
        const vol = result.extentX * result.extentY * result.extentZ;
        if (vol < bestVolume) {
          bestVolume = vol;
          bestResult = result;
        }
      }
    }
    
    return bestResult;
  }
  
  /**
   * Single packing attempt with given item order
   */
  tryPackInBinOnce(items, binX, binY, binZ) {
    const packer = new Packer();
    
    // Bin constructor: (name, width, height, depth, maxWeight)
    packer.addBin(new Bin('test', binX, binY, binZ, 10000));
    
    // Create items with encoded index for matching after pack
    items.forEach((item, i) => {
      const idx = item.originalIndex !== undefined ? item.originalIndex : i;
      // Item constructor: (name, width, height, depth, weight)
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
      
      // getDimension() returns [width, height, depth] = [X, Y, Z]
      const dims = packedItem.getDimension();
      const sizeX = dims[0] / SCALE;
      const sizeY = dims[1] / SCALE;
      const sizeZ = dims[2] / SCALE;
      
      // position = [X, Y, Z]
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
      const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];  // Lay flat
      
      maxX = Math.max(maxX, sizeX);
      maxZ = Math.max(maxZ, sizeZ);
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: 0,
        y: stackY,        // Stack vertically
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
   * Fallback for oversized items
   */
  createFallbackResult(items, totalWeight, totalVolume, paddingPerSide) {
    const result = this.simpleStackResult(items);
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
