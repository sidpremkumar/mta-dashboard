import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const MapDisplayHeader: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every second instead of 5 seconds

        return () => clearInterval(timer);
    }, []);

    const timeString = time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return (
        <div className="flex items-center justify-between px-4">
            <img src="/mta-logo.svg" alt="MTA Logo" className="h-8" />
            <div className="w-5"></div>
            <div className="flex space-x-1">
                {timeString.split('').map((char, index) => (
                    <motion.span
                        key={`${index}-${char}`}
                        initial={{ rotateX: -90 }}
                        animate={{ rotateX: 0 }}
                        exit={{ rotateX: 90 }}
                        transition={{ duration: 0.3 }}
                        className="font-['Helvetica'] text-5xl inline-block"
                        style={{ transformOrigin: "50% 50%" }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};