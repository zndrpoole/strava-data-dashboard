"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get('/url', authController_1.getAuthUrl);
router.get('/callback', authController_1.handleCallback);
router.get('/athlete', authController_1.getAthleteProfile);
router.get('/most-recent-activity', authController_1.getMostRecentAthleteActivities);
router.get('/monthly-breakdown', authController_1.getMonthlyActivityBreakdown);
exports.default = router;
