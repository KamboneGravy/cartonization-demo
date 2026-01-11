// Browser entry point - exposes CartonizationService globally
const { BP3D } = require('binpackingjs');
const { Container, Item: EBAFITItem, PackingService } = require('3d-bin-packing-ts');

const { Item: BPItem, Bin, Packer } = BP3D;
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
    let colorIndex = 0;
    const defaultColors = [
      0x4a9eff, 0x44cc88, 0xff6b6b, 0xffd93d, 0x6c5ce7,
      0x00cec9, 0xfd79a8, 0xe17055, 0x74b9ff, 0x55efc4
    ];

    items.forEach(item => {
      const qty = item.quantity || 1;
      for (let i = 0; i < qty; i++) {
        const dims = [
          Math.max(item.length || 1, 0.1),
          Math.max(item.width || 1, 0.1),
          Math.max(item.height || 1, 0.1)
        ].sort((a, b) => b - a);

        expanded.push({
          sku: item.sku || 'unknown',
          length: dims[0],
          width: dims[1],
          height: dims[2],
          weight: item.weight || 0.1,
          color: item.color || defaultColors[colorIndex % defaultColors.length],
          originalIndex: expanded.length
        });
      }
      colorIndex++;
    });
    return expanded;
  }

  calculateTotals(items) {
    return {
      weight: items.reduce((sum, i) => sum + i.weight, 0),
      volume: items.reduce((sum, i) => sum + i.length * i.width * i.height, 0)
    };
  }

  getValidBoxes(items, padding = 0) {
    const totals = this.calculateTotals(items);
    const pad2 = padding * 2;

    const allDims = items.map(i => [i.length, i.width, i.height].sort((a, b) => b - a));
    const minDims = [
      Math.max(...allDims.map(d => d[0])) + pad2,
      Math.max(...allDims.map(d => d[1])) + pad2,
      Math.max(...allDims.map(d => d[2])) + pad2
    ].sort((a, b) => b - a);

    return this.boxInventory
      .filter(box => {
        if (totals.weight > box.max_weight) return false;
        const boxDims = [box.length, box.width, box.height].sort((a, b) => b - a);
        if (minDims[0] > boxDims[0] || minDims[1] > boxDims[1] || minDims[2] > boxDims[2]) {
          return false;
        }
        return true;
      })
      .sort((a, b) => (a.length * a.width * a.height) - (b.length * b.width * b.height));
  }

  // FFD Algorithm
  packFFD(items, paddingPerSide = 0) {
    const startTime = performance.now();
    
    if (!items || items.length === 0) {
      return this.emptyResult('ffd', startTime);
    }

    const expandedItems = this.expandItems(items);
    const totals = this.calculateTotals(expandedItems);
    const validBoxes = this.getValidBoxes(expandedItems, paddingPerSide);

    if (validBoxes.length === 0) {
      return this.noBoxResult('ffd', expandedItems, totals, startTime);
    }

    for (const box of validBoxes) {
      const result = this.tryPackFFD(expandedItems, box, paddingPerSide);
      if (result && result.packedItems.length === expandedItems.length) {
        return this.buildResult('ffd', box, result, expandedItems, totals, paddingPerSide, startTime);
      }
    }

    const largestBox = validBoxes[validBoxes.length - 1];
    const partialResult = this.tryPackFFD(expandedItems, largestBox, paddingPerSide);
    return this.buildResult('ffd', largestBox, partialResult, expandedItems, totals, paddingPerSide, startTime, false);
  }

  tryPackFFD(items, box, padding) {
    const packer = new Packer();
    const innerL = box.length - padding * 2;
    const innerW = box.width - padding * 2;
    const innerH = box.height - padding * 2;

    packer.addBin(new Bin('box', innerL, innerH, innerW, box.max_weight || 1000));

    const sorted = [...items].sort((a, b) => 
      (b.length * b.width * b.height) - (a.length * a.width * a.height)
    );

    sorted.forEach((item, i) => {
      packer.addItem(new BPItem(
        `${item.sku}__${item.originalIndex}`,
        item.length,
        item.height,
        item.width,
        item.weight
      ));
    });

    packer.pack();

    const packedBin = packer.bins[0];
    if (!packedBin || !packedBin.items) {
      return { packedItems: [], unpackedItems: items };
    }

    return this.extractBinpackingResults(packedBin, items, padding);
  }

  extractBinpackingResults(packedBin, originalItems, padding) {
    const itemMap = new Map();
    originalItems.forEach(item => itemMap.set(item.originalIndex, item));

    const packedItems = packedBin.items.map(packed => {
      const nameParts = packed.name.split('__');
      const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
      const original = itemMap.get(originalIndex) || originalItems[0];

      const dims = packed.getDimension();
      return {
        sku: original.sku,
        color: original.color,
        x: packed.position[0] / SCALE + padding,
        y: packed.position[1] / SCALE + padding,
        z: packed.position[2] / SCALE + padding,
        packedLength: dims[0] / SCALE,
        packedHeight: dims[1] / SCALE,
        packedWidth: dims[2] / SCALE
      };
    });

    const packedIndices = new Set(packedBin.items.map(p => {
      const parts = p.name.split('__');
      return parseInt(parts[parts.length - 1], 10);
    }));
    const unpackedItems = originalItems.filter(item => !packedIndices.has(item.originalIndex));

    return { packedItems, unpackedItems };
  }

  // EB-AFIT Algorithm
  packEBAFIT(items, paddingPerSide = 0) {
    const startTime = performance.now();

    if (!items || items.length === 0) {
      return this.emptyResult('eb-afit', startTime);
    }

    const expandedItems = this.expandItems(items);
    const totals = this.calculateTotals(expandedItems);
    const validBoxes = this.getValidBoxes(expandedItems, paddingPerSide);

    if (validBoxes.length === 0) {
      return this.noBoxResult('eb-afit', expandedItems, totals, startTime);
    }

    for (const box of validBoxes) {
      const result = this.tryPackEBAFIT(expandedItems, box, paddingPerSide);
      if (result && result.packedItems.length === expandedItems.length) {
        return this.buildResult('eb-afit', box, result, expandedItems, totals, paddingPerSide, startTime);
      }
    }

    const largestBox = validBoxes[validBoxes.length - 1];
    const partialResult = this.tryPackEBAFIT(expandedItems, largestBox, paddingPerSide);
    return this.buildResult('eb-afit', largestBox, partialResult, expandedItems, totals, paddingPerSide, startTime, false);
  }

  tryPackEBAFIT(items, box, padding) {
    const innerL = box.length - padding * 2;
    const innerW = box.width - padding * 2;
    const innerH = box.height - padding * 2;

    const container = new Container('box', innerL, innerW, innerH);

    const ebafitItems = items.map((item, i) => 
      new EBAFITItem(`${item.sku}__${item.originalIndex}`, item.length, item.width, item.height, 1)
    );

    const result = PackingService.packSingle(container, ebafitItems);
    const packResult = result.algorithmPackingResults[0];

    if (!packResult) {
      return { packedItems: [], unpackedItems: items };
    }

    const itemMap = new Map();
    items.forEach(item => itemMap.set(item.originalIndex, item));

    const packedItems = packResult.packedItems.map(packed => {
      const nameParts = packed.id.split('__');
      const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
      const original = itemMap.get(originalIndex) || items[0];

      return {
        sku: original.sku,
        color: original.color,
        x: packed.coordX + padding,
        y: packed.coordY + padding,
        z: packed.coordZ + padding,
        packedLength: packed.packDimX,
        packedHeight: packed.packDimY,
        packedWidth: packed.packDimZ
      };
    });

    const packedIds = new Set(packResult.packedItems.map(p => {
      const parts = p.id.split('__');
      return parseInt(parts[parts.length - 1], 10);
    }));
    const unpackedItems = items.filter(item => !packedIds.has(item.originalIndex));

    return { packedItems, unpackedItems };
  }

  // Multi-Pass FFD Algorithm
  packMultiPassFFD(items, paddingPerSide = 0) {
    const startTime = performance.now();

    if (!items || items.length === 0) {
      return this.emptyResult('multipass-ffd', startTime);
    }

    const expandedItems = this.expandItems(items);
    const totals = this.calculateTotals(expandedItems);
    const validBoxes = this.getValidBoxes(expandedItems, paddingPerSide);

    if (validBoxes.length === 0) {
      return this.noBoxResult('multipass-ffd', expandedItems, totals, startTime);
    }

    const orderings = [
      { name: 'volume', sort: (a, b) => (b.length * b.width * b.height) - (a.length * a.width * a.height) },
      { name: 'footprint', sort: (a, b) => (b.length * b.width) - (a.length * a.width) },
      { name: 'height', sort: (a, b) => a.height - b.height },
      { name: 'length', sort: (a, b) => b.length - a.length },
    ];

    let bestResult = null;
    let bestBox = null;
    let bestOrdering = null;

    for (const box of validBoxes) {
      for (const ordering of orderings) {
        const sortedItems = [...expandedItems].sort(ordering.sort);
        const result = this.tryPackFFDWithOrder(sortedItems, box, paddingPerSide);

        if (result && result.packedItems.length === expandedItems.length) {
          const finalResult = this.buildResult('multipass-ffd', box, result, expandedItems, totals, paddingPerSide, startTime);
          finalResult.ordering = ordering.name;
          return finalResult;
        }

        if (!bestResult || result.packedItems.length > bestResult.packedItems.length) {
          bestResult = result;
          bestBox = box;
          bestOrdering = ordering.name;
        }
      }
    }

    const finalResult = this.buildResult('multipass-ffd', bestBox, bestResult, expandedItems, totals, paddingPerSide, startTime, false);
    finalResult.ordering = bestOrdering;
    return finalResult;
  }

  tryPackFFDWithOrder(sortedItems, box, padding) {
    const packer = new Packer();
    const innerL = box.length - padding * 2;
    const innerW = box.width - padding * 2;
    const innerH = box.height - padding * 2;

    packer.addBin(new Bin('box', innerL, innerH, innerW, box.max_weight || 1000));

    sortedItems.forEach((item, i) => {
      packer.addItem(new BPItem(
        `${item.sku}__${item.originalIndex}`,
        item.length,
        item.height,
        item.width,
        item.weight
      ));
    });

    packer.pack();

    const packedBin = packer.bins[0];
    if (!packedBin || !packedBin.items) {
      return { packedItems: [], unpackedItems: sortedItems };
    }

    return this.extractBinpackingResults(packedBin, sortedItems, padding);
  }

  // Result builders
  emptyResult(algorithm, startTime) {
    return {
      success: false,
      algorithm,
      box: null,
      packedItems: [],
      unpackedItems: [],
      totalWeight: 0,
      itemsVolume: 0,
      boxVolume: 0,
      efficiency: 0,
      executionTime: performance.now() - startTime
    };
  }

  noBoxResult(algorithm, items, totals, startTime) {
    return {
      success: false,
      algorithm,
      box: { name: 'No suitable box', length: 0, width: 0, height: 0 },
      packedItems: [],
      unpackedItems: items,
      totalWeight: totals.weight,
      itemsVolume: totals.volume,
      boxVolume: 0,
      efficiency: 0,
      executionTime: performance.now() - startTime
    };
  }

  buildResult(algorithm, box, packResult, allItems, totals, padding, startTime, success = true) {
    const boxVolume = box.length * box.width * box.height;
    const efficiency = boxVolume > 0 ? (totals.volume / boxVolume) * 100 : 0;

    return {
      success: success && packResult.packedItems.length === allItems.length,
      algorithm,
      box: { ...box },
      packedItems: packResult.packedItems,
      unpackedItems: packResult.unpackedItems,
      totalWeight: totals.weight + (box.box_weight || 0),
      itemsVolume: totals.volume,
      boxVolume,
      efficiency: Math.round(efficiency * 10) / 10,
      executionTime: Math.round((performance.now() - startTime) * 100) / 100
    };
  }

  packAll(items, paddingPerSide = 0) {
    return {
      ffd: this.packFFD(items, paddingPerSide),
      ebafit: this.packEBAFIT(items, paddingPerSide),
      multipass: this.packMultiPassFFD(items, paddingPerSide)
    };
  }
}

window.CartonizationService = CartonizationService;
