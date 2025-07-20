import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅️ Import useNavigate
import './Dashboard.css';
import TransactionHistory from './TransactionHistory';

const Dashboard = () => {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate(); // ⬅️ Init navigator

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    navigate('/'); // Redirect to Home.js
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Secure Blockchain Banking Dashboard</h1>

        <div className="dashboard-buttons">
          <Link to="/transaction">
            <button className="dashboard-btn make-transaction">📝 Make a Transaction</button>
          </Link>

          <Link to="/balance">
            <button className="dashboard-btn view-balance">💰 View Balance</button>
          </Link>

          <button onClick={handleLogout} className="dashboard-btn logout">🚪 Logout</button>

          <button
            className="dashboard-btn show-history"
            onClick={() => setShowHistory(!showHistory)}
          >
            📜 {showHistory ? 'Hide' : 'Show'} Transaction History
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="dashboard-history-table">
          <TransactionHistory />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
