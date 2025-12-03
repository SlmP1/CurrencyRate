import React, { useState } from 'react';
import { Star, Plus, X } from 'lucide-react';

export default function TrackerTab({ rates, baseCurrency, loading }) {
  const [favorites, setFavorites] = useState(['EUR', 'GBP', 'JPY']);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleFavorite = (code) => {
    if (favorites.includes(code)) {
      setFavorites(favorites.filter(f => f !== code));
    } else {
      setFavorites([...favorites, code]);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Currency Tracker</h2>
        <p className="text-purple-200">Track your favorite currencies</p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={24} />
          Add Currency
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(code => {
          const rate = rates[code] || 0;
          return (
            <div
              key={code}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400 transition-all relative group"
            >
              <button
                onClick={() => toggleFavorite(code)}
                className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={16} className="text-white" />
              </button>

              <div className="flex items-center justify-between mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
              </div>

              <div className="mb-4">
                <h3 className="text-white text-3xl font-bold mb-1">{code}</h3>
                <p className="text-purple-200 text-sm">vs {baseCurrency}</p>
              </div>

              <div className="text-white text-3xl font-bold">
                {loading ? '...' : rate.toFixed(4)}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 max-w-md w-full border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add Currency</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="text-white" size={24} />
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.keys(rates).filter(c => !favorites.includes(c)).map(code => (
                <button
                  key={code}
                  onClick={() => {
                    toggleFavorite(code);
                    setShowAddModal(false);
                  }}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  <span className="text-white font-bold">{code}</span>
                  <span className="text-white">{rates[code].toFixed(4)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}