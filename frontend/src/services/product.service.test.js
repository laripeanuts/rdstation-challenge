import mockProducts from '../mocks/mockProducts';
import { apiClient } from './apiClient.service';
import { getProducts } from './product.service';

jest.mock('./apiClient.service', () => ({
  __esModule: true,
  apiClient: {
    get: jest.fn(),
  },
}));

jest.mock('../mocks/mockProducts', () => [
  { id: 1, name: 'Mock Product 1', preferences: [], features: [] },
  { id: 2, name: 'Mock Product 2', preferences: [], features: [] },
]);

describe('product.service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    // Set development mode by default
    process.env.REACT_APP_IS_DEVELOPMENT = 'true';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should fetch products successfully from API', async () => {
    const apiProducts = [
      { id: 1, name: 'Product 1', preferences: [], features: [] },
      { id: 2, name: 'Product 2', preferences: [], features: [] },
    ];

    apiClient.get.mockResolvedValue({ data: apiProducts });

    const result = await getProducts();

    expect(apiClient.get).toHaveBeenCalledWith('/products');
    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(apiProducts);
  });

  test('should use mock data in production without API URL', async () => {
    delete process.env.REACT_APP_API_URL;
    process.env.REACT_APP_IS_DEVELOPMENT = 'false';

    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();

    const result = await getProducts();

    expect(apiClient.get).not.toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Usando dados mockados (produção sem backend)'
    );

    consoleInfoSpy.mockRestore();
  });

  test('should fallback to mock when API fails', async () => {
    const error = new Error('Network Error');
    apiClient.get.mockRejectedValue(error);

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const result = await getProducts();

    expect(apiClient.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual(mockProducts);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Erro ao obter produtos da API, usando mock como fallback:',
      error
    );

    consoleWarnSpy.mockRestore();
  });

  test('should return empty array when API returns empty data', async () => {
    apiClient.get.mockResolvedValue({ data: [] });

    const result = await getProducts();

    expect(result).toEqual([]);
    expect(apiClient.get).toHaveBeenCalledWith('/products');
  });

  test('should try API when REACT_APP_API_URL is set in production', async () => {
    process.env.REACT_APP_API_URL = 'https://api.example.com';
    process.env.REACT_APP_IS_DEVELOPMENT = 'false';

    const apiProducts = [
      { id: 1, name: 'Product 1', preferences: [], features: [] },
    ];

    apiClient.get.mockResolvedValue({ data: apiProducts });

    const result = await getProducts();

    expect(apiClient.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual(apiProducts);
  });

  test('should handle API errors and fallback to mock', async () => {
    const error = {
      response: {
        status: 404,
        data: { message: 'Not found' },
      },
    };
    apiClient.get.mockRejectedValue(error);

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const result = await getProducts();

    expect(result).toEqual(mockProducts);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Erro ao obter produtos da API, usando mock como fallback:',
      error
    );

    consoleWarnSpy.mockRestore();
  });

  test('should try API in development mode even without API URL', async () => {
    delete process.env.REACT_APP_API_URL;
    process.env.REACT_APP_IS_DEVELOPMENT = 'true';

    const apiProducts = [
      { id: 1, name: 'Product 1', preferences: [], features: [] },
    ];

    apiClient.get.mockResolvedValue({ data: apiProducts });

    const result = await getProducts();

    // Should try API in development even without REACT_APP_API_URL
    expect(apiClient.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual(apiProducts);
  });
});
