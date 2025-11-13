import React from 'react';
import TileContainer from './TileContainer';

interface GoalsTileProps {
  loading?: boolean;
  error?: string | null;
}

const GoalsTile: React.FC<GoalsTileProps> = ({ 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <TileContainer>
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </TileContainer>
    );
  }

  if (error) {
    return (
      <TileContainer>
        <h3 className="text-lg font-semibold mb-4 text-red-600">Goals</h3>
        <p className="text-red-500 text-sm">Failed to load goals</p>
      </TileContainer>
    );
  }

  // Mock data for now - this could be fetched from API or user preferences
  const monthlyTarget = 100; // km
  const currentProgress = 45; // km
  const progressPercentage = Math.min((currentProgress / monthlyTarget) * 100, 100);

  return (
    <TileContainer>
      <h3 className="text-lg font-semibold mb-4">Goals</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Monthly Target</p>
          <p className="text-lg font-semibold">{monthlyTarget} km</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progressPercentage.toFixed(0)}% complete ({currentProgress} km)
          </p>
        </div>
      </div>
    </TileContainer>
  );
};

export default GoalsTile;