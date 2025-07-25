import React, { useState } from 'react';
import Counter from './components/Counter';
import History from './components/History';
import './index.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  const updateCount = (value: number) => {
    const newCount = count + value;
    setCount(newCount);
    setHistory([newCount, ...history]);
  };

  const resetCount = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Counter App with History</h1>
      <Counter count={count} onIncrement={() => updateCount(1)} onDecrement={() => updateCount(-1)} onReset={resetCount} />
      <History history={history} />
    </div>
  );
};

export default App;