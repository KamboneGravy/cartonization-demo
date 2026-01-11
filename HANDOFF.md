# Cartonization Project Handoff Document

**Date:** January 11, 2026  
**Project:** Texas Art Supply Cartonization System  
**Status:** Visualizer complete and functional, ready for analysis and production integration

---

## Project Overview

Texas Art Supply uses a Shopify carrier services app to calculate shipping rates. The app needs to determine the optimal box for each order (cartonization). This project built a visual comparison tool to evaluate three bin-packing algorithms before selecting one for production.

### Repositories & Locations

| Component | Path |
|-----------|------|
| **Visualizer** (this project) | `/Users/kameron/Projects/cartonization-demo/` |
| **Production App** | `/Users/kameron/Projects/shopify-carrier-services-app/` |
| **Cartonization Service** | `.../shopify-carrier-services-app/services/cartonizationService.js` |

---

## Current State

### What's Complete

1. **Three-algorithm visualizer** comparing:
   - **FFD** (First Fit Decreasing) - current production algorithm via `binpackingjs`
   - **EB-AFIT** (Air Force Institute of Technology) - via `3d-bin-packing-ts`
   - **Multi-Pass FFD** - custom wrapper trying 4 item orderings

2. **Box inventory** (40 boxes):
   - 26 Texas Art warehouse boxes
   - 5 USPS Flat Rate boxes
   - 5 FedEx Express boxes
   - 4 UPS Express boxes

3. **Product catalog**: 500 products loaded from `products.json`

4. **Metrics calculated**:
   - Box volume, fill percentage
   - DIM weight (configurable divisor: 139, 166, 194, 220)
   - Billable weight: `max(actual_weight, dim_weight)`
   - Execution time
   - Winner selection based on lowest billable weight

### Key Files

```
cartonization-demo/
├── index.html              # Main app (UI + Three.js visualization)
├── browser-entry.js        # Cartonization algorithms (source)
├── cartonization.bundle.js # Bundled JS (rebuild after changes)
├── boxes.json              # Box inventory with dimensions, weights, limits
├── products.json           # Product catalog from Texas Art DB
├── README.md               # Documentation
└── package.json            # Dependencies
```

### Build Command

```bash
cd /Users/kameron/Projects/cartonization-demo
npx esbuild browser-entry.js --bundle --outfile=cartonization.bundle.js --format=iife --platform=browser
```

---

## Technical Details

### Coordinate Systems (Important!)

All three algorithms now use consistent coordinates:
- **X** = length (left/right)
- **Y** = height (vertical, up/down)
- **Z** = width (front/back)

The EB-AFIT library was initially returning items outside box bounds in the visualizer. This was fixed by correcting the coordinate mapping in `browser-entry.js` (the library uses Y as vertical, matching Three.js).

### Box Selection Logic

1. Filter boxes by weight capacity and minimum dimensions
2. Sort by volume (smallest first)
3. Try packing into each box, smallest to largest
4. Return first box where all items fit
5. "Winner" = lowest billable weight among successful packings

### Billable Weight Formula

```javascript
dimWeight = boxVolume / dimDivisor;
billable = Math.max(actualWeight, dimWeight);
```

When actual weight exceeds DIM weight, all algorithms show identical billable (the heavier wins).

---

## Potential Next Steps

### 1. Batch Order Simulation

**Goal:** Determine which algorithm performs best across real historical orders.

**Approach:**
- Export last 10,000 orders from Shopify (order line items with SKUs and quantities)
- Create a batch runner that processes each order through all 3 algorithms
- Aggregate results: total shipping cost, box usage distribution, failure rate

**Data needed:**
```json
// orders.json format
[
  {
    "order_id": "12345",
    "items": [
      { "sku": "ABC123", "quantity": 2 },
      { "sku": "XYZ789", "quantity": 1 }
    ]
  }
]
```

**Metrics to compare:**
- Total billable weight across all orders
- Number of orders requiring multiple boxes
- Percentage of orders where algorithms disagree
- Average execution time per order
- Cost savings if switching algorithms

### 2. Production Integration

**Current state:** Production uses FFD in `/Users/kameron/Projects/shopify-carrier-services-app/services/cartonizationService.js`

**Integration options:**

A. **Replace FFD with EB-AFIT** if batch simulation shows it's consistently better

B. **Hybrid approach:** Try FFD first (fast), fall back to EB-AFIT if FFD fails or box is borderline

C. **A/B test:** Run both in production, log results, compare over time

**Code location to modify:**
```javascript
// shopify-carrier-services-app/services/cartonizationService.js
// Replace or augment the packing logic
```

### 3. Flat-Rate Box Optimization

