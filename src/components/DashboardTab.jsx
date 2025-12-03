import React from 'react';
import { Globe, DollarSign, Clock } from 'lucide-react';

export default function DashboardTab({ rates, baseCurrency, loading, lastUpdate }) {
  const currencies = Object.entries(rates);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
          <div className="flex items-center justify-between mb-4">
            <Globe className="text-blue-300" size={32} />
          </div>
          <div className="text-white text-3xl font-bold mb-1">{Object.keys(rates).length}</div>
          <div className="text-blue-200 text-sm">Currencies Available</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-purple-300" size={32} />
          </div>
          <div className="text-white text-3xl font-bold mb-1">{baseCurrency}</div>
          <div className="text-purple-200 text-sm">Base Currency</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-pink-300" size={32} />
          </div>
          <div className="text-white text-2xl font-bold mb-1">
            {lastUpdate ? lastUpdate.toLocaleTimeString() : 'N/A'}
          </div>
          <div className="text-pink-200 text-sm">Last Updated</div>
        </div>
      </div>

      {/* Exchange Rates Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">Exchange Rates</h2>
          <p className="text-purple-200 text-sm mt-1">Base: {baseCurrency}</p>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="text-center text-white py-8">Loading rates...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currencies.map(([code, rate]) => (
                <div
                  key={code}
                  className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-lg">{code}</div>
                      <div className="text-purple-200 text-sm">vs {baseCurrency}</div>
                    </div>
                    <div className="text-white font-bold text-xl">{rate.toFixed(4)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}