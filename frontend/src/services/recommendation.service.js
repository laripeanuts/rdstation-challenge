// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  const allSelections = [...selectedPreferences, ...selectedFeatures];

  if (allSelections.length === 0) {
    return [];
  }

  // Add a score product preference and feature matches to each product
  const scoredProducts = products
    .map((product) => {
      const { preferences = [], features = [] } = product;
      const productFields = new Set([...preferences, ...features]);

      const score = allSelections.reduce((acc, selection) => {
        return acc + (productFields.has(selection) ? 1 : 0);
      }, 0);

      return {
        ...product,
        score,
      };
    })
    .filter((product) => product.score > 0)
    .sort((a, b) => b.score - a.score);
  console.log('🚀 ~ getRecommendations ~ scoredProducts:', scoredProducts);

  if (scoredProducts.length === 0) {
    return [];
  }

  if (selectedRecommendationType === 'MultipleProducts') {
    return scoredProducts;
  }

  // SingleProduct mode: return the last product with max score (tie-breaking rule)
  const maxScore = scoredProducts[0].score;
  const topProducts = scoredProducts.filter((p) => p.score === maxScore);
  return [topProducts.at(-1)];
};

const recommendationService = { getRecommendations };

export default recommendationService;
