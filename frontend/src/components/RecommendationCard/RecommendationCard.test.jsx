import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecommendationCard } from './RecommendationCard';
import { TooltipProvider } from '../shared/Tooltip';

describe('RecommendationCard', () => {
  const mockProduct = {
    id: 1,
    name: 'RD Station CRM',
    category: 'Vendas',
    description: 'Descrição do produto',
    preferences: ['Preferência 1'],
    features: ['Feature 1'],
  };

  test('should render product card with basic information', () => {
    render(
      <RecommendationCard
        product={mockProduct}
        rank={1}
        matchedPreferences={['Preferência 1']}
        matchedFeatures={['Feature 1']}
      />
    );

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('Vendas')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto')).toBeInTheDocument();
  });

  test('should show trophy icon for top ranked product', () => {
    const { container } = render(
      <RecommendationCard
        product={mockProduct}
        rank={1}
        matchedPreferences={[]}
        matchedFeatures={[]}
      />
    );

    const trophyIcon = container.querySelector('svg');
    expect(trophyIcon).toBeInTheDocument();
  });

  test('should not show trophy icon for non-top ranked product', () => {
    render(
      <RecommendationCard
        product={mockProduct}
        rank={2}
        matchedPreferences={[]}
        matchedFeatures={[]}
      />
    );

    const card = screen.getByText('RD Station CRM').closest('.border-2');
    expect(card).not.toBeInTheDocument();
  });

  test('should render matched preferences', () => {
    render(
      <RecommendationCard
        product={mockProduct}
        rank={1}
        matchedPreferences={['Preferência 1', 'Preferência 2']}
        matchedFeatures={[]}
      />
    );

    expect(screen.getByText('Preferências correspondentes:')).toBeInTheDocument();
    expect(screen.getByText('Preferência 1')).toBeInTheDocument();
    expect(screen.getByText('Preferência 2')).toBeInTheDocument();
  });

  test('should render matched features', () => {
    render(
      <RecommendationCard
        product={mockProduct}
        rank={1}
        matchedPreferences={[]}
        matchedFeatures={['Feature 1', 'Feature 2']}
      />
    );

    expect(screen.getByText('Funcionalidades correspondentes:')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  test('should render score when provided', () => {
    const productWithScore = { ...mockProduct, score: 5 };
    render(
      <TooltipProvider>
        <RecommendationCard
          product={productWithScore}
          rank={1}
          matchedPreferences={[]}
          matchedFeatures={[]}
        />
      </TooltipProvider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('pontos')).toBeInTheDocument();
  });

  test('should not render empty sections', () => {
    render(
      <RecommendationCard
        product={mockProduct}
        rank={1}
        matchedPreferences={[]}
        matchedFeatures={[]}
      />
    );

    expect(
      screen.queryByText('Preferências correspondentes:')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Funcionalidades correspondentes:')
    ).not.toBeInTheDocument();
  });
});

