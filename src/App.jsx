import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];

  const handleConvert = () => {
    const conversionRate = 0.85; // Dummy conversion rate (replace with real API call)
    setConvertedAmount((amount * conversionRate).toFixed(2));
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="currency-form">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <input
            type="number"
            value={convertedAmount || ''}
            readOnly
            placeholder="Converted Amount"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleConvert}>Convert</button>
        {convertedAmount && (
          <div className="result">
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
