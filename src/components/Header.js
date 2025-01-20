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
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Store } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletConnect from './WalletConnect';
import ProfileModal from './ProfileModal';
import { supabase } from '../lib/supabase';
const Header = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const { publicKey } = useWallet();
    useEffect(() => {
        const checkProfile = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!publicKey)
                return;
            try {
                const { data } = yield supabase
                    .from('profiles')
                    .select('*')
                    .eq('wallet_address', publicKey.toString())
                    .maybeSingle();
                // Only show modal if no profile exists
                if (!data) {
                    setIsProfileModalOpen(true);
                }
            }
            catch (error) {
                console.error('Error checking profile:', error);
            }
        });
        checkProfile();
    }, [publicKey]);
    return (_jsxs("header", { className: "bg-indigo-600 text-white", children: [_jsx("nav", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "h-8 w-8" }), _jsx("span", { className: "text-xl font-bold", children: "Ratso" })] }), _jsx("div", { className: "hidden md:block ml-10", children: _jsxs("div", { className: "flex items-baseline space-x-4", children: [_jsx(Link, { to: "/", className: "px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500", children: "Home" }), _jsx(Link, { to: "/dashboard", className: "px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500", children: "Dashboard" }), _jsx(Link, { to: "/about", className: "px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500", children: "About" }), _jsx(Link, { to: "/contact", className: "px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500", children: "Contact" })] }) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Link, { to: "/polarity", className: "flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: [_jsx(Store, { className: "w-5 h-5 mr-2" }), "Polarity"] }), _jsx(WalletConnect, {})] })] }) }), _jsx(ProfileModal, { isOpen: isProfileModalOpen, onClose: () => setIsProfileModalOpen(false) })] }));
};
export default Header;
