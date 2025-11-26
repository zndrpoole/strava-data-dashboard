import React from 'react';

interface TileContainerProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
}

const TileContainer: React.FC<TileContainerProps> = ({ 
  children, 
  className = '', 
  colSpan = 1 
}) => {
  const getColSpanClasses = () => {
    switch (colSpan) {
      case 1:
        return 'col-span-1';
      case 2:
        return 'col-span-1 md:col-span-2';
      case 3:
        return 'col-span-1 md:col-span-2 lg:col-span-3';
      case 4:
        return 'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${getColSpanClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default TileContainer;