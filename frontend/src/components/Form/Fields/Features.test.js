import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Features from './Features';

describe('Features', () => {
  const mockFeatures = ['Funcionalidade 1', 'Funcionalidade 2'];
  const mockOnFeatureChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render all features', () => {
    render(
      <Features features={mockFeatures} onFeatureChange={mockOnFeatureChange} />
    );

    expect(screen.getByText('Funcionalidade 1')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidade 2')).toBeInTheDocument();
  });

  test('should check feature when clicked', () => {
    render(
      <Features features={mockFeatures} onFeatureChange={mockOnFeatureChange} />
    );

    const checkbox = screen.getByLabelText('Funcionalidade 1');
    fireEvent.click(checkbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith(['Funcionalidade 1']);
  });

  test('should uncheck feature when clicked again', () => {
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={['Funcionalidade 1']}
        onFeatureChange={mockOnFeatureChange}
      />
    );

    const checkbox = screen.getByLabelText('Funcionalidade 1');
    fireEvent.click(checkbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith([]);
  });

  test('should render with empty features array', () => {
    render(
      <Features features={[]} onFeatureChange={mockOnFeatureChange} />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});

