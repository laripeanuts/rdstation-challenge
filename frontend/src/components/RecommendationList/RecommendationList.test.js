import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  test('should render empty message when no recommendations', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(
      screen.getByText('Nenhuma recomendação encontrada.')
    ).toBeInTheDocument();
    expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
  });

  test('should render list of recommendations', () => {
    const recommendations = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ];

    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(
      screen.queryByText('Nenhuma recomendação encontrada.')
    ).not.toBeInTheDocument();
  });

  test('should render single recommendation', () => {
    const recommendations = [{ id: 1, name: 'Single Product' }];

    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('Single Product')).toBeInTheDocument();
  });
});

