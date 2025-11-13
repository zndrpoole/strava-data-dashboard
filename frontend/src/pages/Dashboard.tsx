import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStravaData } from '../hooks/useStravaData';
import { Athlete } from '../types/strava';
import Button from '../components/Button';
import RecentActivityTile from '../components/tiles/RecentActivityTile';
import WeeklyStatsTile from '../components/tiles/WeeklyStatsTile';
import AllTimeStatsTile from '../components/tiles/AllTimeStatsTile';
import GoalsTile from '../components/tiles/GoalsTile';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get access token from URL or localStorage
  const params = new URLSearchParams(location.search);
  const urlToken = params.get('access_token');
  const storedToken = localStorage.getItem('strava_access_token');
  const accessToken = urlToken || storedToken;

  // Store token if it came from URL
  if (urlToken) {
    localStorage.setItem('strava_access_token', urlToken);
  }

  // Redirect to login if no token
  if (!accessToken) {
    navigate('/');
    return null;
  }

  // Use custom hook for data fetching
  const { athlete, recentActivity, loading, error, refetchData } = useStravaData(accessToken);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const refreshProfile = () => {
    refetchData();
  };

  // Handle errors by redirecting to login
  if (error && error.includes('401')) {
    localStorage.removeItem('strava_access_token');
    navigate('/');
    return null;
  }

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

        {/* Dashboard Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <RecentActivityTile 
            activity={recentActivity} 
            loading={loading} 
            error={error} 
          />
          
          <WeeklyStatsTile 
            loading={loading} 
            error={error} 
          />
          
          <AllTimeStatsTile 
            loading={loading} 
            error={error} 
          />
          
          <GoalsTile 
            loading={loading} 
            error={error} 
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;