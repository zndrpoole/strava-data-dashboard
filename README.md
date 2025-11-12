# Strava Data Dashboard

A full-stack TypeScript application that integrates with the Strava API to provide athletes with personalized data visualizations and insights from their activities.

## Features

- **Strava OAuth Integration** - Secure authentication with Strava API
- **Athlete Profile Display** - View basic athlete information and stats
- **Responsive Design** - Built with React and Tailwind CSS
- **TypeScript** - Full type safety across frontend and backend

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

**Backend:**
- Express.js with TypeScript
- Strava API integration
- CORS enabled for frontend communication

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Strava Developer Account

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/zndrpoole/strava-data-dashboard.git
   cd strava-data-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure Strava API**
   - Go to [Strava Developer Dashboard](https://developers.strava.com/)
   - Create a new application
   - Set Authorization Callback Domain to: `localhost:5001`

4. **Environment Setup**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   CLIENT_ID=your_strava_client_id
   CLIENT_SECRET=your_strava_client_secret
   REDIRECT_URI=http://localhost:5001/api/auth/callback
   FRONTEND_URL=http://localhost:3000
   ```

## Running the Application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Or run separately:**
```bash
# Backend only
npm run backend:dev

# Frontend only (in another terminal)
npm run frontend:dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── routes/          # Express routes
│   │   └── server.ts        # Express app setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── services/        # API service layer
│   │   └── types/           # TypeScript type definitions
│   └── package.json
└── package.json             # Root package.json for scripts
```

## Available Scripts

- `npm run dev` - Run both frontend and backend in development
- `npm run build` - Build both frontend and backend for production
- `npm run test` - Run frontend tests
- `npm start` - Start production backend server

## Authentication Flow

1. User clicks "Connect with Strava" on login page
2. Redirects to Strava OAuth authorization
3. User grants permissions
4. Strava redirects back with authorization code
5. Backend exchanges code for access token
6. User is redirected to dashboard with profile data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Activity data visualization with charts
- [ ] Weekly/monthly activity summaries  
- [ ] Goal tracking and progress monitoring
- [ ] Activity filtering and search
- [ ] Export functionality for data
- [ ] Mobile responsive improvements

## Support

For questions or issues, please open an issue on GitHub or contact [zndr.poole@gmail.com](mailto:zndr.poole@gmail.com).