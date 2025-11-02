import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/home/Home.page', () => ({
  HomePage: () => <div>HomePage</div>,
}));

describe('App', () => {
  test('should render App component', () => {
    render(<App />);
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });
});

