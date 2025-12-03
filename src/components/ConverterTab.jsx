import React, { useState } from 'react';
import { ArrowDownUp, TrendingUp } from 'lucide-react';

export default function ConverterTab({ rates, baseCurrency, loading }) {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const allCurrencies = Object.keys(rates);
  
  const filteredFromCurrencies = allCurrencies.filter(curr => 
    curr.toLowerCase().startsWith(fromSearch.toLowerCase())
  );
  
  const filteredToCurrencies = allCurrencies.filter(curr => 
    curr.toLowerCase().startsWith(toSearch.toLowerCase())
  );

  const rate = rates[toCurrency] || 0;
  const convertedAmount = (parseFloat(amount) || 0) * rate;

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const selectFromCurrency = (curr) => {
    setFromCurrency(curr);
    setFromSearch('');
    setFromDropdownOpen(false);
  };

  const selectToCurrency = (curr) => {
    setToCurrency(curr);
    setToSearch('');
    setToDropdownOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Currency Converter</h2>
        <p className="text-purple-200">Convert between 160+ currencies instantly</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* From Currency */}
        <div className="mb-6">
          <label className="text-purple-200 text-sm font-medium mb-2 block">You Send</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-4 text-white text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"
              placeholder="0.00"
            />
            <div className="relative">
              <input
                type="text"
                value={fromDropdownOpen ? fromSearch : fromCurrency}
                onChange={(e) => setFromSearch(e.target.value)}
                onFocus={() => setFromDropdownOpen(true)}
                onBlur={() => setTimeout(() => setFromDropdownOpen(false), 200)}
                className="w-32 bg-white/20 border border-white/30 rounded-xl px-4 py-4 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                placeholder="Search..."
              />
              {fromDropdownOpen && (
                <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-purple-900 rounded-xl shadow-2xl border border-white/20 z-20">
                  {filteredFromCurrencies.map(curr => (
                    <div
                      key={curr}
                      onClick={() => selectFromCurrency(curr)}
                      className="px-4 py-3 text-white hover:bg-purple-700 cursor-pointer transition-colors"
                    >
                      {curr}
                    </div>
                  ))}
                  {filteredFromCurrencies.length === 0 && (
                    <div className="px-4 py-3 text-purple-300 text-sm">No currencies found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button
            onClick={swapCurrencies}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
          >
            <ArrowDownUp className="text-white" size={24} />
          </button>
        </div>

        {/* To Currency */}
        <div className="mt-6">
          <label className="text-purple-200 text-sm font-medium mb-2 block">You Receive</label>
          <div className="flex gap-4">
            <input
              type="text"
              value={loading ? 'Loading...' : convertedAmount.toFixed(2)}
              readOnly
              className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-4 text-white text-2xl font-semibold focus:outline-none"
            />
            <div className="relative">
              <input
                type="text"
                value={toDropdownOpen ? toSearch : toCurrency}
                onChange={(e) => setToSearch(e.target.value)}
                onFocus={() => setToDropdownOpen(true)}
                onBlur={() => setTimeout(() => setToDropdownOpen(false), 200)}
                className="w-32 bg-white/20 border border-white/30 rounded-xl px-4 py-4 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                placeholder="Search..."
              />
              {toDropdownOpen && (
                <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-purple-900 rounded-xl shadow-2xl border border-white/20 z-20">
                  {filteredToCurrencies.map(curr => (
                    <div
                      key={curr}
                      onClick={() => selectToCurrency(curr)}
                      className="px-4 py-3 text-white hover:bg-purple-700 cursor-pointer transition-colors"
                    >
                      {curr}
                    </div>
                  ))}
                  {filteredToCurrencies.length === 0 && (
                    <div className="px-4 py-3 text-purple-300 text-sm">No currencies found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between text-purple-200">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} />
              <span className="text-sm">Exchange Rate:</span>
            </div>
            <span className="font-semibold text-white">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}