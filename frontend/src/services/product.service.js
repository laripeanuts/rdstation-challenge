import mockProducts from '../mocks/mockProducts';
import { apiClient } from './apiClient.service';

export const getProducts = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const isDevelopmentMode = process.env.REACT_APP_IS_DEVELOPMENT === 'true';

  // In a production environment without API configured, use mock data only for testing purposes.
  if (!apiUrl && !isDevelopmentMode) {
    console.info('Usando dados mockados (produção sem backend)');
    return mockProducts;
  }

  // Try to fetch from API (development or production with API configured), if fails, use mock as fallback.
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.warn(
      'Erro ao obter produtos da API, usando mock como fallback:',
      error
    );
    // Fallback to mock in case of error
    return mockProducts;
  }
};
