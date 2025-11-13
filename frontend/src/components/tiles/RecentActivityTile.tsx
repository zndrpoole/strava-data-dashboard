import React from 'react';
import { Activity } from '../../types/strava';
import TileContainer from './TileContainer';

interface RecentActivityTileProps {
  activity: Activity | null;
  loading?: boolean;
  error?: string | null;
}

const RecentActivityTile: React.FC<RecentActivityTileProps> = ({ 
  activity, 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <TileContainer colSpan={2}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </TileContainer>
    );
  }

  if (error) {
    return (
      <TileContainer colSpan={2}>
        <h3 className="text-xl font-semibold mb-4 text-red-600">Recent Activity</h3>
        <p className="text-red-500">Failed to load recent activity</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </TileContainer>
    );
  }

  if (!activity) {
    return (
      <TileContainer colSpan={2}>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activities found</p>
      </TileContainer>
    );
  }

  return (
    <TileContainer colSpan={2}>
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <p className="font-medium text-lg">{activity.name}</p>
      <p className="text-gray-600 mb-2">{activity.type}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-500">Distance</p>
          <p className="text-lg font-semibold">
            {(activity.distance / 1000).toFixed(2)} km
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="text-lg font-semibold">
            {Math.floor(activity.elapsed_time / 60)} min
          </p>
        </div>
        
        {activity.average_speed && (
          <div>
            <p className="text-sm text-gray-500">Avg Speed</p>
            <p className="text-lg font-semibold">
              {(activity.average_speed * 3.6).toFixed(1)} km/h
            </p>
          </div>
        )}
      </div>
    </TileContainer>
  );
};

export default RecentActivityTile;