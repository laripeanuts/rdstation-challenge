import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { ThemeProvider } from '../../contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Layout', () => {
  test('should render Layout with Header and Footer', () => {
    renderWithTheme(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('Recomendador de Produtos')).toBeInTheDocument();
    expect(screen.getByText('Desenvolvido por')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should render children correctly', () => {
    renderWithTheme(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});

