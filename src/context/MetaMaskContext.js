// src/context/MetaMaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

export const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const provider = window.ethereum;
        const web3Instance = new Web3('http://127.0.0.1:8545');

        await provider.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setWeb3(web3Instance);
          setError('');
        } else {
          setError('No accounts found in MetaMask');
        }
      } catch (err) {
        console.error('❌ MetaMask connection error:', err);
        setError('Failed to connect to MetaMask');
      }
    } else {
      setError('🦊 MetaMask not detected. Please install the extension.');
      alert('🦊 MetaMask extension not found. Please install MetaMask.');
    }
  };

  // Optional: Auto-connect if already authorized
  useEffect(() => {
    const checkIfConnected = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setWeb3(web3Instance);
        }
      }
    };

    checkIfConnected();
  }, []);

  return (
    <MetaMaskContext.Provider value={{ account, web3, connectWallet, error }}>
      {children}
    </MetaMaskContext.Provider>
  );
};
