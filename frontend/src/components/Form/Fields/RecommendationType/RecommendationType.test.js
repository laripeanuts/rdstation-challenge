import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from './RecommendationType.jsx';

describe('RecommendationType', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render both radio options', () => {
    render(
      <RecommendationType selectedRecommendationType="" onChange={mockOnChange} />
    );

    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
  });

  test('should call onRecommendationTypeChange with SingleProduct when first option is clicked', () => {
    render(
      <RecommendationType selectedRecommendationType="" onChange={mockOnChange} />
    );

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith('SingleProduct');
  });

  test('should call onRecommendationTypeChange with MultipleProducts when second option is clicked', () => {
    render(
      <RecommendationType selectedRecommendationType="" onChange={mockOnChange} />
    );

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);

    expect(mockOnChange).toHaveBeenCalledWith('MultipleProducts');
  });
});

