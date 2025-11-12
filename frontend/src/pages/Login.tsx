import React, { useEffect, useState } from 'react';
import { stravaApi } from '../services/stravaApi';

const Login: React.FC = () => {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const url = await stravaApi.getAuthUrl();
        setAuthUrl(url);
      } catch (error) {
        console.error('Error fetching auth URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUrl();
  }, []);

  const handleLogin = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Strava Dashboard
          </h1>
          <p className="text-gray-600">
            Visualize your athletic journey
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Connect with Strava'}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Your data is secure and never shared
        </p>
      </div>
    </div>
  );
};

export default Login;