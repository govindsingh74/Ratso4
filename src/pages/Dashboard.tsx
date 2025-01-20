import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { History, Wallet, Coins } from 'lucide-react';
import { getBalance, getRecentTransactions, getTokenAccounts, NETWORKS } from '../utils/solanaUtils';
import { Connection, PublicKey } from '@solana/web3.js';

type Network = 'mainnet' | 'devnet';

interface TokenAccount {
  mint: string;
  amount: number;
  decimals: number;
  symbol: string;
}

interface Transaction {
  signature: string;
  blockTime: number | null;
}

const Dashboard: React.FC = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tokens, setTokens] = useState<TokenAccount[]>([]);
  const [network, setNetwork] = useState<Network>('devnet'); // Default to devnet for safety
  const [connection, setConnection] = useState<Connection>(new Connection(NETWORKS[network]));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConnection(new Connection(NETWORKS[network]));
  }, [network]);

  useEffect(() => {
    const fetchData = async () => {
      if (!publicKey) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [solBalance, tokenAccounts, recentTxs] = await Promise.all([
          getBalance(connection, publicKey),
          getTokenAccounts(connection, publicKey),
          getRecentTransactions(connection, publicKey)
        ]);

        setBalance(solBalance);
        setTokens(tokenAccounts);
        setTransactions(recentTxs);
      } catch (err) {
        console.error('Error fetching wallet data:', err);
        setError('Failed to fetch wallet data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [publicKey, connection]);

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Wallet className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-500">Please connect your wallet to view your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="network" className="text-sm font-medium text-gray-700">
            Network:
          </label>
          <select
            id="network"
            value={network}
            onChange={(e) => setNetwork(e.target.value as Network)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="devnet">Devnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Wallet Balance</h2>
              <Wallet className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-indigo-600 mb-4">
              {balance !== null ? `${balance.toFixed(4)} SOL` : '0.0000 SOL'}
            </p>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Token Holdings</h3>
                <Coins className="w-5 h-5 text-indigo-600" />
              </div>
              {tokens.length > 0 ? (
                <div className="space-y-2">
                  {tokens.map((token, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{token.symbol || `${token.mint.slice(0, 4)}...${token.mint.slice(-4)}`}</span>
                      <span className="font-medium">{token.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No tokens found</p>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Address: {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
              <History className="w-6 h-6 text-indigo-600" />
            </div>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <a
                      href={`https://${network === 'mainnet' ? '' : network + '.'}solscan.io/tx/${tx.signature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                    </a>
                    <span className="text-gray-500">
                      {tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleDateString() : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent transactions found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;