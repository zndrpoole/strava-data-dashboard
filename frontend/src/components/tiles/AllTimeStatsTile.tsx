import React from 'react';
import TileContainer from './TileContainer';

interface AllTimeStatsTileProps {
  loading?: boolean;
  error?: string | null;
}

const AllTimeStatsTile: React.FC<AllTimeStatsTileProps> = ({ 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <TileContainer>
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </TileContainer>
    );
  }

  if (error) {
    return (
      <TileContainer>
        <h3 className="text-lg font-semibold mb-4 text-red-600">All Time</h3>
        <p className="text-red-500 text-sm">Failed to load all-time stats</p>
      </TileContainer>
    );
  }

  return (
    <TileContainer>
      <h3 className="text-lg font-semibold mb-4">All Time</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Total Distance</p>
          <p className="text-2xl font-bold text-blue-500">-</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Activities</p>
          <p className="text-xl font-semibold">-</p>
        </div>
      </div>
    </TileContainer>
  );
};

export default AllTimeStatsTile;