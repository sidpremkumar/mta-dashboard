import React from 'react';
import SubwayScene from './SubwayScene';

export const MapPanel: React.FC = () => {
  return (
    <div className="h-full">
      <div className="bg-black h-full rounded-xl shadow-2xl overflow-hidden">
        <SubwayScene />
      </div>
    </div>
  );
}; 