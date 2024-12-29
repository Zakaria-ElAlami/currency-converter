import React, { useState } from "react";
import './styles/App.css';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);

  const currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "MXN", name: "Mexican Peso" }
  ];

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromCurrency") setFromCurrency(value);
    if (name === "toCurrency") setToCurrency(value);
  };

  const handleConvert = () => {
    const apiKey = 'YOUR_API_KEY';  // Use your API key here
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        setResult(convertedAmount);
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
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
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
      <select
        name="toCurrency"
        value={toCurrency}
        onChange={handleCurrencyChange}
      >
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
      <button onClick={handleConvert}>Convert</button>
      {result && <div className="result">Converted Amount: {result} {toCurrency}</div>}
    </div>
  );
};

export default App;
