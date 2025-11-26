import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// @ts-ignore
import { createServer, proxy } from 'aws-serverless-express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    /https:\/\/.*\.amplifyapp\.com$/
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

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
const server = createServer(app);

// Lambda handler
export const handler = (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));
  return proxy(server, event, context, 'PROMISE').promise;
};