import { Request, Response } from 'express';
import axios from 'axios';

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

export const getAuthUrl = (req: Request, res: Response) => {
  const authUrl = `${STRAVA_AUTH_URL}?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
  
  res.json({ authUrl });
};

export const handleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange code for access token
    const response = await axios.post(STRAVA_TOKEN_URL, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI
    });

    const { access_token, refresh_token, expires_at, athlete } = response.data;

    // In production, you'd save this to database
    // For now, redirect back to frontend with token
    const frontendUrl = `${process.env.FRONTEND_URL}/dashboard?access_token=${access_token}`;
    
    res.redirect(frontendUrl);
  } catch (error: any) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with Strava' });
  }
};

export const getAthleteProfile = async (req: Request, res: Response) => {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: 'No access token provided' });
  }

  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching athlete profile:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch athlete profile' });
  }
};

export const getMostRecentAthleteActivities = async (req: Request, res: Response) => {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: 'No access token provided' });
  }

  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: {
        per_page: 1,
        page: 1
      }
    });

    return res.json(response.data[0]); // only get most recent activity

  } catch (error: any) {
    console.error('Error fetching athlete activities:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch athlete activities' });
  }
};

export const getMonthlyActivityBreakdown = async (req: Request, res: Response) => {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: 'No access token provided' });
  }

  try {
    // Calculate start of current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const unixTimestamp = Math.floor(startOfMonth.getTime() / 1000);

    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: {
        after: unixTimestamp,
        per_page: 200 // Get more activities to capture the month
      }
    });

    // Group activities by type and count them
    const activityBreakdown: { [key: string]: number } = {};
    
    response.data.forEach((activity: any) => {
      const activityType = activity.type || 'Unknown';
      activityBreakdown[activityType] = (activityBreakdown[activityType] || 0) + 1;
    });

    // Convert to array format for pie chart
    const breakdownArray = Object.entries(activityBreakdown).map(([type, count]) => ({
      type,
      count,
      percentage: ((count / response.data.length) * 100).toFixed(1)
    }));

    res.json({
      total_activities: response.data.length,
      breakdown: breakdownArray,
      period: 'current_month'
    });

  } catch (error: any) {
    console.error('Error fetching monthly activity breakdown:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch monthly activity breakdown' });
  }
};