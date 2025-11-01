import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';

const mockGetProducts = jest.fn();

jest.mock('../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// eslint-disable-next-line import/first
import getProducts from '../services/product.service';

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getProducts.mockImplementation(mockGetProducts);
  });

  test('should initialize with loading state', async () => {
    getProducts.mockResolvedValue([]);

    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for async effects to complete to avoid warnings
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('should fetch products and extract preferences and features', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        preferences: ['pref1', 'pref2'],
        features: ['feat1', 'feat2'],
      },
      {
        id: 2,
        name: 'Product 2',
        preferences: ['pref2', 'pref3'],
        features: ['feat2', 'feat3'],
      },
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.products).toEqual(mockProducts);
      },
      { timeout: 3000 }
    );

    expect(result.current.preferences).toEqual(['pref1', 'pref2', 'pref3']);
    expect(result.current.features).toEqual(['feat1', 'feat2', 'feat3']);
    expect(result.current.error).toBe(null);
  });

  test('should handle empty products array', async () => {
    getProducts.mockResolvedValue([]);

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.products).toEqual([]);
      },
      { timeout: 3000 }
    );

    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test('should handle products without preferences or features', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        preferences: [],
        features: ['feat1'],
      },
      {
        id: 2,
        name: 'Product 2',
        preferences: ['pref1'],
        features: [],
      },
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.preferences).toEqual(['pref1']);
    expect(result.current.features).toEqual(['feat1']);
  });

  test('should handle error when fetching products fails', async () => {
    const error = new Error('Failed to fetch');
    getProducts.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  test('should remove duplicate preferences and features', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        preferences: ['pref1', 'pref1', 'pref2'],
        features: ['feat1', 'feat1'],
      },
      {
        id: 2,
        name: 'Product 2',
        preferences: ['pref2', 'pref3'],
        features: ['feat1', 'feat2'],
      },
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.preferences).toEqual(['pref1', 'pref2', 'pref3']);
    expect(result.current.features).toEqual(['feat1', 'feat2']);
  });

  test('should fetch products only once on mount', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        preferences: ['pref1'],
        features: ['feat1'],
      },
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual(mockProducts);
  });
});
