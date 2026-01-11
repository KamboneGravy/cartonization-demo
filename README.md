# Cartonization Algorithm Comparison Tool

A visual comparison tool for evaluating 3D bin packing algorithms for Texas Art Supply's shipping operations. This tool allows side-by-side comparison of three different packing algorithms to identify which performs best for real order profiles.

![Three-pane visualization comparing FFD, EB-AFIT, and Multi-Pass FFD algorithms](screenshot.png)

## Purpose

Texas Art Supply's Shopify carrier services app uses bin packing to determine optimal box selection for shipping. This tool was built to:

1. **Visualize** how different algorithms pack items into boxes
2. **Compare** algorithm performance (efficiency, box selection, execution time)
3. **Identify** which algorithm produces the lowest billable weight
4. **Test** real product combinations against the actual box inventory

## Quick Start

```bash
cd /Users/kameron/Projects/cartonization-demo
npx serve .
# Open http://localhost:3000
```

Or with Python:
```bash
python -m http.server 8000
# Open http://localhost:8000
```

## The Three Algorithms

### 1. FFD (First Fit Decreasing) — Current Production Algorithm

**Package:** `binpackingjs`

FFD is a classic heuristic that sorts items by volume (largest first) and places each item in the first position where it fits.

**How it works:**
1. Sort all items by volume, descending
2. For each item, scan the container for the first available position
3. Place the item and update available space
4. Repeat until all items are placed or no space remains

**Characteristics:**
- Fast execution (1-5ms typical)
- Order-dependent: different input orderings can produce different results
- Simple and predictable
- May miss optimal packings that require specific item arrangements

---

### 2. EB-AFIT (Extreme Back - Air Force Institute of Technology)

**Package:** `3d-bin-packing-ts`

EB-AFIT is a sophisticated algorithm developed by Erhan Baltacıoğlu at the U.S. Air Force Institute of Technology (2001). It was published in the *International Journal of Operational Research* (2006) and is used by AWS's bin packing solution.

**How it works:**
1. Try all 6 possible container orientations
2. For each orientation, build "layers" of items along one axis
3. Within each layer, use an extreme-point placement strategy
4. Track the best packing found across all orientations
5. Return the packing with highest volume utilization

**Characteristics:**
- More thorough search than FFD (5-20ms typical)
- Tries multiple container orientations automatically
- Often finds packings that FFD misses
- Better at handling mixed item sizes
- Military-grade algorithm with academic validation

---

### 3. Multi-Pass FFD

**Package:** `binpackingjs` (custom wrapper)

Multi-Pass FFD addresses FFD's order-dependency by trying multiple item orderings and keeping the best result.

**How it works:**
1. Define 4 ordering strategies:
   - **Volume:** Largest volume first (standard FFD)
   - **Footprint:** Largest base area first
   - **Height:** Thinnest items first
   - **Length:** Longest dimension first
2. Run FFD with each ordering
3. Return the first complete packing found, or the best partial packing

**Characteristics:**
- 4x the work of standard FFD (4-20ms typical)
- Mitigates FFD's order-sensitivity
- Simple to understand and debug
- Good balance of thoroughness and speed

---

## How Box Selection Works

The simulator selects boxes using a **smallest-box-that-fits** strategy:

### Step 1: Filter Valid Boxes

Before packing, boxes are filtered by two criteria:

1. **Weight capacity:** Total item weight must not exceed `max_weight`
2. **Minimum dimensions:** The largest item (in any rotation) must fit inside the box

```
For each item, sort dimensions [length, width, height] largest to smallest.
For the box to be valid, its sorted dimensions must each be ≥ the item's sorted dimensions.
```

### Step 2: Sort by Volume

Valid boxes are sorted by volume (smallest first):

```
Box 7x5x5 (175 in³) → Box 9x7x5 (315 in³) → Box 10x8x5 (400 in³) → ...
```

### Step 3: Try Each Box

