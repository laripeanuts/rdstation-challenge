import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
  test('should initialize with initial state', () => {
    const initialState = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
  });

  test('should update form data when handleChange is called', () => {
    const initialState = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('selectedPreferences', ['pref1', 'pref2']);
    });

    expect(result.current.formData.selectedPreferences).toEqual([
      'pref1',
      'pref2',
    ]);
    expect(result.current.formData.selectedFeatures).toEqual([]);
    expect(result.current.formData.selectedRecommendationType).toBe('');
  });

  test('should update multiple fields independently', () => {
    const initialState = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('selectedPreferences', ['pref1']);
    });

    act(() => {
      result.current.handleChange('selectedRecommendationType', 'SingleProduct');
    });

    expect(result.current.formData.selectedPreferences).toEqual(['pref1']);
    expect(result.current.formData.selectedRecommendationType).toBe(
      'SingleProduct'
    );
    expect(result.current.formData.selectedFeatures).toEqual([]);
  });

  test('should preserve other fields when updating one field', () => {
    const initialState = {
      selectedPreferences: ['pref1'],
      selectedFeatures: ['feat1'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('selectedPreferences', ['pref2']);
    });

    expect(result.current.formData.selectedPreferences).toEqual(['pref2']);
    expect(result.current.formData.selectedFeatures).toEqual(['feat1']);
    expect(result.current.formData.selectedRecommendationType).toBe(
      'MultipleProducts'
    );
  });

  test('should handle empty initial state', () => {
    const { result } = renderHook(() => useForm({}));

    expect(result.current.formData).toEqual({});

    act(() => {
      result.current.handleChange('newField', 'value');
    });

    expect(result.current.formData.newField).toBe('value');
  });
});

