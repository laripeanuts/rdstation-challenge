import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';

jest.mock('../../hooks', () => ({
  useForm: jest.fn(),
  useProducts: jest.fn(),
  useRecommendations: jest.fn(),
}));
jest.mock('../../validators', () => ({
  validateFormData: jest.fn(),
}));

import { useForm, useProducts, useRecommendations } from '../../hooks';
import { validateFormData } from '../../validators';

describe('Form', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', preferences: [], features: [] },
  ];
  const mockPreferences = ['Preferência 1'];
  const mockFeatures = ['Funcionalidade 1'];
  const mockGetRecommendations = jest.fn();
  const mockOnRecommend = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: jest.fn(),
    });

    useProducts.mockReturnValue({
      preferences: mockPreferences,
      features: mockFeatures,
      products: mockProducts,
    });

    useRecommendations.mockReturnValue({
      getRecommendations: mockGetRecommendations,
    });

    validateFormData.mockReturnValue({ isValid: true, errors: [] });
  });

  test('should render form with all fields', () => {
    render(<Form onRecommend={mockOnRecommend} />);

    expect(screen.getByText('Preferências:')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
  });

  test('should call onRecommend when form is submitted with valid data', () => {
    const mockRecommendations = [{ id: 1, name: 'Recommended Product' }];
    mockGetRecommendations.mockReturnValue(mockRecommendations);

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: jest.fn(),
    });

    render(<Form onRecommend={mockOnRecommend} />);

    const form = document.querySelector('form');
    fireEvent.submit(form);

    expect(mockGetRecommendations).toHaveBeenCalled();
    expect(mockOnRecommend).toHaveBeenCalledWith(mockRecommendations);
  });

  test('should show alert when validation fails', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    validateFormData.mockReturnValue({
      isValid: false,
      errors: ['Erro de validação'],
    });

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: jest.fn(),
    });

    render(<Form onRecommend={mockOnRecommend} />);

    const form = document.querySelector('form');
    fireEvent.submit(form);

    expect(alertSpy).toHaveBeenCalledWith('Erro de validação');
    expect(mockGetRecommendations).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  test('should not call onRecommend if callback is not provided', () => {
    mockGetRecommendations.mockReturnValue([{ id: 1, name: 'Product' }]);

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: jest.fn(),
    });

    render(<Form />);

    const form = document.querySelector('form');
    fireEvent.submit(form);

    expect(mockGetRecommendations).toHaveBeenCalled();
  });
});

