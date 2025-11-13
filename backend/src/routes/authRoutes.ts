import express from 'express';
import { getAuthUrl, handleCallback, getAthleteProfile, getMostRecentAthleteActivities } from '../controllers/authController';

const router = express.Router();

router.get('/url', getAuthUrl);
router.get('/callback', handleCallback);
router.get('/athlete', getAthleteProfile);
router.get('/most-recent-activity', getMostRecentAthleteActivities);

export default router;