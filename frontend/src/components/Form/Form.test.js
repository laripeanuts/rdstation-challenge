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

    expect(screen.getByText('Preferências')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Recomendação')).toBeInTheDocument();
  });

  test('should call onRecommend when form is submitted with valid data', async () => {
    const mockRecommendations = [{ id: 1, name: 'Recommended Product' }];
    mockGetRecommendations.mockReturnValue(mockRecommendations);

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: ['Funcionalidade 1'],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: jest.fn(),
    });

    render(<Form onRecommend={mockOnRecommend} />);

    const form = document.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockGetRecommendations).toHaveBeenCalled();
      expect(mockOnRecommend).toHaveBeenCalledWith({
        recommendations: mockRecommendations,
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: ['Funcionalidade 1'],
      });
    }, { timeout: 2000 });
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

  test('should not call onRecommend if callback is not provided', async () => {
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

    await waitFor(() => {
      expect(mockGetRecommendations).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  test('should update form data when preference is toggled', async () => {
    const mockHandleChange = jest.fn();

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: mockHandleChange,
    });

    render(<Form />);

    const checkboxes = screen.getAllByRole('checkbox');
    const preferenceCheckbox = checkboxes.find(
      (cb) => cb.closest('label')?.textContent?.includes('Preferência 1')
    );

    if (preferenceCheckbox) {
      fireEvent.click(preferenceCheckbox);
      await waitFor(() => {
        expect(mockHandleChange).toHaveBeenCalledWith('selectedPreferences', ['Preferência 1']);
      });
    }
  });

  test('should remove preference when toggling already selected preference', async () => {
    const mockHandleChange = jest.fn();

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: mockHandleChange,
    });

    render(<Form />);

    const checkboxes = screen.getAllByRole('checkbox');
    const preferenceCheckbox = checkboxes.find(
      (cb) => cb.closest('label')?.textContent?.includes('Preferência 1')
    );

    if (preferenceCheckbox) {
      fireEvent.click(preferenceCheckbox);
      await waitFor(() => {
        expect(mockHandleChange).toHaveBeenCalledWith('selectedPreferences', []);
      });
    }
  });

  test('should update form data when feature is toggled', async () => {
    const mockHandleChange = jest.fn();

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: mockHandleChange,
    });

    render(<Form />);

    const checkboxes = screen.getAllByRole('checkbox');
    const featureCheckbox = checkboxes.find(
      (cb) => cb.closest('label')?.textContent?.includes('Funcionalidade 1')
    );

    if (featureCheckbox) {
      fireEvent.click(featureCheckbox);
      await waitFor(() => {
        expect(mockHandleChange).toHaveBeenCalledWith('selectedFeatures', ['Funcionalidade 1']);
      });
    }
  });

  test('should remove feature when toggling already selected feature', async () => {
    const mockHandleChange = jest.fn();

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: ['Funcionalidade 1'],
        selectedRecommendationType: '',
      },
      handleChange: mockHandleChange,
    });

    render(<Form />);

    const checkboxes = screen.getAllByRole('checkbox');
    const featureCheckbox = checkboxes.find(
      (cb) => cb.closest('label')?.textContent?.includes('Funcionalidade 1')
    );

    if (featureCheckbox) {
      fireEvent.click(featureCheckbox);
      await waitFor(() => {
        expect(mockHandleChange).toHaveBeenCalledWith('selectedFeatures', []);
      });
    }
  });

  test('should call onLoadingChange during form submission', async () => {
    const mockOnLoadingChange = jest.fn();
    mockGetRecommendations.mockReturnValue([{ id: 1, name: 'Product' }]);

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: jest.fn(),
    });

    render(<Form onRecommend={mockOnRecommend} onLoadingChange={mockOnLoadingChange} />);

    const form = document.querySelector('form');
    fireEvent.submit(form);

    expect(mockOnLoadingChange).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(mockOnLoadingChange).toHaveBeenCalledWith(false);
    }, { timeout: 2000 });
  });

  test('should disable submit button when no selection or no recommendation type', () => {
    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: jest.fn(),
    });

    render(<Form />);

    const submitButton = screen.getByRole('button', { name: /Obter Recomendação/i });
    expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when selection and recommendation type are provided', () => {
    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: jest.fn(),
    });

    render(<Form />);

    const submitButton = screen.getByRole('button', { name: /Obter Recomendação/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('should enable submit button when only features are selected', () => {
    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: ['Funcionalidade 1'],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: jest.fn(),
    });

    render(<Form />);

    const submitButton = screen.getByRole('button', { name: /Obter Recomendação/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('should handle multiple validation errors', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    validateFormData.mockReturnValue({
      isValid: false,
      errors: ['Erro 1', 'Erro 2'],
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

    expect(alertSpy).toHaveBeenCalledWith('Erro 1\nErro 2');
    expect(mockGetRecommendations).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});

