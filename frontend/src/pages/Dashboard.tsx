import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { stravaApi } from '../services/stravaApi';
import { Athlete } from '../types/strava';
import Button from '../components/Button';

const Dashboard: React.FC = () => {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');

    if (!accessToken) {
      navigate('/');
      return;
    }

    // Store token in localStorage for future use
    localStorage.setItem('strava_access_token', accessToken);

    const fetchAthleteProfile = async () => {
      try {
        const profile = await stravaApi.getAthleteProfile(accessToken);
        setAthlete(profile);
      } catch (error) {
        console.error('Error fetching athlete profile:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchAthleteProfile();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const refreshProfile = async () => {
    const accessToken = localStorage.getItem('strava_access_token');
    if (!accessToken) {
      navigate('/');
      return;
    }
    
    try {
      const profile = await stravaApi.getAthleteProfile(accessToken);
      setAthlete(profile);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Strava Dashboard
            </h1>
            {athlete && (
              <div className="flex items-center gap-4">
                <img
                  src={athlete.profile}
                  alt={athlete.firstname}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {athlete.firstname} {athlete.lastname}
                  </p>
                  <p className="text-sm text-gray-600">
                    {athlete.city}, {athlete.state}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-gray-600">
            Your dashboard is being built. Check back soon for activity stats and visualizations.
          </p>
          <Button variant="primary" onClick={refreshProfile} className="mt-6">
            Refresh Profile
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;