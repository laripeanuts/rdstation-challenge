import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '../../contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should render header with title and logo', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('Recomendador de Produtos')).toBeInTheDocument();
    expect(screen.getByAltText('RD Station')).toBeInTheDocument();
  });

  test('should toggle theme when button is clicked', () => {
    renderWithTheme(<Header />);

    const toggleButton = screen.getByLabelText(/Alternar para tema/i);
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(
      screen.getByLabelText(/Alternar para tema claro/i)
    ).toBeInTheDocument();
  });

  test('should have correct aria-label for theme toggle', () => {
    renderWithTheme(<Header />);

    expect(
      screen.getByLabelText('Alternar para tema escuro')
    ).toBeInTheDocument();
  });
});

