import axios from 'axios';
import { Athlete }  from '../types/strava';
import { Activity } from '../types/strava';

const API_BASE_URL = 'http://localhost:5001/api';

export const stravaApi = {
  getAuthUrl: async (): Promise<string> => {
    const response = await axios.get(`${API_BASE_URL}/auth/url`);
    return response.data.authUrl;
  },

  getAthleteProfile: async (accessToken: string): Promise<Athlete> => {
    const response = await axios.get(`${API_BASE_URL}/auth/athlete?access_token=${accessToken}`);
    return response.data;
  },

  getRecentActivity: async (accessToken: string): Promise<Activity> => {
    const response = await axios.get(`${API_BASE_URL}/auth/most-recent-activity?access_token=${accessToken}`);
    return response.data;
  },

  getMonthlyBreakdown: async (accessToken: string) => {
    const response = await axios.get(`${API_BASE_URL}/auth/monthly-breakdown?access_token=${accessToken}`);
    return response.data;
  }

};