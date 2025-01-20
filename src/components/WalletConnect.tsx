import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnect = () => {
  const { wallet } = useWallet();

  return (
    <div className="wallet-connect">
      <WalletMultiButton className="!bg-indigo-700 hover:!bg-indigo-600" />
    </div>
  );
}

export default WalletConnect;