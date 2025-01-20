import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Terminal, Plus, Coins, TrendingUp, Newspaper, BarChart2, AlertCircle } from 'lucide-react';
import { PolarityClock } from '../utils/polarityClock';
const Polarity = () => {
    const [activeTab, setActiveTab] = useState('terminal');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [timeInfo, setTimeInfo] = useState(null);
    const [terminalLines, setTerminalLines] = useState([
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
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
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
                return (_jsxs("div", { className: "bg-gray-900 text-green-400 p-4 rounded-lg h-[600px] font-mono overflow-auto", children: [_jsx("div", { className: "space-y-1", children: terminalLines.map((line, index) => (_jsx("div", { className: "whitespace-pre-wrap", children: line }, index))) }), _jsxs("div", { className: "flex items-center mt-4", children: [_jsx("span", { className: "text-green-400 mr-2", children: "$" }), _jsx("input", { type: "text", className: "bg-transparent border-none outline-none text-green-400 w-full", placeholder: "Enter command..." })] })] }));
            case 'listing':
                return (_jsxs("div", { className: "bg-white p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Create New Listing" }), _jsxs("form", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Token Name" }), _jsx("input", { type: "text", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Price (SOL)" }), _jsx("input", { type: "number", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" })] }), _jsx("button", { type: "submit", className: "bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700", children: "Create Listing" })] })] }));
            case 'token':
                return (_jsxs("div", { className: "bg-white p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Create New Token" }), _jsxs("form", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800", children: "Basic Information" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Token Name" }), _jsx("input", { type: "text", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Symbol" }), _jsx("input", { type: "text", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Total Supply" }), _jsx("input", { type: "number", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", required: true })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800", children: "Token Image" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Upload Token Image (Max 200KB)" }), _jsxs("div", { className: "mt-1 flex items-center space-x-4", children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "block w-full text-sm text-gray-500\n                          file:mr-4 file:py-2 file:px-4\n                          file:rounded-md file:border-0\n                          file:text-sm file:font-semibold\n                          file:bg-indigo-50 file:text-indigo-700\n                          hover:file:bg-indigo-100" }), selectedFile && (_jsx("div", { className: "flex items-center text-sm text-green-600", children: _jsx("span", { children: "\u2713 File selected" }) }))] }), fileError && (_jsxs("div", { className: "mt-2 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: fileError })] }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800", children: "Social Media & Website" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Project Website" }), _jsxs("div", { className: "mt-1 flex rounded-md shadow-sm", children: [_jsx("span", { className: "inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm", children: "https://" }), _jsx("input", { type: "text", className: "flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500", placeholder: "www.example.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Twitter" }), _jsxs("div", { className: "mt-1 flex rounded-md shadow-sm", children: [_jsx("span", { className: "inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm", children: "@" }), _jsx("input", { type: "text", className: "flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500", placeholder: "twitter_handle" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Telegram" }), _jsxs("div", { className: "mt-1 flex rounded-md shadow-sm", children: [_jsx("span", { className: "inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm", children: "t.me/" }), _jsx("input", { type: "text", className: "flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500", placeholder: "telegram_group" })] })] })] }), _jsx("button", { type: "submit", className: "w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Create Token" })] })] }));
            case 'updates':
                return (_jsxs("div", { className: "bg-white p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Market Updates" }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "border-b pb-4", children: [_jsx("h4", { className: "font-semibold", children: "Latest Transactions" }), _jsx("div", { className: "mt-2 space-y-2", children: _jsx("div", { className: "text-sm text-gray-600", children: "No recent transactions" }) })] }) })] }));
            case 'media':
                return (_jsxs("div", { className: "bg-white p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "CMC Media" }), _jsx("div", { className: "space-y-4", children: _jsx("div", { className: "text-sm text-gray-600", children: "No media content available" }) })] }));
            case 'analysis':
                return (_jsxs("div", { className: "bg-white p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Market Analysis" }), _jsx("div", { className: "space-y-4", children: _jsx("div", { className: "text-sm text-gray-600", children: "No analysis data available" }) })] }));
        }
        ;
    };
    return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "flex gap-8", children: [_jsx("div", { className: "w-64 flex-shrink-0", children: _jsxs("nav", { className: "space-y-2", children: [_jsxs("button", { onClick: () => setActiveTab('terminal'), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'terminal' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Terminal, { className: "w-5 h-5" }), _jsx("span", { children: "Terminal" })] }), _jsxs("button", { onClick: () => setActiveTab('listing'), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'listing' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Plus, { className: "w-5 h-5" }), _jsx("span", { children: "Create Listing" })] }), _jsxs("button", { onClick: () => setActiveTab('token'), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'token' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Coins, { className: "w-5 h-5" }), _jsx("span", { children: "New Token" })] }), _jsxs("button", { onClick: () => setActiveTab('updates'), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'updates' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(TrendingUp, { className: "w-5 h-5" }), _jsx("span", { children: "Market Updates" })] }), _jsxs("button", { onClick: () => setActiveTab('media'), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'media' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Newspaper, { className: "w-5 h-5" }), _jsx("span", { children: "CMC Media" })] }), _jsxs("button", { onClick: () => setActiveTab('analysis'), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'analysis' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(BarChart2, { className: "w-5 h-5" }), _jsx("span", { children: "Analysis" })] })] }) }), _jsx("div", { className: "flex-1", children: renderContent() })] }) }));
};
export default Polarity;
