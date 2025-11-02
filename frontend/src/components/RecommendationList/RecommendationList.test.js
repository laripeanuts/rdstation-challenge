import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  test('should render empty message when no recommendations', () => {
    render(<RecommendationList recommendations={[]} hasSearched={true} />);

    expect(
      screen.getByText('Nenhuma recomendação encontrada')
    ).toBeInTheDocument();
    expect(screen.getByText('Lista de Recomendações')).toBeInTheDocument();
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
      screen.queryByText('Nenhuma recomendação encontrada')
    ).not.toBeInTheDocument();
  });

  test('should render single recommendation', () => {
    const recommendations = [{ id: 1, name: 'Single Product' }];

    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('Single Product')).toBeInTheDocument();
  });

  test('should render loading state', () => {
    render(<RecommendationList recommendations={[]} isLoading={true} />);

    expect(screen.getByText('Analisando suas preferências...')).toBeInTheDocument();
  });

  test('should render initial state message when hasSearched is false', () => {
    render(<RecommendationList recommendations={[]} hasSearched={false} />);

    expect(screen.getByText('Pronto para começar?')).toBeInTheDocument();
    expect(screen.getByText(/Selecione suas preferências/)).toBeInTheDocument();
  });

  test('should display correct count in description', () => {
    const recommendations = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('2 produtos encontrados')).toBeInTheDocument();
  });

  test('should display singular form for single product', () => {
    const recommendations = [{ id: 1, name: 'Product 1' }];

    render(<RecommendationList recommendations={recommendations} />);

    expect(screen.getByText('1 produto encontrado')).toBeInTheDocument();
  });
});

