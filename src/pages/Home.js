// src/pages/Home.js
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="top-nav animate-slide-down">
        <div className="left-title animate-fade-in-left">Secure Banking</div>
        <div className="right-buttons">
          <Link to="/login" className="nav-btn animate-fade-in-right delay-1">Login</Link>
          <Link to="/register" className="nav-btn animate-fade-in-right delay-2">Register</Link>
        </div>
      </header>

      <main className="home-main">
        <h1 className="animate-zoom-in">Welcome to Secure Blockchain Banking 💳</h1>
        <p className="animate-fade-in delay-3">
          A decentralized platform ensuring transparency and security in every transaction.
          Manage your funds, send transactions, and track history seamlessly using blockchain.
        </p>
      </main>
    </div>
  );
};

export default Home;
