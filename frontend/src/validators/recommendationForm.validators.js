const validateFormData = (formData) => {
  const errors = [];

  if (!formData) {
    errors.push('Dados do formulário são obrigatórios');
    return { isValid: false, errors };
  }

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  if (!selectedRecommendationType) {
    errors.push('Por favor, selecione um tipo de recomendação.');
  }

  if (!Array.isArray(selectedPreferences) || !Array.isArray(selectedFeatures)) {
    errors.push('Preferências e funcionalidades devem ser arrays');
    return { isValid: false, errors };
  }

  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    errors.push(
      'Por favor, selecione pelo menos uma preferência ou funcionalidade.'
    );
  }

  return { isValid: errors.length === 0, errors };
};

export { validateFormData };
