import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Define supported networks
export const NETWORKS = {
    mainnet: clusterApiUrl('mainnet-beta'),
    devnet: clusterApiUrl('devnet'),
};

// Token symbols (add more tokens here as needed)
const TOKEN_SYMBOLS: { [key: string]: string } = {
    So11111111111111111111111111111111111111112: 'SOL', // Native Solana token
    '4dPY9VD4J2zvebvY9bUwngmVNQewhwFEMKV8uQStpump': 'RATSO', // Example token
};

// Utility to create a new connection
export const createConnection = (endpoint: string) => {
    try {
        return new Connection(endpoint);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating connection:', error.message);
        } else {
            console.error('Error creating connection:', error);
        }
        throw new Error('Failed to create a connection to the Solana network');
    }
};

// Fetch SOL balance for a wallet
import { PublicKey } from '@solana/web3.js';

export const getBalance = async (connection: Connection, publicKey: PublicKey) => {
    try {
        const balance = await connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
        console.error('Error fetching balance for public key:', publicKey.toString(), (error as any).message);
        throw new Error('Failed to fetch SOL balance');
    }
};

// Fetch token accounts for a wallet
export const getTokenAccounts = async (connection: Connection, publicKey: PublicKey) => {
    try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: TOKEN_PROGRAM_ID,
        });
        return tokenAccounts.value.map(account => {
            const tokenInfo = account.account.data.parsed.info.tokenAmount;
            const mint: string = account.account.data.parsed.info.mint;
            return {
                mint,
                amount: tokenInfo.uiAmount || 0, // Handle undefined amounts gracefully
                decimals: tokenInfo.decimals || 0,
                symbol: TOKEN_SYMBOLS[mint] || `Unknown (${mint.slice(0, 4)}...)`, // Fallback for unknown tokens
            };
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching token accounts for public key:', publicKey.toString(), error.message);
        } else {
            console.error('Error fetching token accounts for public key:', publicKey.toString(), error);
        }
        return []; // Return an empty array on error
    }
};

// Fetch recent transactions for a wallet
export const getRecentTransactions = async (connection: Connection, publicKey: PublicKey, limit = 10) => {
    try {
        const transactions = await connection.getSignaturesForAddress(publicKey, { limit });
        return transactions.map(tx => ({
            signature: tx.signature,
            blockTime: tx.blockTime || null, // Handle undefined blockTime gracefully
            slot: tx.slot,
        }));
    } catch (error) {
        console.error('Error fetching recent transactions for public key:', publicKey.toString(), (error as Error).message);
        throw new Error('Failed to fetch recent transactions');
    }
};
