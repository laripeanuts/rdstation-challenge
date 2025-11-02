import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  test('should render submit button with default text', () => {
    render(<SubmitButton />);

    expect(screen.getByText('Obter Recomendação')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('should render loading state', () => {
    render(<SubmitButton isLoading={true} disabled={true} />);

    expect(screen.getByText('Processando...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('should be disabled when disabled prop is true', () => {
    render(<SubmitButton disabled={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('should be disabled when both isLoading and disabled are true', () => {
    render(<SubmitButton isLoading={true} disabled={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});

