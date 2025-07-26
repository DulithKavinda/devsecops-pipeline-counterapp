import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Counter App', () => {
  it('should start at 0 and increment', () => {
    render(<App />);
    expect(screen.getByText('0')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should decrement the counter', () => {
    render(<App />);
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should reset the counter and clear history', () => {
    render(<App />);
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('No history yet.')).toBeInTheDocument();
  });

  it('should track count history correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByText('+'));  // 1
    fireEvent.click(screen.getByText('+'));  // 2
    fireEvent.click(screen.getByText('-'));  // 1

    const historyItems = screen.getAllByText(/Count:/);
    expect(historyItems.length).toBe(3);
    expect(historyItems[0]).toHaveTextContent('Count: 1');
    expect(historyItems[1]).toHaveTextContent('Count: 2');
    expect(historyItems[2]).toHaveTextContent('Count: 1');
  });
});
