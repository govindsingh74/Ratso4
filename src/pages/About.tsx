import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ratso</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the future of decentralized applications on Solana,
            making blockchain technology accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Built on Solana's high-performance blockchain, ensuring rapid transaction processing
              and minimal fees.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure by Design</h3>
            <p className="text-gray-600">
              Enterprise-grade security with state-of-the-art encryption and blockchain technology.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Access</h3>
            <p className="text-gray-600">
              Accessible worldwide, enabling seamless transactions and interactions across borders.
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Ratso, we're committed to democratizing access to blockchain technology.
              Our platform bridges the gap between complex blockchain systems and everyday users,
              making decentralized applications accessible to everyone.
            </p>
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2232&ixlib=rb-4.0.3"
              alt="Blockchain Technology"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;