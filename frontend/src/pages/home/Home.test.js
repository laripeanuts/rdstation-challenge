import { fireEvent, render, screen } from '@testing-library/react';
import { HomePage } from './Home.page';

jest.mock('../../components/Form/Form', () => ({
  __esModule: true,
  default: function MockForm({ onRecommend }) {
    return (
      <div data-testid="mock-form">
        <button
          onClick={() =>
            onRecommend({
              recommendations: [
                { id: 1, name: 'Test Product', category: 'Test' },
              ],
              selectedPreferences: ['Preferência 1'],
              selectedFeatures: ['Funcionalidade 1'],
            })
          }
        >
          Get Recommendations
        </button>
      </div>
    );
  },
}));

jest.mock('../../components/RecommendationList/RecommendationList', () => ({
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

describe('HomePage', () => {
  test('should render description text', () => {
    render(<HomePage />);

    expect(screen.getByText(/De CRM a Marketing/i)).toBeInTheDocument();
  });

  test('should render form component', () => {
    render(<HomePage />);

    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  test('should render recommendation list', () => {
    render(<HomePage />);

    expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
  });

  test('should update recommendations when form submits', () => {
    render(<HomePage />);

    const button = screen.getByText('Get Recommendations');
    fireEvent.click(button);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
