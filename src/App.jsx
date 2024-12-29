import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
        setExchangeRate(response.data.rates[toCurrency]);
      })
      .catch(error => console.error(error));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="currency-converter">
        <h1>Currency Converter</h1>
        <div className="input-group">
          <input 
            type="number" 
            value={amount} 
            onChange={handleAmountChange} 
            className="amount-input" 
            min="0"
          />
          <select 
            value={fromCurrency} 
            onChange={handleFromCurrencyChange} 
            className="currency-select"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span>to</span>
          <select 
            value={toCurrency} 
            onChange={handleToCurrencyChange} 
            className="currency-select"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        {convertedAmount !== null && (
          <div className="result">
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
