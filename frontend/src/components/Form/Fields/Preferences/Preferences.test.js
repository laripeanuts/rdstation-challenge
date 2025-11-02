import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from './Preferences.jsx';

describe('Preferences', () => {
  const mockPreferences = ['Preferência 1', 'Preferência 2', 'Preferência 3'];
  const mockOnTogglePreference = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render all preferences', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={[]}
        onTogglePreference={mockOnTogglePreference}
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
        selectedPreferences={[]}
        onTogglePreference={mockOnTogglePreference}
      />
    );

    const checkbox = screen.getByLabelText('Preferência 1');
    fireEvent.click(checkbox);

    expect(mockOnTogglePreference).toHaveBeenCalled();
  });

  test('should uncheck preference when clicked again', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={['Preferência 1']}
        onTogglePreference={mockOnTogglePreference}
      />
    );

    const checkbox = screen.getByLabelText('Preferência 1');
    fireEvent.click(checkbox);

    expect(mockOnTogglePreference).toHaveBeenCalled();
  });

  test('should handle multiple selections', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={[]}
        onTogglePreference={mockOnTogglePreference}
      />
    );

    fireEvent.click(screen.getByLabelText('Preferência 1'));
    fireEvent.click(screen.getByLabelText('Preferência 2'));

    expect(mockOnTogglePreference).toHaveBeenCalled();
  });

  test('should render with empty preferences array', () => {
    render(
      <Preferences
        preferences={[]}
        selectedPreferences={[]}
        onTogglePreference={mockOnTogglePreference}
      />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});

