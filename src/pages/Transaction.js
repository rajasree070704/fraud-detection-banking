// src/components/TransactionHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('User not authenticated.');
          return;
        }

        const res = await axios.get('http://127.0.0.1:8000/api/accounts/history/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        setError('Failed to load transaction history.');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-700">🔗 Transaction History</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {transactions.length === 0 && !error && (
        <p className="text-center text-gray-600">No transactions yet.</p>
      )}
      {transactions.length > 0 && (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Recipient</th>
              <th className="px-4 py-2">Amount (ETH)</th>
              <th className="px-4 py-2">Hash</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="text-sm text-center border-t">
                <td className="px-4 py-2">{tx.sender}</td>
                <td className="px-4 py-2">{tx.recipient}</td>
                <td className="px-4 py-2">{tx.amount}</td>
                <td className="px-4 py-2 truncate text-blue-600">{tx.tx_hash.slice(0, 10)}...</td>
                <td className="px-4 py-2">{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
