import express from 'express';
import { getAuthUrl, handleCallback, getAthleteProfile } from '../controllers/authController';

const router = express.Router();

router.get('/url', getAuthUrl);
router.get('/callback', handleCallback);
router.get('/athlete', getAthleteProfile);

export default router;