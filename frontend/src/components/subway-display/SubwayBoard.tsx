import type { Dayjs } from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ElementType } from 'react';
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
  isLoading?: boolean;
}

export const AnimatePresenceFixedType = AnimatePresence as ElementType;

export const SubwayBoard: React.FC<SubwayBoardProps> = ({ trainData, isLoading }) => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden relative">
      <AnimatePresenceFixedType mode="wait">
        {Object.entries(trainData).map(([stationName, stationData]) => (
          <motion.div
            key={stationName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <StationBoard
              stationName={stationName}
              data={stationData}
              className={`flex-1 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'
                }`}
            />
          </motion.div>
        ))}
      </AnimatePresenceFixedType>

      {/* Loading indicator */}
      <AnimatePresenceFixedType>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 text-sm text-zinc-400"
          >
            Updating...
          </motion.div>
        )}
      </AnimatePresenceFixedType>
    </div>
  );
}; 