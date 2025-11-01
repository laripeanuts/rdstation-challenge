import { act, renderHook } from '@testing-library/react';
import { recommendationService } from '../services/recommendation.service';
import { useRecommendations } from './useRecommendations';

jest.mock('../services/recommendation.service');

describe('useRecommendations', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', preferences: [], features: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with empty recommendations', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    expect(result.current.recommendations).toEqual([]);
    expect(result.current.getRecommendations).toBeDefined();
    expect(result.current.setRecommendations).toBeDefined();
  });

  test('should call recommendation service with correct parameters', () => {
    const mockRecommendations = [{ id: 1, name: 'Product 1' }];
    recommendationService.getRecommendations.mockReturnValue(
      mockRecommendations
    );

    const formData = {
      selectedPreferences: ['pref1'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations = result.current.getRecommendations(formData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      mockProducts
    );
    expect(recommendations).toEqual(mockRecommendations);
  });

  test('should memoize getRecommendations based on products', () => {
    const { result, rerender } = renderHook(
      ({ products }) => useRecommendations(products),
      {
        initialProps: { products: mockProducts },
      }
    );

    const firstGetRecommendations = result.current.getRecommendations;

    rerender({ products: mockProducts });
    expect(result.current.getRecommendations).toBe(firstGetRecommendations);

    const newProducts = [{ id: 2, name: 'Product 2' }];
    rerender({ products: newProducts });
    expect(result.current.getRecommendations).not.toBe(firstGetRecommendations);
  });

  test('should allow setting recommendations manually', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    const newRecommendations = [{ id: 1, name: 'New Product' }];

    expect(result.current.recommendations).toEqual([]);

    act(() => {
      result.current.setRecommendations(newRecommendations);
    });

    expect(result.current.recommendations).toEqual(newRecommendations);
  });

  test('should handle empty products array', () => {
    recommendationService.getRecommendations.mockReturnValue([]);

    const formData = {
      selectedPreferences: ['pref1'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const { result } = renderHook(() => useRecommendations([]));

    const recommendations = result.current.getRecommendations(formData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      []
    );
    expect(recommendations).toEqual([]);
  });

  test('should handle multiple calls with different form data', () => {
    const formData1 = {
      selectedPreferences: ['pref1'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const formData2 = {
      selectedPreferences: ['pref2'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    recommendationService.getRecommendations
      .mockReturnValueOnce([{ id: 1, name: 'Product 1' }])
      .mockReturnValueOnce([{ id: 2, name: 'Product 2' }]);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations1 = result.current.getRecommendations(formData1);
    const recommendations2 = result.current.getRecommendations(formData2);

    expect(recommendationService.getRecommendations).toHaveBeenCalledTimes(2);
    expect(recommendations1).toEqual([{ id: 1, name: 'Product 1' }]);
    expect(recommendations2).toEqual([{ id: 2, name: 'Product 2' }]);
  });
});
