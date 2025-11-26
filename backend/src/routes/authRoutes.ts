import express from 'express';
import { getAuthUrl, handleCallback, getAthleteProfile, getMostRecentAthleteActivities, getMonthlyActivityBreakdown } from '../controllers/authController';

const router = express.Router();

router.get('/url', getAuthUrl);
router.get('/callback', handleCallback);
router.get('/athlete', getAthleteProfile);
router.get('/most-recent-activity', getMostRecentAthleteActivities);
router.get('/monthly-breakdown', getMonthlyActivityBreakdown);

export default router;