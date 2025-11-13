import { useEffect, useState } from 'react';
import { stravaApi } from '../services/stravaApi';
import { Athlete, Activity } from '../types/strava';

interface UseStravaDataReturn {
  athlete: Athlete | null;
  recentActivity: Activity | null;
  loading: boolean;
  error: string | null;
  refetchData: () => void;
}

export const useStravaData = (accessToken: string | null): UseStravaDataReturn => {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const [profile, activity] = await Promise.all([
        stravaApi.getAthleteProfile(accessToken),
        stravaApi.getRecentActivity(accessToken)
      ]);
      
      setAthlete(profile);
      setRecentActivity(activity);
    } catch (error: any) {
      console.error('Error fetching Strava data:', error);
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const refetchData = () => {
    fetchData();
  };

  return {
    athlete,
    recentActivity,
    loading,
    error,
    refetchData
  };
};