// src/pages/ViewBalance.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ViewBalance.css'; // ✅ Import the CSS file

const ViewBalance = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        'http://127.0.0.1:8000/api/accounts/balance/',
        { address },
        { headers: { Authorization: `Token ${token}` } }
      );
      setBalance(res.data.balance);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || '⚠️ Failed to fetch balance');
      setBalance('');
    }
  };

  return (
    <div className="balance-container">
      <div className="balance-box">
        <h2 className="balance-title">💰 Check Wallet Balance</h2>
        <form onSubmit={handleCheckBalance} className="balance-form">
          <input
            type="text"
            placeholder="Enter Ethereum address"
            className="balance-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" className="balance-button">
            View Balance
          </button>
        </form>

        {balance && (
          <div className="balance-success">
            ✅ Balance: {balance} ETH
          </div>
        )}

        {error && (
          <div className="balance-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBalance;

