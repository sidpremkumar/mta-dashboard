import type { Dayjs } from 'dayjs';
import React from 'react';
import { SubwayIcon } from '../common/SubwayIcon';
import { ArrivalRow } from './ArrivalRow';

interface TrainLineProps {
    line: string;
    data: {
        uptown: { time: Dayjs }[];
        downtown: { time: Dayjs }[];
    };
}

export const TrainLine: React.FC<TrainLineProps> = ({ line, data }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <SubwayIcon line={line} />
                <h2 className="text-xl font-bold font-['Helvetica'] tracking-tight">Train Status</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="text-5xl font-semibold text-gray-300 font-['Helvetica']">North</h3>
                    {data.uptown.slice(0, 3).map((arrival, idx) => (
                        <ArrivalRow
                            key={idx}
                            time={arrival.time}
                            direction="uptown"
                            animate={{ delay: idx * 0.1 }}
                        />
                    ))}
                </div>

                <div className="space-y-2">
                    <h3 className="text-5xl font-semibold text-gray-300 font-['Helvetica']">South</h3>
                    {data.downtown.slice(0, 3).map((arrival, idx) => (
                        <ArrivalRow
                            key={idx}
                            time={arrival.time}
                            direction="downtown"
                            animate={{ delay: idx * 0.1 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}; 