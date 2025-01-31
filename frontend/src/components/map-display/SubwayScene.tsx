import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import getSunriseAndSunsetTime from '../../tools/getSunriseAndSunsetTime';

const SubwayScene: React.FC = () => {
  const [isDaytime, setIsDaytime] = useState(true);
  const [dayProgress, setDayProgress] = useState(0);
  const [nightProgress, setNightProgress] = useState(0);

  useEffect(() => {
    const updateDayNightCycle = async () => {
      try {
        const { results } = await getSunriseAndSunsetTime();
        const now = new Date();
        const sunrise = new Date(`${results.date} ${results.sunrise}`);
        const sunset = new Date(`${results.date} ${results.sunset}`);

        // Check if it's daytime
        const isDay = now >= sunrise && now <= sunset;
        setIsDaytime(isDay);

        if (isDay) {
          // During day: Calculate progress towards sunset
          const dayLength = sunset.getTime() - sunrise.getTime();
          const timeUntilSunset = sunset.getTime() - now.getTime();
          const progress = 1 - (timeUntilSunset / dayLength);
          setDayProgress(Math.min(Math.max(progress, 0), 1));
        } else {
          // During night: Calculate progress towards sunrise
          const nextSunrise = new Date(sunrise);
          if (now > sunset) {
            nextSunrise.setDate(nextSunrise.getDate() + 1);
          }
          const nightLength = nextSunrise.getTime() - sunset.getTime();
          const timeUntilSunrise = nextSunrise.getTime() - now.getTime();
          const progress = 1 - (timeUntilSunrise / nightLength);
          setNightProgress(Math.min(Math.max(progress, 0), 1));
        }
      } catch (error) {
        console.error('Error fetching sun times:', error);
      }
    };

    updateDayNightCycle();
    const interval = setInterval(updateDayNightCycle, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Define paths using more angular lines
  const lPath = "M100,400 L400,400 L600,500 L900,450";
  const mPath = "M50,600 L300,550 L500,650 L800,600";
  const gPath = "M500,800 L600,600 L700,400 L900,200";

  return (
    <div className="relative w-full h-full">
      {/* Sky Background */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${isDaytime
          ? 'bg-gradient-to-b from-blue-400 to-blue-600'
          : 'bg-gradient-to-b from-blue-900 to-indigo-900'
          }`}
      >
        {/* Stars */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${isDaytime ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Sun - visible during day */}
      <motion.div
        className={`absolute w-16 h-16 rounded-full transition-opacity duration-1000 ${isDaytime ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          backgroundColor: '#FDB813',
          filter: 'blur(8px) brightness(1.5)',
          boxShadow: '0 0 60px rgba(255, 249, 196, 0.5), 0 0 120px rgba(255, 244, 179, 0.3)',
          top: '15%',
          left: `${dayProgress * 100}%`,
          transform: 'translateX(-50%)'
        }}
      />

      {/* Moon - visible during night */}
      <motion.div
        className={`absolute w-12 h-12 rounded-full transition-opacity duration-1000 ${isDaytime ? 'opacity-0' : 'opacity-100'
          }`}
        style={{
          backgroundColor: '#FFFFFF',
          filter: 'blur(4px) brightness(1.2)',
          boxShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          bottom: '15%',
          right: `${nightProgress * 100}%`,
          transform: 'translateX(50%)'
        }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[#111] opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <svg className="w-full h-full relative z-10" viewBox="0 0 1000 900" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>

        {/* Static Train Lines */}
        <path
          d={lPath}
          stroke="#949599"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        <path
          d={mPath}
          stroke="#f5811f"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        <path
          d={gPath}
          stroke="#7dc045"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        {/* Animated Trains */}
        <motion.circle
          r={4}
          fill="#949599"
          animate={{
            cx: [100, 400, 600, 900],
            cy: [400, 400, 500, 450],
            scale: [1.5, 1.5, 1.5, 1.5],
            rotate: [0, 0, 0, 0]
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
            times: [0, 0.33, 0.67, 1]
          }}
          style={{
            filter: "drop-shadow(0 0 2px #949599)"
          }}
        />

        <motion.circle
          r={4}
          fill="#f5811f"
          animate={{
            cx: [50, 300, 500, 800],
            cy: [600, 550, 650, 600],
            scale: [1.5, 1.5, 1.5, 1.5],
            rotate: [0, 0, 0, 0]
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
            times: [0, 0.33, 0.67, 1]
          }}
          style={{
            filter: "drop-shadow(0 0 2px #f5811f)"
          }}
        />

        <motion.circle
          r={4}
          fill="#7dc045"
          animate={{
            cx: [500, 600, 700, 900],
            cy: [800, 600, 400, 200],
            scale: [1.5, 1.5, 1.5, 1.5],
            rotate: [0, 0, 0, 0]
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4,
            times: [0, 0.33, 0.67, 1]
          }}
          style={{
            filter: "drop-shadow(0 0 2px #7dc045)"
          }}
        />
      </svg>
    </div>
  );
};

export default SubwayScene; 