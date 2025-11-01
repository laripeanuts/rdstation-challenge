import { validateFormData } from './recommendationForm.validators';

describe('recommendation form validators', () => {
  describe('validateFormData', () => {
    test('should validate correct form data', () => {
      const formData = {
        selectedPreferences: ['pref1'],
        selectedFeatures: ['feat1'],
        selectedRecommendationType: 'SingleProduct',
      };
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail when recommendation type is missing', () => {
      const formData = {
        selectedPreferences: ['pref1'],
        selectedFeatures: [],
        selectedRecommendationType: '',
      };
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Por favor, selecione um tipo de recomendação.'
      );
    });

    test('should fail when both preferences and features are empty', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Por favor, selecione pelo menos uma preferência ou funcionalidade.'
      );
    });

    test('should fail when formData is null', () => {
      const result = validateFormData(null);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Dados do formulário são obrigatórios');
    });

    test('should fail when preferences is not an array', () => {
      const formData = {
        selectedPreferences: 'not an array',
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Preferências e funcionalidades devem ser arrays'
      );
    });

    test('should pass with only preferences selected', () => {
      const formData = {
        selectedPreferences: ['pref1'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
    });

    test('should pass with only features selected', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: ['feat1'],
        selectedRecommendationType: 'MultipleProducts',
      };
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
    });
  });
});

