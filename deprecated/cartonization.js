// cartonization.js - Browser-compatible cartonization service
// 
// COORDINATE SYSTEM:
// - We pass Bin(L, W, H) so position[0]=L, position[1]=W, position[2]=H
// - Three.js: X=L, Y=H(up), Z=W

const { BP3D } = require('binpackingjs');
const { Item, Bin, Packer } = BP3D;

const SCALE = 100000;

class CartonizationService {
  constructor(boxes = []) {
    this.boxInventory = boxes;
  }

  setBoxInventory(boxes) {
    this.boxInventory = boxes;
  }

  expandItems(items) {
    const expanded = [];
    items.forEach(item => {
      for (let i = 0; i < (item.quantity || 1); i++) {
        // Sort dimensions so smallest is height - encourages flat packing
        const dims = [
          Math.max(item.length || 1, 0.1),
          Math.max(item.width || 1, 0.1),
          Math.max(item.height || 1, 0.1)
        ].sort((a, b) => b - a);
        
        expanded.push({
          sku: item.sku || 'unknown',
          length: dims[0],  // largest -> length
          width: dims[1],   // middle -> width  
          height: dims[2],  // smallest -> height (flat)
          weight: item.weight || 1,
          color: item.color
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

    const minLength = Math.max(...expandedItems.map(i => i.length)) + padding;
    const minWidth = Math.max(...expandedItems.map(i => i.width)) + padding;
    const minHeight = Math.max(...expandedItems.map(i => i.height)) + padding;

    const volumeWithBuffer = totalVolume * 1.2;

    const validBoxes = this.boxInventory
      .filter(box => {
        if (totalWeight > box.max_weight) return false;
        const itemDims = [minLength, minWidth, minHeight].sort((a, b) => b - a);
        const boxDims = [box.length, box.width, box.height].sort((a, b) => b - a);
        if (itemDims[0] > boxDims[0] || itemDims[1] > boxDims[1] || itemDims[2] > boxDims[2]) return false;
        if (volumeWithBuffer > box.length * box.width * box.height) return false;
        return true;
      })
      .sort((a, b) => (a.length * a.width * a.height) - (b.length * b.width * b.height));

    if (validBoxes.length === 0) {
      return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
    }

    const selectedBox = validBoxes[0];
    const packedItems = this.packIntoBox(expandedItems, selectedBox);

    return {
      success: true,
      algorithm: 'single_box',
      box: selectedBox,
      packedItems,
      totalWeight: totalWeight + selectedBox.box_weight,
      itemsVolume: totalVolume
    };
  }

  /**
   * Pack items into ideal (perfect-fit) box
   * Strategy: Use largest item footprint, stack items flat
   */
  packItemsIdeal(items, paddingPerSide = 0) {
    if (!items || items.length === 0) {
      return { success: false, box: null, packedItems: [], totalWeight: 0, itemsVolume: 0 };
    }

    const expandedItems = this.expandItems(items);
    const totalWeight = expandedItems.reduce((sum, i) => sum + i.weight, 0);
    const totalVolume = expandedItems.reduce((sum, i) => sum + i.length * i.width * i.height, 0);

    // Find largest item footprint (L × W when laid flat)
    // Remember: expandItems already normalized so height is smallest
    let maxFootprintL = 0, maxFootprintW = 0;
    let totalStackHeight = 0;
    
    expandedItems.forEach(item => {
      maxFootprintL = Math.max(maxFootprintL, item.length);
      maxFootprintW = Math.max(maxFootprintW, item.width);
      totalStackHeight += item.height; // If all items stacked vertically
    });

    // Estimate how many items can fit per layer on this footprint
    const avgItemFootprint = expandedItems.reduce((sum, i) => sum + i.length * i.width, 0) / expandedItems.length;
    const footprintArea = maxFootprintL * maxFootprintW;
    const itemsPerLayer = Math.max(1, Math.floor(footprintArea / avgItemFootprint));
    const estimatedLayers = Math.ceil(expandedItems.length / itemsPerLayer);
    const avgItemHeight = totalStackHeight / expandedItems.length;
    const estimatedHeight = estimatedLayers * avgItemHeight;

    // Try a few flat-biased candidates
    const candidates = [
      // Exact footprint, estimated height
      { l: maxFootprintL, w: maxFootprintW, h: Math.max(estimatedHeight * 1.2, avgItemHeight) },
      // Slightly larger footprint for better packing
      { l: maxFootprintL * 1.2, w: maxFootprintW * 1.2, h: Math.max(estimatedHeight, avgItemHeight) },
      // Even larger footprint, shorter
      { l: maxFootprintL * 1.5, w: maxFootprintW * 1.5, h: Math.max(estimatedHeight * 0.8, avgItemHeight) },
    ];

    let bestResult = null;
    let bestVolume = Infinity;

    for (const candidate of candidates) {
      const result = this.tryPackInBin(expandedItems, candidate.l, candidate.w, candidate.h);
      
      if (result && result.packedItems.length === expandedItems.length) {
        const boundingVolume = result.actualLength * result.actualWidth * result.actualHeight;
        if (boundingVolume < bestVolume) {
          bestVolume = boundingVolume;
          bestResult = result;
        }
      }
    }

    // Fallback if nothing worked
    if (!bestResult) {
      bestResult = this.tryPackInBin(expandedItems, 108, 108, 108);
    }

    if (!bestResult) {
      return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
    }

    // Build ideal box from actual packed dimensions + padding
    const padding = paddingPerSide * 2;
    const idealBox = {
      name: 'Ideal',
      length: Math.ceil(bestResult.actualLength + padding),
      width: Math.ceil(bestResult.actualWidth + padding),
      height: Math.ceil(bestResult.actualHeight + padding),
      box_weight: 0.3,
      max_weight: 1000
    };

    return {
      success: true,
      algorithm: 'ideal_box',
      box: idealBox,
      packedItems: bestResult.packedItems,
      totalWeight: totalWeight + 0.3,
      itemsVolume: totalVolume
    };
  }

  /**
   * Try packing items into a bin of given dimensions
   * Returns actual bounding box and packed items, or null if failed
   */
  tryPackInBin(items, binL, binW, binH) {
    const packer = new Packer();
    packer.addBin(new Bin('test', binL, binW, binH, 10000));
    
    items.forEach((item, i) => {
      packer.addItem(new Item(`${item.sku}_${i}`, item.length, item.width, item.height, item.weight));
    });
    
    packer.pack();

    const packedBin = packer.bins[0];
    
    if (!packedBin || !packedBin.items || packedBin.items.length === 0) {
      return null;
    }

    // Calculate actual bounding box
    let actualL = 0, actualW = 0, actualH = 0;
    
    const packedItems = packedBin.items.map((packedItem, index) => {
      const originalItem = items[index] || items[0];
      const rotDims = this.getRotatedDimensions(packedItem);
      
      const itemMaxL = (packedItem.position[0] + rotDims.l) / SCALE;
      const itemMaxW = (packedItem.position[1] + rotDims.w) / SCALE;
      const itemMaxH = (packedItem.position[2] + rotDims.h) / SCALE;
      
      actualL = Math.max(actualL, itemMaxL);
      actualW = Math.max(actualW, itemMaxW);
      actualH = Math.max(actualH, itemMaxH);
      
      return {
        sku: originalItem.sku,
        color: originalItem.color,
        x: packedItem.position[0] / SCALE,
        y: packedItem.position[2] / SCALE,
        z: packedItem.position[1] / SCALE,
        packedLength: rotDims.l / SCALE,
        packedHeight: rotDims.h / SCALE,
        packedWidth: rotDims.w / SCALE
      };
    });

    return {
      actualLength: actualL,
      actualWidth: actualW,
      actualHeight: actualH,
      packedItems
    };
  }

  /**
   * Pack items into a specific box
   */
  packIntoBox(items, box) {
    const result = this.tryPackInBin(items, box.length, box.width, box.height);
    if (result) {
      return result.packedItems;
    }
    return this.simpleStackResult(items).packedItems;
  }

  /**
   * Simple vertical stack fallback
   */
  simpleStackResult(items) {
    let maxL = 0, maxW = 0, totalH = 0;
    
    const packedItems = items.map(item => {
      const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
      const l = dims[0], w = dims[1], h = dims[2];
      
      maxL = Math.max(maxL, l);
      maxW = Math.max(maxW, w);
      
      const result = {
        sku: item.sku,
        color: item.color,
        x: 0,
        y: totalH,
        z: 0,
        packedLength: l,
        packedHeight: h,
        packedWidth: w
      };
      
      totalH += h;
      return result;
    });

    return {
      actualLength: maxL,
      actualWidth: maxW,
      actualHeight: totalH,
      packedItems
    };
  }

  /**
   * Get rotated dimensions in L, W, H order
   */
  getRotatedDimensions(item) {
    const L = item.width;
    const W = item.height;
    const H = item.depth;
    
    switch (item.rotationType) {
      case 0: return { l: L, w: W, h: H };
      case 1: return { l: W, w: L, h: H };
      case 2: return { l: W, w: H, h: L };
      case 3: return { l: H, w: W, h: L };
      case 4: return { l: H, w: L, h: W };
      case 5: return { l: L, w: H, h: W };
      default: return { l: L, w: W, h: H };
    }
  }

  /**
   * Fallback for oversized items
   */
  createFallbackResult(items, totalWeight, totalVolume, paddingPerSide) {
    const result = this.simpleStackResult(items);
    const padding = paddingPerSide * 2;

    const box = {
      name: 'Custom/Oversized',
      length: Math.ceil(result.actualLength + padding),
      width: Math.ceil(result.actualWidth + padding),
      height: Math.ceil(result.actualHeight + padding),
      box_weight: 1.0,
      max_weight: 1000
    };

    return {
      success: false,
      algorithm: 'fallback',
      box,
      packedItems: result.packedItems,
      totalWeight: totalWeight + 1.0,
      itemsVolume: totalVolume
    };
  }
}

window.CartonizationService = CartonizationService;
