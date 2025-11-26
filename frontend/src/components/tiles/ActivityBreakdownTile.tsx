import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TileContainer from './TileContainer';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ActivityBreakdown {
  type: string;
  count: number;
  percentage: string;
}

interface MonthlyBreakdownData {
  total_activities: number;
  breakdown: ActivityBreakdown[];
  period: string;
}

interface ActivityBreakdownTileProps {
  data: MonthlyBreakdownData | null;
  loading?: boolean;
  error?: string | null;
}

const ActivityBreakdownTile: React.FC<ActivityBreakdownTileProps> = ({ 
  data, 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <TileContainer colSpan={2}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </TileContainer>
    );
  }

  if (error) {
    return (
      <TileContainer colSpan={2}>
        <h3 className="text-xl font-semibold mb-4 text-red-600">Activity Breakdown</h3>
        <p className="text-red-500">Failed to load activity breakdown</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </TileContainer>
    );
  }

  if (!data || data.total_activities === 0) {
    return (
      <TileContainer colSpan={2}>
        <h3 className="text-xl font-semibold mb-4">Activity Breakdown</h3>
        <p className="text-gray-500">No activities found for this month</p>
      </TileContainer>
    );
  }

  // Colors for different activity types
  const colors = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#FF6384', // Red (repeat for more activities)
    '#C9CBCF'  // Gray
  ];

  const chartData = {
    labels: data.breakdown.map(item => item.type),
    datasets: [
      {
        data: data.breakdown.map(item => item.count),
        backgroundColor: colors.slice(0, data.breakdown.length),
        borderColor: colors.slice(0, data.breakdown.length),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide the legend since we're showing custom stats
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const item = data.breakdown[context.dataIndex];
            return `${item.type}: ${item.count} (${item.percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <TileContainer colSpan={2}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Activity Breakdown</h3>
        <span className="text-sm text-gray-500">This Month</span>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Pie Chart */}
        <div className="w-48 h-48 flex-shrink-0">
          <Pie data={chartData} options={options} />
        </div>
        
        {/* Stats and Activity List */}
        <div className="flex-1">
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-blue-600">{data.total_activities}</p>
            <p className="text-base text-gray-500">Total Activities</p>
          </div>
          
          {/* Activity summary list */}
          <div className="space-y-3">
            {data.breakdown.map((item, index) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-4" 
                    style={{ backgroundColor: colors[index] }}
                  ></div>
                  <span className="text-gray-700 text-base">{item.type}</span>
                </div>
                <span className="text-gray-900 font-medium text-base">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TileContainer>
  );
};

export default ActivityBreakdownTile;