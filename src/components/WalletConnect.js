import { jsx as _jsx } from "react/jsx-runtime";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
const WalletConnect = () => {
    const { wallet } = useWallet();
    return (_jsx("div", { className: "wallet-connect", children: _jsx(WalletMultiButton, { className: "!bg-indigo-700 hover:!bg-indigo-600" }) }));
};
export default WalletConnect;
