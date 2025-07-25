import React from 'react';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, onIncrement, onDecrement, onReset }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-4xl mb-4">{count}</div>
      <div className="flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onIncrement}>+</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onDecrement}>-</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;