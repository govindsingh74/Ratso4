import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Ratso
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-200">
            The future of decentralized applications powered by Solana
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Launch App <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white text-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Fast & Secure</h3>
              <p className="text-gray-600">
                Built on Solana for lightning-fast transactions and maximum security
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Intuitive interface designed for both beginners and experts
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Decentralized</h3>
              <p className="text-gray-600">
                True decentralization with Solana blockchain integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;