**Problem:** USPS Flat Rate boxes have fixed shipping costs regardless of weight/distance. The current system doesn't account for this—it only optimizes for smallest box.

**Opportunity:** For heavy items shipping long distances, a Flat Rate box might be cheaper than a smaller custom box charged by DIM weight.

**Implementation approach:**
1. Add `flat_rate_price` field to boxes.json for USPS boxes
2. Modify winner selection:
   ```javascript
   // Current: winner = lowest billable weight
   // New: winner = lowest shipping cost
   // Where cost = flat_rate_price OR calculated_rate(billable_weight, zone)
   ```
3. Requires zone/distance info (or carrier rate API) to compare

**USPS Flat Rate Prices (2025 approximate):**
| Box | Price |
|-----|-------|
| Small | $10.40 |
| Medium | $17.10 |
| Large | $22.45 |

### 4. Branded Packaging

**Goal:** Prefer Texas Art branded boxes when possible, fall back to carrier boxes only when necessary.

**Implementation:**
1. Add `branded: true` flag to Texas Art boxes in boxes.json
2. Add `prefer_branded` setting to UI
3. Modify box selection:
   ```javascript
   // Try branded boxes first
   const brandedBoxes = validBoxes.filter(b => b.branded);
   for (const box of brandedBoxes) {
     if (canPack(items, box)) return box;
   }
   // Fall back to any box
   for (const box of validBoxes) {
     if (canPack(items, box)) return box;
   }
   ```

### 5. Box Inventory Gap Analysis

**Goal:** Identify missing box sizes that would improve packing efficiency.

**Approach:**
1. Run batch simulation on historical orders
2. For orders with low fill percentage (<50%), analyze what box size would be optimal
3. Cluster these "ideal" sizes to identify common gaps
4. Recommend new box sizes to add to inventory

### 6. Multi-Box Orders

**Current limitation:** Each algorithm tries to fit everything in one box.

**Enhancement:** Support splitting orders across multiple boxes when necessary.

The EB-AFIT library has `packIncremental()` which automatically creates multiple containers:
```javascript
const result = PackingService.packIncremental(items, containerDimensions);
// result.containers = array of boxes used
// result.aggregatedResults = which items went where
```

---

## Data Requirements for Analysis

### To run batch simulation, you'll need:

1. **Historical orders export** from Shopify:
   - Order ID
   - Line items (SKU, quantity)
   - Ship-to zone (for rate comparison)
   - Actual box used (if tracked)
   - Actual shipping cost paid

2. **Products data** (already have in products.json):
   - SKU
   - Dimensions (L × W × H)
   - Weight

3. **Carrier rate tables** (for cost comparison):
   - USPS zones + rates
   - FedEx/UPS rate cards
   - Flat rate prices

### Shopify export query (GraphQL):
```graphql
{
  orders(first: 100, query: "created_at:>2025-01-01") {
    edges {
      node {
        id
        lineItems(first: 50) {
          edges {
            node {
              sku
              quantity
            }
          }
        }
        shippingAddress {
          zip
        }
      }
    }
  }
}
```

---

## Questions to Explore

1. **Algorithm performance:** Across 10K orders, which algorithm produces the lowest total shipping cost?

2. **Flat rate breakeven:** At what weight/distance does USPS Flat Rate beat DIM-based pricing?

3. **Box inventory ROI:** If we add a 15×10×6 box, how many orders would use it and what's the savings?

4. **Multi-box threshold:** At what order size should we automatically split into multiple boxes?

5. **Speed vs accuracy tradeoff:** Is EB-AFIT's extra 10-15ms worth it for production?

---

## Running the Visualizer

```bash
cd /Users/kameron/Projects/cartonization-demo
npx serve .
# Open http://localhost:3000
```

Or:
```bash
python -m http.server 8000
# Open http://localhost:8000
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| binpackingjs | ^1.0.2 | FFD algorithm |
| 3d-bin-packing-ts | ^1.0.7 | EB-AFIT algorithm |
| esbuild | ^0.20.0 | Bundle for browser |
| Three.js | r128 | 3D visualization (CDN) |

---

## Contact Points

- **Visualizer issues:** Check browser console, rebuild bundle after changes
- **Algorithm questions:** See README.md for detailed explanations
- **Production integration:** `/Users/kameron/Projects/shopify-carrier-services-app/`

---

## Summary

The visualizer is complete and working. The next phase is **analysis and integration**:

1. Export historical orders from Shopify
2. Run batch simulation to find the best algorithm
3. Implement flat-rate logic for cost optimization
4. Integrate winning approach into production
5. Optionally add branded box preferences and multi-box support

The visualizer can continue to serve as a debugging and demonstration tool for edge cases and customer support scenarios.
