import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('should render checkbox with children', () => {
    render(<Checkbox>Test Label</Checkbox>);

    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('checkbox');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('should render radio button when type is radio', () => {
    render(<Checkbox type="radio">Radio Option</Checkbox>);

    const input = screen.getByRole('radio');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('radio');
  });

  test('should pass through props to input', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        checked={true}
        value="test-value"
        onChange={handleChange}
        data-testid="custom-checkbox"
      >
        Test
      </Checkbox>
    );

    const input = screen.getByTestId('custom-checkbox');
    expect(input).toBeChecked();
    expect(input.value).toBe('test-value');
  });

  test('should render without children', () => {
    render(<Checkbox />);

    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
  });
});

