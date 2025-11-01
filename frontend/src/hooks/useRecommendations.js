// useRecommendations.js

import { useCallback, useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = useCallback(
    (formData) => {
      return recommendationService.getRecommendations(formData, products);
    },
    [products]
  );

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
