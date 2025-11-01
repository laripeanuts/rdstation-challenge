// Multiple products strategy: returns all scored products (already sorted)
const multipleProductsStrategy = (scoredProducts) => {
  return scoredProducts;
};

// Single product strategy: returns the last product with max score (tie-breaking rule)
const singleProductStrategy = (scoredProducts) => {
  if (scoredProducts.length === 0) {
    return [];
  }

  const maxScore = scoredProducts[0].score;
  const topProducts = scoredProducts.filter((p) => p.score === maxScore);
  return [topProducts.at(-1)];
};

// Top N products strategy: returns top N products by score
const createTopNStrategy = (n) => {
  return (scoredProducts) => {
    return scoredProducts.slice(0, n);
  };
};

export { createTopNStrategy, multipleProductsStrategy, singleProductStrategy };
