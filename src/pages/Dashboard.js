var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { History, Wallet, Coins } from 'lucide-react';
import { getBalance, getRecentTransactions, getTokenAccounts, NETWORKS } from '../utils/solanaUtils';
import { Connection } from '@solana/web3.js';
const Dashboard = () => {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [tokens, setTokens] = useState([]);
    const [network, setNetwork] = useState('devnet'); // Default to devnet for safety
    const [connection, setConnection] = useState(new Connection(NETWORKS[network]));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setConnection(new Connection(NETWORKS[network]));
    }, [network]);
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!publicKey) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const [solBalance, tokenAccounts, recentTxs] = yield Promise.all([
                    getBalance(connection, publicKey),
                    getTokenAccounts(connection, publicKey),
                    getRecentTransactions(connection, publicKey)
                ]);
                setBalance(solBalance);
                setTokens(tokenAccounts);
                setTransactions(recentTxs);
            }
            catch (err) {
                console.error('Error fetching wallet data:', err);
                setError('Failed to fetch wallet data. Please try again later.');
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchData();
    }, [publicKey, connection]);
    if (!publicKey) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: _jsxs("div", { className: "text-center", children: [_jsx(Wallet, { className: "w-16 h-16 mx-auto text-gray-400 mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-gray-700 mb-2", children: "Connect Your Wallet" }), _jsx("p", { className: "text-gray-500", children: "Please connect your wallet to view your dashboard" })] }) }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Dashboard" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { htmlFor: "network", className: "text-sm font-medium text-gray-700", children: "Network:" }), _jsxs("select", { id: "network", value: network, onChange: (e) => setNetwork(e.target.value), className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", children: [_jsx("option", { value: "devnet", children: "Devnet" }), _jsx("option", { value: "mainnet", children: "Mainnet" })] })] })] }), isLoading ? (_jsx("div", { className: "text-center py-12", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4 mx-auto" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2 mx-auto" })] }) })) : error ? (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-red-600", children: error }) })) : (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Wallet Balance" }), _jsx(Wallet, { className: "w-6 h-6 text-indigo-600" })] }), _jsx("p", { className: "text-3xl font-bold text-indigo-600 mb-4", children: balance !== null ? `${balance.toFixed(4)} SOL` : '0.0000 SOL' }), _jsxs("div", { className: "border-t pt-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Token Holdings" }), _jsx(Coins, { className: "w-5 h-5 text-indigo-600" })] }), tokens.length > 0 ? (_jsx("div", { className: "space-y-2", children: tokens.map((token, index) => (_jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: token.symbol || `${token.mint.slice(0, 4)}...${token.mint.slice(-4)}` }), _jsx("span", { className: "font-medium", children: token.amount.toLocaleString() })] }, index))) })) : (_jsx("p", { className: "text-gray-500 text-sm", children: "No tokens found" }))] }), _jsxs("p", { className: "text-sm text-gray-500 mt-4", children: ["Address: ", publicKey.toString().slice(0, 8), "...", publicKey.toString().slice(-8)] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Recent Transactions" }), _jsx(History, { className: "w-6 h-6 text-indigo-600" })] }), transactions.length > 0 ? (_jsx("div", { className: "space-y-3", children: transactions.map((tx, index) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("a", { href: `https://${network === 'mainnet' ? '' : network + '.'}solscan.io/tx/${tx.signature}`, target: "_blank", rel: "noopener noreferrer", className: "text-indigo-600 hover:text-indigo-800", children: [tx.signature.slice(0, 8), "...", tx.signature.slice(-8)] }), _jsx("span", { className: "text-gray-500", children: tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleDateString() : 'Pending' })] }, index))) })) : (_jsx("p", { className: "text-gray-500", children: "No recent transactions found" }))] })] }))] }));
};
export default Dashboard;
