import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Zap, Store } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletConnect from './WalletConnect';
import ProfileModal from './ProfileModal';
import { supabase } from '../lib/supabase';

const Header = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    const checkProfile = async () => {
      if (!publicKey) return;

      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', publicKey.toString())
          .maybeSingle();

        // Only show modal if no profile exists
        if (!data) {
          setIsProfileModalOpen(true);
        }
      } catch (error) {
        console.error('Error checking profile:', error);
      }
    };

    checkProfile();
  }, [publicKey]);

  return (
    <header className="bg-indigo-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8" />
              <span className="text-xl font-bold">Ratso</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Home
                </Link>
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Dashboard
                </Link>
                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  About
                </Link>
                <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/polarity"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Store className="w-5 h-5 mr-2" />
              Polarity
            </Link>
            <WalletConnect />
          </div>
        </div>
      </nav>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
}

export default Header;