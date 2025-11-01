import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/Form/Form', () => ({
  __esModule: true,
  default: function MockForm({ onRecommend }) {
    return (
      <div data-testid="mock-form">
        <button
          onClick={() =>
            onRecommend([
              { id: 1, name: 'Test Product', category: 'Test' },
            ])
          }
        >
          Get Recommendations
        </button>
      </div>
    );
  },
}));

jest.mock('./components/RecommendationList/RecommendationList', () => ({
  __esModule: true,
  default: function MockRecommendationList({ recommendations }) {
    return (
      <div data-testid="mock-recommendation-list">
        <h2>Lista de Recomendações:</h2>
        {recommendations.map((r) => (
          <div key={r.id}>{r.name}</div>
        ))}
      </div>
    );
  },
}));

describe('App', () => {
  test('should render title', () => {
    render(<App />);

    expect(
      screen.getByText('Recomendador de Produtos RD Station')
    ).toBeInTheDocument();
  });

  test('should render form component', () => {
    render(<App />);

    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  test('should render recommendation list', () => {
    render(<App />);

    expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
  });

  test('should update recommendations when form submits', () => {
    render(<App />);

    const button = screen.getByText('Get Recommendations');
    fireEvent.click(button);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});

