/**
 * Normalize and validate MOQ pricing tiers
 * Ensures tiers are properly ordered and non-overlapping
 * @param {Array} tiers - Array of MOQ tier objects {minQty, maxQty, unitPrice}
 * @returns {Array} Normalized and validated tiers
 */
export const normalizeAndValidateTiers = (tiers) => {
  if (!Array.isArray(tiers) || tiers.length === 0) {
    throw new Error('At least one MOQ tier is required');
  }

  // Sort tiers by minQty
  const sortedTiers = [...tiers].sort((a, b) => a.minQty - b.minQty);
  
  // Validate and normalize
  const normalizedTiers = sortedTiers.map((tier, index) => {
    // Validate required fields
    if (typeof tier.minQty !== 'number' || tier.minQty < 1) {
      throw new Error(`Invalid minQty in tier ${index + 1}`);
    }
    if (typeof tier.unitPrice !== 'number' || tier.unitPrice <= 0) {
      throw new Error(`Invalid unitPrice in tier ${index + 1}`);
    }
    
    // Handle maxQty - last tier should have maxQty 999999 (effectively infinite)
    let maxQty = tier.maxQty;
    if (index === sortedTiers.length - 1) {
      maxQty = 999999;
    } else if (typeof maxQty !== 'number' || maxQty < tier.minQty) {
      // Auto-calculate maxQty based on next tier's minQty
      const nextMinQty = sortedTiers[index + 1].minQty;
      maxQty = nextMinQty - 1;
    }
    
    return {
      minQty: Math.floor(tier.minQty),
      maxQty: Math.floor(maxQty),
      unitPrice: parseFloat(tier.unitPrice.toFixed(2))
    };
  });

  // Validate no gaps or overlaps
  for (let i = 0; i < normalizedTiers.length - 1; i++) {
    if (normalizedTiers[i].maxQty + 1 !== normalizedTiers[i + 1].minQty) {
      throw new Error('MOQ tiers must be contiguous with no gaps or overlaps');
    }
  }

  // Ensure first tier starts at 1
  if (normalizedTiers[0].minQty !== 1) {
    throw new Error('First MOQ tier must start at quantity 1');
  }

  return normalizedTiers;
};

/**
 * Get unit price for a given quantity from normalized MOQ tiers
 * @param {Array} normalizedTiers - Normalized MOQ tiers from normalizeAndValidateTiers
 * @param {number} quantity - Quantity to get price for
 * @returns {number} Unit price for the given quantity
 */
export const getUnitPriceFromTiers = (normalizedTiers, quantity) => {
  if (!Array.isArray(normalizedTiers) || normalizedTiers.length === 0) {
    throw new Error('Invalid MOQ tiers');
  }
  
  if (typeof quantity !== 'number' || quantity < 1) {
    throw new Error('Invalid quantity');
  }

  // Find the tier that contains this quantity
  const tier = normalizedTiers.find(t => quantity >= t.minQty && quantity <= t.maxQty);
  
  if (!tier) {
    // If quantity exceeds all tiers, use the last tier's price
    return normalizedTiers[normalizedTiers.length - 1].unitPrice;
  }
  
  return tier.unitPrice;
};

/**
 * Calculate total price for a quantity using MOQ tiers
 * @param {Array} normalizedTiers - Normalized MOQ tiers
 * @param {number} quantity - Quantity to calculate total for
 * @returns {number} Total price
 */
export const calculateTotalPrice = (normalizedTiers, quantity) => {
  const unitPrice = getUnitPriceFromTiers(normalizedTiers, quantity);
  return parseFloat((unitPrice * quantity).toFixed(2));
};