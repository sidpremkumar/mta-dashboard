import React from 'react';

interface SubwayIconProps {
  line: string;
}

export const SubwayIcon: React.FC<SubwayIconProps> = ({ line }) => {
  const bgColor = line === 'L' ? 'bg-gray-500' : 'bg-orange-500';
  
  return (
    <div className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center`}>
      <span className="text-2xl font-bold">{line}</span>
    </div>
  );
}; 