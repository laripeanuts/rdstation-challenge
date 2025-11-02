import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Features from './Features.jsx';

describe('Features', () => {
  const mockFeatures = ['Funcionalidade 1', 'Funcionalidade 2'];
  const mockOnToggleFeature = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render all features', () => {
    render(
      <Features features={mockFeatures} selectedFeatures={[]} onToggleFeature={mockOnToggleFeature} />
    );

    expect(screen.getByText('Funcionalidade 1')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidade 2')).toBeInTheDocument();
  });

  test('should check feature when clicked', () => {
    render(
      <Features features={mockFeatures} selectedFeatures={[]} onToggleFeature={mockOnToggleFeature} />
    );

    const checkbox = screen.getByLabelText('Funcionalidade 1');
    fireEvent.click(checkbox);

    expect(mockOnToggleFeature).toHaveBeenCalled();
  });

  test('should uncheck feature when clicked again', () => {
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={['Funcionalidade 1']}
        onToggleFeature={mockOnToggleFeature}
      />
    );

    const checkbox = screen.getByLabelText('Funcionalidade 1');
    fireEvent.click(checkbox);

    expect(mockOnToggleFeature).toHaveBeenCalled();
  });

  test('should render with empty features array', () => {
    render(
      <Features features={[]} selectedFeatures={[]} onToggleFeature={mockOnToggleFeature} />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});

