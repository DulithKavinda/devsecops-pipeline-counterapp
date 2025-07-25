import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('counter increments, decrements, and resets', () => {
  render(<App />);

  const incrementBtn = screen.getByText('+');
  const decrementBtn = screen.getByText('-');
  const resetBtn = screen.getByText('Reset');

  fireEvent.click(incrementBtn);
  expect(screen.getByText('1')).toBeInTheDocument();

  fireEvent.click(decrementBtn);
  expect(screen.getByText('0')).toBeInTheDocument();

  fireEvent.click(incrementBtn);
  fireEvent.click(incrementBtn);
  fireEvent.click(resetBtn);
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(screen.getByText('No history yet.')).toBeInTheDocument();
});
