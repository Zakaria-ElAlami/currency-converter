import React, { useState, useEffect } from "react";
import './styles/App.css';

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  // Fetch available currencies and rates
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.exchangerate.host/latest");
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromCurrency") setFromCurrency(value);
    if (name === "toCurrency") setToCurrency(value);
  };

  const handleConvert = async () => {
    if (amount <= 0) return;
    try {
      const response = await fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await response.json();
      setResult(data.result ? data.result.toFixed(2) : "Error");
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
        />
        <select
          name="fromCurrency"
          value={fromCurrency}
          onChange={handleCurrencyChange}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          name="toCurrency"
          value={toCurrency}
          onChange={handleCurrencyChange}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {result && (
        <div className="result">
          {amount} {fromCurrency} = {result} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default App;
