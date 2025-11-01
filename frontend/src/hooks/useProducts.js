import { useEffect, useMemo, useState } from 'react';
import getProducts from '../services/product.service';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Erro ao obter os produtos:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { preferences, features } = useMemo(() => {
    if (!products.length) {
      return { preferences: [], features: [] };
    }

    const { preferences, features } = products.reduce(
      (acc, product) => ({
        preferences: [...new Set([...acc.preferences, ...product.preferences])],
        features: [...new Set([...acc.features, ...product.features])],
      }),
      { preferences: [], features: [] }
    );

    return {
      preferences,
      features,
    };
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { preferences, features, products, isLoading, error };
};
