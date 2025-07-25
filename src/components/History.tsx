import React from 'react';

interface HistoryProps {
  history: number[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">History</h2>
      <ul className="list-disc list-inside bg-white p-4 rounded shadow">
        {history.length === 0 ? (
          <li className="text-gray-500">No history yet.</li>
        ) : (
          history.map((value, index) => <li key={index}>Count: {value}</li>)
        )}
      </ul>
    </div>
  );
};

export default History;
