import React, { useState, useEffect } from "react";
import './styles/App.css';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});

  // Fetch all currencies and rates on component mount
  useEffect(() => {
    // Example: Use your own API key here
    const apiKey = "YOUR_API_KEY";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.result === "success") {
          const currencyList = Object.keys(data.conversion_rates);
          setCurrencies(currencyList);  // Set all available currencies
          setRates(data.conversion_rates);  // Set conversion rates for all currencies
        }
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromCurrency") setFromCurrency(value);
    if (name === "toCurrency") setToCurrency(value);
  };

  const handleConvert = () => {
    // Ensure amount is a valid number
    if (amount <= 0) return;

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    // Calculate the converted amount
    if (fromRate && toRate) {
      const convertedAmount = (amount * toRate) / fromRate;
      setResult(convertedAmount.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
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
      {result && (
        <div className="result">
          {amount} {fromCurrency} = {result} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default App;
