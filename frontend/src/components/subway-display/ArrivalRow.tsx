import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React from 'react';

interface ArrivalRowProps {
  time: Dayjs;
  direction: 'uptown' | 'downtown';
  animate?: any;
}

export const ArrivalRow: React.FC<ArrivalRowProps> = ({
  time,
  direction,
  animate,
}) => {
  const minutes = time.diff(dayjs(), 'minute');

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'uptown' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      {...animate}
      className="bg-zinc-800 p-3 rounded flex justify-between items-center"
    >
      <span className="font-mono text-5xl">
        {minutes} min
      </span>
      <span className="text-sm text-gray-400">
        {time.format('h:mm A')}
      </span>
    </motion.div>
  );
}; 