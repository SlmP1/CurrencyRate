import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Globe, Star, Plane, RefreshCw, Search } from 'lucide-react';
import ConverterTab from './components/ConverterTab';
import DashboardTab from './components/DashboardTab';
import TrackerTab from './components/TrackerTab';
import TravelTab from './components/TravelTab';

const API_KEY = '2e452a9ce5-255b6e972b-t6pefj';
const API_BASE = 'https://api.fastforex.io';

export default function App() {
  const [activeTab, setActiveTab] = useState('converter');
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/fetch-all?from=${baseCurrency}`,
        {
          headers: { 'X-API-Key': API_KEY },
        }
      );
      const data = await response.json();
      if (data.results) {
        setRates(data.results);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  const allCurrencies = Object.keys(rates).length > 0 ? Object.keys(rates) : ['USD'];

  const handleSearch = () => {
    const upperQuery = searchQuery.toUpperCase().trim();
    if (upperQuery && allCurrencies.includes(upperQuery)) {
      setBaseCurrency(upperQuery);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const tabs = [
    { id: 'converter', label: 'Converter', icon: ArrowDownUp },
    { id: 'dashboard', label: 'Dashboard', icon: Globe },
    { id: 'tracker', label: 'Tracker', icon: Star },
    { id: 'travel', label: 'Travel Budget', icon: Plane },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="text-white" size={32} />
              <h1 className="text-2xl font-bold text-white">
                Currency Exchange Pro
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Search currency (${baseCurrency})`}
                    className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-300 w-64"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                  <Search size={18} />
                </button>
              </div>
              
              <button
                onClick={fetchRates}
                disabled={loading}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCw
                  size={18}
                  className={loading ? 'animate-spin' : ''}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'text-white border-purple-400 bg-white/5'
                      : 'text-purple-200 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'converter' && (
          <ConverterTab
            rates={rates}
            baseCurrency={baseCurrency}
            loading={loading}
          />
        )}
        {activeTab === 'dashboard' && (
          <DashboardTab
            rates={rates}
            baseCurrency={baseCurrency}
            loading={loading}
            lastUpdate={lastUpdate}
          />
        )}
        {activeTab === 'tracker' && (
          <TrackerTab
            rates={rates}
            baseCurrency={baseCurrency}
            loading={loading}
          />
        )}
        {activeTab === 'travel' && (
          <TravelTab
            rates={rates}
            baseCurrency={baseCurrency}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}