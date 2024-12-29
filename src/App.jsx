import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [currencies, setCurrencies] = useState([]);

  // Fetch available currencies and conversion rates
  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/USD") // Replace with a working API if needed
      .then((response) => {
        const currencyList = Object.keys(response.data.rates);
        setCurrencies(currencyList);
        setFromCurrency("USD");
        setToCurrency("EUR");
      })
      .catch((error) => {
        console.error("Error fetching currencies:", error);
      });
  }, []);

  // Convert currency
  const convertCurrency = () => {
    if (fromCurrency === toCurrency) {
      setResult(`${amount} ${fromCurrency} = ${amount} ${toCurrency}`);
      return;
    }

    axios
      .get(`https://open.er-api.com/v6/latest/${fromCurrency}`) // Replace with a working API if needed
      .then((response) => {
        const rate = response.data.rates[toCurrency];
        const conversion = (amount * rate).toFixed(2);
        setResult(
          `${amount} ${fromCurrency} = ${conversion} ${toCurrency} \n1 ${fromCurrency} = ${rate} ${toCurrency}`
        );
      })
      .catch((error) => {
        console.error("Error converting currency:", error);
      });
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
        <button onClick={convertCurrency}>Convert</button>
      </div>
      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;
