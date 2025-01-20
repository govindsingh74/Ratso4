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
import { X, Upload, User } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
const ProfileModal = ({ isOpen, onClose }) => {
    const { publicKey } = useWallet();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (publicKey) {
            const address = publicKey.toString();
            setWalletAddress(address);
            // Check if profile already exists
            const fetchProfile = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const { data, error } = yield supabase
                        .from('profiles')
                        .select('*')
                        .eq('wallet_address', address)
                        .maybeSingle();
                    if (error && error.code !== 'PGRST116') {
                        console.error('Error fetching profile:', error);
                        return;
                    }
                    if (data) {
                        setFullName(data.full_name);
                        setProfilePicture(data.avatar_url);
                    }
                }
                catch (err) {
                    console.error('Error in fetchProfile:', err);
                }
            });
            fetchProfile();
        }
    }, [publicKey]);
    const generatePixelAvatar = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return null;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }
        return canvas.toDataURL();
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!publicKey)
            return;
        setIsLoading(true);
        setError(null);
        const finalProfilePicture = profilePicture || generatePixelAvatar();
        try {
            const profile = {
                wallet_address: walletAddress,
                full_name: fullName,
                avatar_url: finalProfilePicture,
            };
            const { error: upsertError } = yield supabase
                .from('profiles')
                .upsert(profile, {
                onConflict: 'wallet_address',
                ignoreDuplicates: false
            });
            if (upsertError) {
                console.error('Error saving profile:', upsertError);
                throw upsertError;
            }
            onClose();
            navigate('/polarity');
        }
        catch (err) {
            console.error('Error saving profile:', err);
            setError('Failed to save profile. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    });
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-8 max-w-md w-full m-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Setup Profile" }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "w-6 h-6" }) })] }), error && (_jsx("div", { className: "mb-4 p-4 bg-red-50 text-red-600 rounded-md", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Profile Picture" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden", children: profilePicture ? (_jsx("img", { src: profilePicture, alt: "Profile", className: "w-full h-full object-cover" })) : (_jsx(User, { className: "w-12 h-12 text-gray-400" })) }), _jsxs("button", { type: "button", onClick: () => setProfilePicture(generatePixelAvatar()), className: "px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200", children: [_jsx(Upload, { className: "w-4 h-4 inline-block mr-2" }), "Generate Avatar"] })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "fullName", className: "block text-sm font-medium text-gray-700 mb-2", children: "Full Name" }), _jsx("input", { type: "text", id: "fullName", value: fullName, onChange: (e) => setFullName(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "walletAddress", className: "block text-sm font-medium text-gray-700 mb-2", children: "Wallet Address" }), _jsx("input", { type: "text", id: "walletAddress", value: walletAddress, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50", readOnly: true })] }), _jsx("button", { type: "submit", disabled: isLoading, className: `w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`, children: isLoading ? 'Saving...' : 'Continue to Polarity' })] })] }) }));
};
export default ProfileModal;
