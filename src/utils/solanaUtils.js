var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// Define supported networks
export const NETWORKS = {
    mainnet: clusterApiUrl('mainnet-beta'),
    devnet: clusterApiUrl('devnet'),
};
// Token symbols (add more tokens here as needed)
const TOKEN_SYMBOLS = {
    So11111111111111111111111111111111111111112: 'SOL', // Native Solana token
    '4dPY9VD4J2zvebvY9bUwngmVNQewhwFEMKV8uQStpump': 'RATSO', // Example token
};
// Utility to create a new connection
export const createConnection = (endpoint) => {
    try {
        return new Connection(endpoint);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating connection:', error.message);
        }
        else {
            console.error('Error creating connection:', error);
        }
        throw new Error('Failed to create a connection to the Solana network');
    }
};
export const getBalance = (connection, publicKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balance = yield connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    }
    catch (error) {
        console.error('Error fetching balance for public key:', publicKey.toString(), error.message);
        throw new Error('Failed to fetch SOL balance');
    }
});
// Fetch token accounts for a wallet
export const getTokenAccounts = (connection, publicKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenAccounts = yield connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: TOKEN_PROGRAM_ID,
        });
        return tokenAccounts.value.map(account => {
            const tokenInfo = account.account.data.parsed.info.tokenAmount;
            const mint = account.account.data.parsed.info.mint;
            return {
                mint,
                amount: tokenInfo.uiAmount || 0, // Handle undefined amounts gracefully
                decimals: tokenInfo.decimals || 0,
                symbol: TOKEN_SYMBOLS[mint] || `Unknown (${mint.slice(0, 4)}...)`, // Fallback for unknown tokens
            };
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching token accounts for public key:', publicKey.toString(), error.message);
        }
        else {
            console.error('Error fetching token accounts for public key:', publicKey.toString(), error);
        }
        return []; // Return an empty array on error
    }
});
// Fetch recent transactions for a wallet
export const getRecentTransactions = (connection_1, publicKey_1, ...args_1) => __awaiter(void 0, [connection_1, publicKey_1, ...args_1], void 0, function* (connection, publicKey, limit = 10) {
    try {
        const transactions = yield connection.getSignaturesForAddress(publicKey, { limit });
        return transactions.map(tx => ({
            signature: tx.signature,
            blockTime: tx.blockTime || null, // Handle undefined blockTime gracefully
            slot: tx.slot,
        }));
    }
    catch (error) {
        console.error('Error fetching recent transactions for public key:', publicKey.toString(), error.message);
        throw new Error('Failed to fetch recent transactions');
    }
});
