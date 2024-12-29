import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setConversionRate(data.rates[toCurrency]);
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (conversionRate) {
      setConvertedAmount(amount * conversionRate);
    }
  }, [amount, conversionRate]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Convert Your Currency</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">From Currency</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">To Currency</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            {convertedAmount !== null && (
              <p className="text-lg font-bold">
                Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
