import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('should provide default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  test('should toggle theme from light to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should toggle theme from dark to light', () => {
    localStorage.setItem('rd-station-theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('should persist theme to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle');
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('rd-station-theme')).toBe('dark');
  });

  test('should load theme from localStorage on mount', () => {
    localStorage.setItem('rd-station-theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should throw error when useTheme is used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleError.mockRestore();
  });
});

