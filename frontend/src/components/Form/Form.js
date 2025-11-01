// Form.js

import React from 'react';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ onRecommend }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.selectedPreferences.length &&
      !formData.selectedFeatures.length
    ) {
      alert(
        'Por favor, selecione pelo menos uma preferência ou funcionalidade para obter uma recomendação.'
      );
      return;
    }

    if (!formData.selectedRecommendationType) {
      alert(
        'Por favor, selecione um tipo de recomendação para obter uma recomendação.'
      );
      return;
    }

    const dataRecommendations = getRecommendations(formData);

    if (onRecommend) {
      onRecommend(dataRecommendations);
    }
  };

  return (
    <form
      className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
