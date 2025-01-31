import type { Dayjs } from 'dayjs';
import { motion } from 'framer-motion';
import React from 'react';
import { TrainLine } from './TrainLine';

interface StationData {
  [line: string]: {
    uptown: { time: Dayjs }[];
    downtown: { time: Dayjs }[];
  };
}

interface StationBoardProps {
  stationName: string;
  data: StationData;
  className?: string;
}

export const StationBoard: React.FC<StationBoardProps> = ({ stationName, data, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-black rounded-lg p-4 shadow-2xl overflow-hidden flex flex-col ${className}`}
    >
      <h2 className="text-xl font-bold mb-2 truncate">{stationName}</h2>
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col gap-4">
          {Object.entries(data).map(([line, trainData]) => (
            <TrainLine key={line} line={line} data={trainData} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 