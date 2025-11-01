import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from './Preferences';

describe('Preferences', () => {
  const mockPreferences = ['Preferência 1', 'Preferência 2', 'Preferência 3'];
  const mockOnPreferenceChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render all preferences', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    expect(screen.getByText('Preferência 1')).toBeInTheDocument();
    expect(screen.getByText('Preferência 2')).toBeInTheDocument();
    expect(screen.getByText('Preferência 3')).toBeInTheDocument();
  });

  test('should check preference when clicked', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const checkbox = screen.getByLabelText('Preferência 1');
    fireEvent.click(checkbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith(['Preferência 1']);
  });

  test('should uncheck preference when clicked again', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={['Preferência 1']}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const checkbox = screen.getByLabelText('Preferência 1');
    fireEvent.click(checkbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith([]);
  });

  test('should handle multiple selections', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Preferência 1'));
    fireEvent.click(screen.getByLabelText('Preferência 2'));

    expect(mockOnPreferenceChange).toHaveBeenLastCalledWith([
      'Preferência 1',
      'Preferência 2',
    ]);
  });

  test('should render with empty preferences array', () => {
    render(
      <Preferences
        preferences={[]}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});

