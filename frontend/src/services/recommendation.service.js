/**
 * Recommendation Service
 * Provides product recommendations based on user preferences and features
 */

import { defaultScoringStrategy } from '../strategies/scoringStrategies';
import {
  multipleProductsStrategy,
  singleProductStrategy,
} from '../strategies/selectionStrategies';

const SELECTION_STRATEGIES = {
  MultipleProducts: multipleProductsStrategy,
  SingleProduct: singleProductStrategy,
};

const getRecommendations = (formData = {}, products = [], options = {}) => {
  const {
    scoringStrategy = defaultScoringStrategy,
    selectionStrategies = SELECTION_STRATEGIES,
  } = options;

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  // Combine all user selections
  const allSelections = [...selectedPreferences, ...selectedFeatures];

  if (allSelections.length === 0) {
    return [];
  }

  // Score products based on matches
  const scoredProducts = products
    .map((product) => ({
      ...product,
      score: scoringStrategy(product, allSelections),
    }))
    .filter((product) => product.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scoredProducts.length === 0) {
    return [];
  }

  // Apply selection strategy based on recommendation type
  const strategy = selectionStrategies[selectedRecommendationType];

  if (!strategy) {
    console.warn(
      `Unknown recommendation type: ${selectedRecommendationType}. Returning all products.`
    );
    return scoredProducts;
  }

  return strategy(scoredProducts);
};

export const recommendationService = { getRecommendations };
