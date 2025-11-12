import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Cloud, Lock } from 'lucide-react';

const LoginPage = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-white animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" 
              alt="Weather" 
              className="w-20 h-20 mr-3" 
            />
            <h1 className="text-white text-4xl font-bold">Weather App</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Secure Weather Information Platform
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-white text-2xl font-semibold mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-300">
              Please sign in to access weather information
            </p>
          </div>

          <button
            onClick={() => loginWithRedirect()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Sign In with Auth0
          </button>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Lock size={14} />
              <span>Secured with Multi-Factor Authentication</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2021 Fidenz Technologies
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Protected by Auth0 Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;