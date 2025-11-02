import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('should render footer with developer name', () => {
    render(<Footer />);

    expect(screen.getByText(/Desenvolvido por/)).toBeInTheDocument();
    expect(screen.getByText('Larissa Rabelo')).toBeInTheDocument();
  });

  test('should render GitHub link', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('Abrir GitHub de Larissa Rabelo');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/laripeanuts');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should render LinkedIn link', () => {
    render(<Footer />);

    const linkedinLink = screen.getByLabelText('Abrir LinkedIn de Larissa Rabelo');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/larissarabelolf');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });
});

