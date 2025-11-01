import {
  defaultScoringStrategy,
  createWeightedScoringStrategy,
} from './scoringStrategies';

describe('scoringStrategies', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    category: 'Test',
    preferences: ['pref1', 'pref2', 'pref3'],
    features: ['feat1', 'feat2'],
  };

  describe('defaultScoringStrategy', () => {
    test('should return 0 for no matches', () => {
      const selections = ['nonexistent1', 'nonexistent2'];
      const score = defaultScoringStrategy(mockProduct, selections);
      expect(score).toBe(0);
    });

    test('should return correct score for preference matches', () => {
      const selections = ['pref1', 'pref2'];
      const score = defaultScoringStrategy(mockProduct, selections);
      expect(score).toBe(2);
    });

    test('should return correct score for feature matches', () => {
      const selections = ['feat1', 'feat2'];
      const score = defaultScoringStrategy(mockProduct, selections);
      expect(score).toBe(2);
    });

    test('should return correct score for mixed matches', () => {
      const selections = ['pref1', 'feat1', 'nonexistent'];
      const score = defaultScoringStrategy(mockProduct, selections);
      expect(score).toBe(2);
    });

    test('should handle empty selections', () => {
      const selections = [];
      const score = defaultScoringStrategy(mockProduct, selections);
      expect(score).toBe(0);
    });

    test('should handle product without preferences', () => {
      const product = { ...mockProduct, preferences: undefined };
      const selections = ['feat1'];
      const score = defaultScoringStrategy(product, selections);
      expect(score).toBe(1);
    });

    test('should handle product without features', () => {
      const product = { ...mockProduct, features: undefined };
      const selections = ['pref1'];
      const score = defaultScoringStrategy(product, selections);
      expect(score).toBe(1);
    });
  });

  describe('createWeightedScoringStrategy', () => {
    test('should use default weights when not specified', () => {
      const strategy = createWeightedScoringStrategy();
      const selections = ['pref1', 'feat1'];
      const score = strategy(mockProduct, selections);
      expect(score).toBe(3); // 2 for preference + 1 for feature
    });

    test('should apply custom weights correctly', () => {
      const strategy = createWeightedScoringStrategy({
        preferenceWeight: 3,
        featureWeight: 2,
      });
      const selections = ['pref1', 'feat1'];
      const score = strategy(mockProduct, selections);
      expect(score).toBe(5); // 3 for preference + 2 for feature
    });

    test('should return 0 for no matches with custom weights', () => {
      const strategy = createWeightedScoringStrategy({
        preferenceWeight: 5,
        featureWeight: 3,
      });
      const selections = ['nonexistent'];
      const score = strategy(mockProduct, selections);
      expect(score).toBe(0);
    });

    test('should handle multiple preference matches', () => {
      const strategy = createWeightedScoringStrategy({
        preferenceWeight: 2,
        featureWeight: 1,
      });
      const selections = ['pref1', 'pref2', 'pref3'];
      const score = strategy(mockProduct, selections);
      expect(score).toBe(6); // 2 * 3 preferences
    });
  });
});

