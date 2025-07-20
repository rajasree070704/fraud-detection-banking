// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import TransactionForm from './pages/TransactionForm';
import ViewBalance from './pages/ViewBalance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<TransactionForm />} />
        <Route path="/balance" element={<ViewBalance />} />  {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
