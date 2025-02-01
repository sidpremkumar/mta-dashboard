import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React from 'react';
import getTimeToStation from '../../tools/getTimeToStation';
import { AnimatePresenceFixedType } from './SubwayBoard';
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

  // Pull the time to station from the getTimeToStation tool
  const timeToStation = getTimeToStation(stationName);
  const timeToThisStation = timeToStation[stationName as keyof typeof timeToStation] ?? -100;

  const timeToLeave = React.useMemo(() => {
    const BUFFER_MINUTES = 2;
    const now = dayjs();

    // Get all uptown trains across all lines
    const allUptownTrains = Object.values(data)
      .flatMap(lineData => lineData.uptown)
      .map(train => train.time)
      .sort((a, b) => a.valueOf() - b.valueOf());

    /**
     * Now based on the next train time, we need to calculate the time we should leave to catch that train
     * 
     * We can do this by
     * - Using the timeToThisStation
     * - Adding 2 minutes as buffer
     * - Then finding the next optimal train to use based on the upcoming train times (Assume we are always trying to catch a uptown train)
     */
    const walkingTimeMinutes = timeToThisStation;
    const minimumArrivalTime = now.add(walkingTimeMinutes + BUFFER_MINUTES, 'minutes');

    const nextCatchableTrain = allUptownTrains.find(trainTime =>
      trainTime.isAfter(minimumArrivalTime)
    );

    if (!nextCatchableTrain) return null;

    // Calculate when we need to leave
    return nextCatchableTrain.subtract(walkingTimeMinutes + BUFFER_MINUTES, 'minutes');
  }, [data, timeToThisStation, stationName]);

  const timeToLeaveStatus = React.useMemo(() => {
    if (!timeToLeave) return null;
    const minutesUntilLeave = timeToLeave.diff(dayjs(), 'minutes');

    if (minutesUntilLeave <= 0) return 'LEAVE_NOW';
    if (minutesUntilLeave <= 2) return 'PREPARE';
    return 'NORMAL';
  }, [timeToLeave]);

  const backgroundVariants = {
    NORMAL: {
      backgroundColor: 'rgb(0, 0, 0)',
    },
    PREPARE: {
      backgroundColor: ['rgb(0, 0, 0)', 'rgb(41, 37, 0)', 'rgb(0, 0, 0)'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    LEAVE_NOW: {
      backgroundColor: ['rgb(0, 0, 0)', 'rgb(41, 0, 0)', 'rgb(0, 0, 0)'],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const hasTrains = Object.values(data).some(
    lineData => lineData.uptown.length > 0 || lineData.downtown.length > 0
  );

  return (
    <div className={`relative rounded-lg p-4 shadow-2xl overflow-hidden flex flex-col ${className}`}>
      {/* Background layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={backgroundVariants[timeToLeaveStatus || 'NORMAL']}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex-1 flex flex-col"
      >
        <div className="mb-4">
          <div className="relative">
            <h2 className="text-8xl font-extrabold text-center font-['Helvetica'] tracking-tight">
              {stationName}
            </h2>
            <AnimatePresenceFixedType>
              {timeToLeave && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -bottom-14 left-0 right-0 text-center"
                >
                  {timeToLeaveStatus === 'LEAVE_NOW' ? (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-red-500 font-bold text-4xl font-['Helvetica']"
                    >
                      LEAVE NOW!
                    </motion.div>
                  ) : timeToLeaveStatus === 'PREPARE' ? (
                    <motion.div
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-yellow-500 font-bold text-4xl font-['Helvetica']"
                    >
                      Prepare to Leave in {timeToLeave.diff(dayjs(), 'minutes')} mins
                    </motion.div>
                  ) : (
                    <div className="text-zinc-400 font-bold text-4xl font-['Helvetica']">
                      Leave in {timeToLeave.diff(dayjs(), 'minutes')} mins
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresenceFixedType>
          </div>
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent flex-1" />
            <motion.div
              animate={timeToLeaveStatus === 'LEAVE_NOW'
                ? { scale: [1, 1.5, 1], backgroundColor: ['rgb(255, 0, 0)', 'rgb(200, 0, 0)', 'rgb(255, 0, 0)'] }
                : timeToLeaveStatus === 'PREPARE'
                  ? { scale: [1, 1.2, 1], backgroundColor: ['rgb(255, 255, 0)', 'rgb(200, 200, 0)', 'rgb(255, 255, 0)'] }
                  : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-zinc-700"
            />
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent flex-1" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {hasTrains ? (
            <div className="h-full flex flex-col gap-4">
              {Object.entries(data).map(([line, trainData]) => (
                <TrainLine key={line} line={line} data={trainData} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <div className="text-zinc-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect x="3" y="6" width="18" height="16" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M10 14h4" />
                </svg>
                <h3 className="text-5xl font-['Helvetica'] font-bold mb-2">No Upcoming Trains</h3>
                <p className="text-xl font-['Helvetica'] text-zinc-600">
                  System is currently updating train schedules
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}; 