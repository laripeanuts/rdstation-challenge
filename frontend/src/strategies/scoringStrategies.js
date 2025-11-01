// Default scoring strategy: +1 point for each matching preference or feature
const defaultScoringStrategy = (product, selections) => {
  const { preferences = [], features = [] } = product;
  const productFields = new Set([...preferences, ...features]);

  return selections.reduce((acc, selection) => {
    return acc + (productFields.has(selection) ? 1 : 0);
  }, 0);
};

// Weighted scoring strategy: different weights for preferences vs features (extra)
const createWeightedScoringStrategy = (weights = {}) => {
  const { preferenceWeight = 2, featureWeight = 1 } = weights;

  return (product, selections) => {
    const { preferences = [], features = [] } = product;
    const preferenceSet = new Set(preferences);
    const featureSet = new Set(features);

    return selections.reduce((acc, selection) => {
      if (preferenceSet.has(selection)) {
        return acc + preferenceWeight;
      }
      if (featureSet.has(selection)) {
        return acc + featureWeight;
      }
      return acc;
    }, 0);
  };
};

export { createWeightedScoringStrategy, defaultScoringStrategy };
