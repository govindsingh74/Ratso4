import React, { useState, useEffect } from 'react';
import { Terminal, Plus, Coins, TrendingUp, Newspaper, BarChart2, AlertCircle } from 'lucide-react';
import { PolarityClock, TimeInfo } from '../utils/polarityClock';

const Polarity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [timeInfo, setTimeInfo] = useState<TimeInfo | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Welcome to Polarity Terminal',
    'Initializing Polarity Clock...',
  ]);

  useEffect(() => {
    const clock = new PolarityClock();
    const updateTerminal = () => {
      const info = clock.getTimeInfo();
      setTimeInfo(info);
      setTerminalLines(prev => {
        const newLines = [
          ...prev,
          `\n[${new Date().toLocaleTimeString()}] Block #${info.blockHeight}`,
          `├─ Time Hash: ${info.timeHash}`,
          `├─ Accuracy: ${info.accuracy.toFixed(2)}%`,
          `└─ UTC: ${info.humanTime}`,
        ].slice(-100); // Keep last 100 lines
        return newLines;
      });
    };

    // Initial update
    updateTerminal();

    // Update every second
    const interval = setInterval(updateTerminal, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (file) {
      if (file.size > 200 * 1024) {
        setFileError('File size must be less than 200KB');
        setSelectedFile(null);
        e.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        setFileError('File must be an image');
        setSelectedFile(null);
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'terminal':
        return (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-[600px] font-mono overflow-auto">
            <div className="space-y-1">
              {terminalLines.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-400 mr-2">$</span>
              <input
                type="text"
                className="bg-transparent border-none outline-none text-green-400 w-full"
                placeholder="Enter command..."
              />
            </div>
          </div>
        );
        case 'listing':
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Create New Listing</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Token Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (SOL)</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Create Listing
                </button>
              </form>
            </div>
          );
        case 'token':
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Create New Token</h3>
              <form className="space-y-6">
                {/* Basic Token Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Basic Information</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Token Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Symbol</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Supply</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
  
                {/* Token Image Upload */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Token Image</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Token Image (Max 200KB)</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-50 file:text-indigo-700
                          hover:file:bg-indigo-100"
                      />
                      {selectedFile && (
                        <div className="flex items-center text-sm text-green-600">
                          <span>✓ File selected</span>
                        </div>
                      )}
                    </div>
                    {fileError && (
                      <div className="mt-2 flex items-center text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{fileError}</span>
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Social Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Social Media & Website</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Website</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="www.example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="twitter_handle"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telegram</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        t.me/
                      </span>
                      <input
                        type="text"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="telegram_group"
                      />
                    </div>
                  </div>
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Token
                </button>
              </form>
            </div>
          );
        case 'updates':
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Market Updates</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold">Latest Transactions</h4>
                  <div className="mt-2 space-y-2">
                    {/* Add real-time market updates here */}
                    <div className="text-sm text-gray-600">No recent transactions</div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'media':
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">CMC Media</h3>
              <div className="space-y-4">
                {/* Add CMC news feed here */}
                <div className="text-sm text-gray-600">No media content available</div>
              </div>
            </div>
          );
        case 'analysis':
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Market Analysis</h3>
              <div className="space-y-4">
                {/* Add market analysis charts and data here */}
                <div className="text-sm text-gray-600">No analysis data available</div>
              </div>
            </div>
          );
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'terminal' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Terminal className="w-5 h-5" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => setActiveTab('listing')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'listing' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Create Listing</span>
            </button>
            <button
              onClick={() => setActiveTab('token')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'token' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Coins className="w-5 h-5" />
              <span>New Token</span>
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'updates' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Market Updates</span>
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'media' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Newspaper className="w-5 h-5" />
              <span>CMC Media</span>
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'analysis' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Analysis</span>
            </button>
            {/* ... rest of the buttons remain unchanged ... */}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Polarity;