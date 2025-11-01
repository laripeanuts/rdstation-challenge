import getProducts from './product.service';

import axios from 'axios';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe('product.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch products successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', preferences: [], features: [] },
      { id: 2, name: 'Product 2', preferences: [], features: [] },
    ];

    axios.get.mockResolvedValue({ data: mockProducts });

    const result = await getProducts();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
  });

  test('should handle error when fetching products fails', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(getProducts()).rejects.toThrow('Network Error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      error
    );
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');

    consoleErrorSpy.mockRestore();
  });

  test('should return empty array when API returns empty data', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const result = await getProducts();

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
  });

  test('should handle API errors with custom message', async () => {
    const error = {
      response: {
        status: 404,
        data: { message: 'Not found' },
      },
    };
    axios.get.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(getProducts()).rejects.toEqual(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      error
    );

    consoleErrorSpy.mockRestore();
  });
});
