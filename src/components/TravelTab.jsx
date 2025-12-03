import React, { useState } from 'react';
import { MapPin, Calculator, Plus, Trash2 } from 'lucide-react';

export default function TravelTab({ rates, baseCurrency, loading }) {
  const [destination, setDestination] = useState('EUR');
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Hotel - 5 nights', amount: 500 },
    { id: 2, name: 'Meals & Dining', amount: 300 },
    { id: 3, name: 'Round-trip Flight', amount: 800 },
  ]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });

  const exchangeRate = rates[destination] || 1;
  const totalHome = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const totalDestination = totalHome * exchangeRate;

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      setExpenses([...expenses, {
        id: Date.now(),
        name: newExpense.name,
        amount: parseFloat(newExpense.amount)
      }]);
      setNewExpense({ name: '', amount: '' });
    }
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Trip Details & Budget */}
      <div className="space-y-6">
        {/* Trip Details Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Trip Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-purple-200 text-sm mb-2 block">Destination Currency</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              >
                {Object.keys(rates).map(curr => (
                  <option key={curr} value={curr} className="bg-purple-900">{curr}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-purple-200 text-sm mb-1">Exchange Rate</div>
            <div className="text-white text-xl font-bold">
              1 {baseCurrency} = {exchangeRate.toFixed(4)} {destination}
            </div>
          </div>
        </div>

        {/* Total Budget Card */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-emerald-400/30">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="text-emerald-300" size={24} />
            <h2 className="text-white text-lg font-bold">Total Budget</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-emerald-200 text-sm mb-1">In {baseCurrency}</div>
              <div className="text-white text-4xl font-bold">
                ${totalHome.toFixed(2)}
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <div className="text-emerald-200 text-sm mb-1">In {destination}</div>
              <div className="text-white text-4xl font-bold">
                {totalDestination.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Expenses List */}
      <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">Trip Expenses</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Add New Expense Form */}
          <div className="bg-white/5 rounded-xl p-4 border-2 border-dashed border-white/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={newExpense.name}
                onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
                placeholder="Expense name..."
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                placeholder="Amount"
                className="w-32 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={addExpense}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 rounded-lg flex items-center gap-2 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Expense Items List */}
          {expenses.map((expense) => {
            const converted = expense.amount * exchangeRate;
            
            return (
              <div
                key={expense.id}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-white font-semibold text-lg">{expense.name}</div>
                    <div className="text-purple-200 text-sm">
                      {converted.toFixed(2)} {destination}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-white font-bold text-xl">
                      ${expense.amount.toFixed(2)}
                    </div>
                    <div className="text-purple-300 text-xs">{baseCurrency}</div>
                  </div>

                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}