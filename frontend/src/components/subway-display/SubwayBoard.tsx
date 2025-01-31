import type { Dayjs } from 'dayjs';
import React from 'react';
import { StationBoard } from './StationBoard';

interface TrainData {
  [station: string]: {
    [line: string]: {
      uptown: { time: Dayjs }[];
      downtown: { time: Dayjs }[];
    };
  };
}

interface SubwayBoardProps {
  trainData: TrainData;
}

export const SubwayBoard: React.FC<SubwayBoardProps> = ({ trainData }) => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {Object.entries(trainData).map(([stationName, stationData]) => (
        <StationBoard
          key={stationName}
          stationName={stationName}
          data={stationData}
          className="flex-1"
        />
      ))}
    </div>
  );
}; 