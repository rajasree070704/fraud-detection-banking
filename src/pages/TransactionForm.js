// src/pages/TransactionForm.js
import React, { useContext, useState } from 'react';
import { MetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TransactionForm.css'; // <-- Link to CSS

const TransactionForm = () => {
  const { account, web3, connectWallet } = useContext(MetaMaskContext);
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!web3) return setResponseMsg("⚠️ MetaMask not connected.");

    try {
      const tx = {
        from: account,
        to: to,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 21000,
        gasPrice: await web3.eth.getGasPrice(),
      };

      const txHash = await web3.eth.sendTransaction(tx);
      setResponseMsg(`✅ Transaction sent. Tx Hash: ${txHash.transactionHash}`);

      await axios.post("http://127.0.0.1:8000/api/accounts/save-metamask-transaction/", {
        sender: account,
        recipient: to,
        amount: amount,
        tx_hash: txHash.transactionHash
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`
        }
      });

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setResponseMsg(`❌ ${err.message}`);
    }
  };

  return (
    <div className="transaction-container">
      <div className="transaction-box">
        <h2 className="transaction-title">Send Transaction via MetaMask</h2>

        {!account && (
          <button
            onClick={connectWallet}
            className="connect-button"
          >
            🦊 Connect MetaMask
          </button>
        )}

        {account && (
          <form onSubmit={handleSend} className="transaction-form">
            <input
              type="text"
              placeholder="Recipient Address"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount in Ether"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Send
            </button>
          </form>
        )}

        {responseMsg && (
          <p className="transaction-message">{responseMsg}</p>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
