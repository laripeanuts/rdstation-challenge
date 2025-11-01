import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from './RecommendationType';

describe('RecommendationType', () => {
  const mockOnRecommendationTypeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render both radio options', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
  });

  test('should call onRecommendationTypeChange with SingleProduct when first option is clicked', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith(
      'SingleProduct'
    );
  });

  test('should call onRecommendationTypeChange with MultipleProducts when second option is clicked', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith(
      'MultipleProducts'
    );
  });
});

