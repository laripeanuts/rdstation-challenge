import {
  multipleProductsStrategy,
  singleProductStrategy,
  createTopNStrategy,
} from './selectionStrategies';

describe('selectionStrategies', () => {
  const mockScoredProducts = [
    { id: 1, name: 'Product 1', score: 5 },
    { id: 2, name: 'Product 2', score: 3 },
    { id: 3, name: 'Product 3', score: 3 },
    { id: 4, name: 'Product 4', score: 1 },
  ];

  describe('multipleProductsStrategy', () => {
    test('should return all products', () => {
      const result = multipleProductsStrategy(mockScoredProducts);
      expect(result).toEqual(mockScoredProducts);
      expect(result).toHaveLength(4);
    });

    test('should return empty array for empty input', () => {
      const result = multipleProductsStrategy([]);
      expect(result).toEqual([]);
    });

    test('should not modify the original array', () => {
      const original = [...mockScoredProducts];
      multipleProductsStrategy(mockScoredProducts);
      expect(mockScoredProducts).toEqual(original);
    });
  });

  describe('singleProductStrategy', () => {
    test('should return single product with highest score', () => {
      const result = singleProductStrategy(mockScoredProducts);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].score).toBe(5);
    });

    test('should return last product in case of tie', () => {
      const tiedProducts = [
        { id: 1, name: 'Product 1', score: 3 },
        { id: 2, name: 'Product 2', score: 3 },
        { id: 3, name: 'Product 3', score: 3 },
      ];
      const result = singleProductStrategy(tiedProducts);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    test('should return empty array for empty input', () => {
      const result = singleProductStrategy([]);
      expect(result).toEqual([]);
    });

    test('should handle single product', () => {
      const singleProduct = [{ id: 1, name: 'Product 1', score: 5 }];
      const result = singleProductStrategy(singleProduct);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });

  describe('createTopNStrategy', () => {
    test('should return top N products', () => {
      const strategy = createTopNStrategy(2);
      const result = strategy(mockScoredProducts);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    test('should return all products if N exceeds array length', () => {
      const strategy = createTopNStrategy(10);
      const result = strategy(mockScoredProducts);
      expect(result).toHaveLength(4);
    });

    test('should return empty array for N = 0', () => {
      const strategy = createTopNStrategy(0);
      const result = strategy(mockScoredProducts);
      expect(result).toEqual([]);
    });

    test('should handle single product request', () => {
      const strategy = createTopNStrategy(1);
      const result = strategy(mockScoredProducts);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });
});

