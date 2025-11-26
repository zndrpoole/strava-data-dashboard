"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const aws_serverless_express_1 = require("aws-serverless-express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Configure environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        /https:\/\/.*\.amplifyapp\.com$/
    ],
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running on AWS Lambda' });
});
// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Strava Dashboard API',
        version: '1.0.0',
        environment: 'production'
    });
});
// Create the server
const server = (0, aws_serverless_express_1.createServer)(app);
// Lambda handler
const handler = (event, context) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    return (0, aws_serverless_express_1.proxy)(server, event, context, 'PROMISE').promise;
};
exports.handler = handler;
