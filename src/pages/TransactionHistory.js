// src/pages/TransactionHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/accounts/history/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        setError('⚠️ Failed to load transaction history.');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="mt-10 w-full max-w-4xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🔗 Transaction History</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!error && transactions.length === 0 && <p>No transactions yet.</p>}
      {transactions.length > 0 && (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Sender</th>
              <th className="border px-4 py-2">Recipient</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Tx Hash</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{tx.sender}</td>
                <td className="border px-2 py-1">{tx.recipient}</td>
                <td className="border px-2 py-1">{tx.amount}</td>
                <td className="border px-2 py-1 break-all">{tx.tx_hash}</td>
                <td className="border px-2 py-1">{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;