The algorithm attempts to pack all items into each box, starting with the smallest:

```
for each box in validBoxes (smallest to largest):
    result = tryPack(items, box)
    if all items fit:
        return box  // Success! Use this box.
        
// If no box fits all items, return the largest box with partial packing
```

### Step 4: Winner Selection

The "winner" (★ Best) is determined by **lowest billable weight**:

```
Billable Weight = max(Actual Weight, DIM Weight)
DIM Weight = (Length × Width × Height) / DIM Divisor
```

A smaller box with lower DIM weight often wins even if multiple algorithms successfully pack.

---

## Box Inventory

The simulator includes boxes from four sources:

| Category | Count | Description |
|----------|-------|-------------|
| **Texas Art** | 26 | Warehouse box inventory (7x5x5 through 41x33x4) |
| **USPS** | 5 | Priority Mail Flat Rate boxes |
| **FedEx** | 5 | Express boxes and tube |
| **UPS** | 4 | Express boxes and tube |

Boxes can be enabled/disabled individually to test different inventory scenarios.

---

## Interface Guide

### Left Panel: Product Catalog
- Search 500+ Texas Art products by SKU or name
- Click to add items to cart
- Shows dimensions and weight for each product

### Center Panel: Algorithm Visualizations
- Three synchronized 3D views (drag to rotate, scroll to zoom)
- Box wireframe shows container bounds
- Colored blocks show packed item positions
- Status badges: ✓ All packed | ✗ N unpacked | ★ Best

### Right Panel: Cart & Settings
- **Padding:** Extra space per side (for dunnage/protection)
- **DIM Divisor:** 139 (standard), 166, 194, 220 (FedEx)
- **Cart:** Current items with quantity controls
- **Box Inventory:** Enable/disable specific boxes

### Bottom Panel: Stats Comparison
| Metric | Description |
|--------|-------------|
| Box Selected | Which box the algorithm chose |
| Box Volume | Total box volume (in³) |
| Fill % | Item volume / Box volume |
| DIM Wt | Dimensional weight (Box Volume / DIM Divisor) |
| Billable | max(Actual Weight, DIM Weight) |
| Time | Algorithm execution time (ms) |
| Status | Success or number of unpacked items |

---

## File Structure

```
cartonization-demo/
├── index.html              # Main application (HTML + JS + CSS)
├── browser-entry.js        # Cartonization service (source for bundle)
├── cartonization.bundle.js # Bundled JS with dependencies
├── cartonization.js        # Node.js version (for testing)
├── boxes.json              # Box inventory definitions
├── products.json           # Texas Art product catalog
├── package.json            # npm dependencies
└── README.md               # This file
```

## Building

If you modify `browser-entry.js`, rebuild the bundle:

```bash
npm install  # First time only
npx esbuild browser-entry.js --bundle --outfile=cartonization.bundle.js --format=iife --platform=browser
```

## Dependencies

- **binpackingjs:** FFD algorithm implementation
- **3d-bin-packing-ts:** EB-AFIT algorithm implementation
- **Three.js:** 3D visualization (loaded via CDN)

---

## Next Steps

After identifying the best-performing algorithm:

1. **Integrate** the winning algorithm into production at:
   `/Users/kameron/Projects/shopify-carrier-services-app/services/cartonizationService.js`

2. **Consider** flat-rate box pricing logic (USPS flat-rate may be cheaper regardless of DIM weight)

3. **Address** box inventory gaps identified during testing

---

## References

- [EB-AFIT Paper (2006)](https://www.researchgate.net/publication/226249396_The_distributor's_three-dimensional_pallet-packing_problem_A_human_intelligence-based_heuristic_approach) - Original algorithm description
- [3d-bin-packing-ts](https://github.com/pjpscriv/3d-bin-packing-ts) - TypeScript implementation
- [binpackingjs](https://github.com/olragon/binpackingjs) - FFD implementation
