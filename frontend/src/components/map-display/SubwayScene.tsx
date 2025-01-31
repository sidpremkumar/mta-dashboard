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
  const lPath = `M1019.551,1056.583L812.125,849.156
        c-3.111-3.111-9.257-5.657-13.657-5.657H202.134`;
  const mPath = `M969.967,614.312 
       L658.134,614.312
       Q605.009,614.312 554.627,677.089
       C552.294,679.422,547.684,681.331,544.384,681.331
       L315.969,681.291
       L304.967,681.291
       Q304.967,700 304.967,857.999
       Q304.967,890 367.301,906.499
       L417.218,906.499
       Q429.781,906.499 441.344,922.625
       L582.842,922.625
       L684.134,922.625
       Q689,916 694.821,910.228
       L862.342,742.708`;
  const gPath = `M523.772,691.803
       L510.319,705.256
       Q506.076,709.499 506.076,715.499
       L506.076,814.878
       Q506.076,818.178 510.319,822.421
       L658.286,970.388
       Q662.529,974.631 662.529,977.931
       L662.529,1095.832
       Q662.529,1099.132 658.286,1103.375
       L554.364,1207.297
       Q549.712,1211.949 549.712,1224.666
       Q549.712,1250.755 637.719,1250.755
       Q637.719,1250.755 660.209,1252.749
       Q665.675,1259.636 707.083,1301.044`;

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

      <svg
        className="w-full h-full relative z-10"
        viewBox="0 0 1408.57 1539.082"
        preserveAspectRatio="xMidYMid meet"
      >

        <g>
          <path fill="#1F1F1F" opacity={0.5} d="M48.967,653.5c0,4.4,1.198,11.395,2.663,15.544l169.675,480.744c1.464,4.149,6.263,7.544,10.663,7.544
			h136.75c4.4,0,10.546-2.545,13.658-5.655l122.089-122.022c3.112-3.11,5.658-9.255,5.658-13.655v-81.845
			c0-4.4-2.545-10.546-5.657-13.657l-33.718-33.716c-3.111-3.111-5.658-9.257-5.659-13.657l-0.12-422.208
			c-0.001-4.4-3.603-8-8.002-8h-19.358c-4.4,0-10.545-2.545-13.657-5.657L180.358,193.665c-3.111-3.111-9.257-5.657-13.657-5.657
			H56.967c-4.4,0-8,3.6-8,8V653.5z"/>
          <path fill="none" stroke="#414F4D" stroke-width="2" d="M48.967,653.5c0,4.4,1.198,11.395,2.663,15.544l169.675,480.744
			c1.464,4.149,6.263,7.544,10.663,7.544h136.75c4.4,0,10.546-2.545,13.658-5.655l122.089-122.022
			c3.112-3.11,5.658-9.255,5.658-13.655v-81.845c0-4.4-2.545-10.546-5.657-13.657l-33.718-33.716
			c-3.111-3.111-5.658-9.257-5.659-13.657l-0.12-422.208c-0.001-4.4-3.603-8-8.002-8h-19.358c-4.4,0-10.545-2.545-13.657-5.657
			L180.358,193.665c-3.111-3.111-9.257-5.657-13.657-5.657H56.967c-4.4,0-8,3.6-8,8V653.5z"/>
        </g>

        <defs>
          <mask id="remainingSpaceMask">
            <rect x="-24.254" y="-26.2" width="1432.824" height="1610.2" fill="white" />
            <g>
              <path fill="black" d="M1408.57,414.747l-573.197,0c-4.4,0-10.546,2.546-13.657,5.657l-16.756,16.756H485.549
          c-4.4,0-7.999,3.6-7.998,8l0.12,415.049c0.001,4.4,2.548,10.546,5.659,13.657l33.186,33.187c0,0,5.657,9.257,5.657,13.657
          l0,98.167c0,4.4-2.544,10.547-5.654,13.659L412.96,1135.732c-3.11,3.112-5.656,9.259-5.657,13.659l-0.022,71.437
          c-0.002,4.4,2.543,10.546,5.654,13.657l144.678,144.678c0,0,5.657,9.257,5.657,13.657l0,190.99L-24.254,1584
          l0-1610.2l46.721,0c4.4,0,8.337,0,8.75,0s4.35,0,8.75,0h1.001c4.4,0,8,3.6,8,8v169.333c0,4.4,3.6,8.004,8,8.01l113.958,0.146
          c4.399,0.006,10.541,2.561,13.646,5.678l243.448,244.357c3.105,3.118,9.246,5.665,13.646,5.661l211.426-0.178
          c4.4-0.004,10.547-2.552,13.659-5.662l133.644-117.706c3.112-3.11,5.658-9.255,5.658-13.655V0h473.914c4.4,0,11.6,0,16,0h93.333
          c4.4,0,8.01,3.6,8.022,8L1408.57,8z"/>
              <path fill="black" d="M1046.374,930.592l125.436,125.436c3.111,3.111,5.657,9.257,5.657,13.657v95.188
          c0,4.4-2.546,10.546-5.657,13.657L723.624,1626.716c-3.111,3.112-2.057,5.723,2.342,5.803l536.002,9.777
          c4.399,0.081,7.999-3.454,7.999-7.854v-2c0-4.4,3.6-7.934,7.999-7.854l131.002,2.391c4.399,0.081,7.999-3.454,7.999-7.854
          v-93.75c0-4.4,0-11.6,0-16v-480.5c0-4.4,0.031-11.6,0.07-16l1.859-212c0.039-4.4-3.53-8-7.93-8h-50
          c-4.4,0-10.546,2.546-13.657,5.657L1183.125,971.342c-3.111,3.111-8.203,3.111-11.314,0l-36.186-36.186
          c-3.111-3.111-3.113-8.204-0.003-11.316l164.692-164.692c3.11-3.113,9.254-5.66,13.654-5.66h100c4.4,0,8-3.6,8-8v-9.834
          c0-4.4-3.6-8-8-8h-156.501c-4.4,0-10.532,2.559-13.626,5.687l-29.311,29.626c-3.094,3.128-5.626,9.287-5.626,13.687v52.688
          c0,4.4-2.546,10.546-5.657,13.657l-0.623,0.623c-3.111,3.111-9.257,5.657-13.657,5.657h-53.125c-4.4,0-10.546,2.546-13.657,5.657
          l-75.811,75.811C1043.263,922.389,1043.263,927.481,1046.374,930.592z"/>
            </g>
          </mask>
        </defs>

        <rect x="-24.254" y="-26.2" width="1432.824" height="1610.2" fill="#1F1F1F" opacity={0.5} mask="url(#remainingSpaceMask)" />


        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>

        {/* L Train */}
        <path
          id="l-train-path"
          d={lPath}
          stroke="#949599"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
        <circle r={4} fill="#949599">
          <animateMotion
            dur="20s"
            repeatCount="indefinite"
            keyPoints="0;1;0"
            keyTimes="0;0.5;1"
            calcMode="linear"
            path={lPath}
          >
            <mpath href="#l-train-path" />
          </animateMotion>
        </circle>

        {/* M Train */}
        <path
          id="m-train-path"
          d={mPath}
          stroke="#f5811f"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
        <circle r={4} fill="#f5811f">
          <animateMotion
            dur="20s"
            repeatCount="indefinite"
            keyPoints="0;1;0"
            keyTimes="0;0.5;1"
            calcMode="linear"
            begin="2s"
            path={mPath}
          >
            <mpath href="#m-train-path" />
          </animateMotion>
        </circle>

        {/* G Train */}
        <path
          id="g-train-path"
          d={gPath}
          stroke="#7dc045"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
        <circle r={4} fill="#7dc045">
          <animateMotion
            dur="20s"
            repeatCount="indefinite"
            keyPoints="0;1;0"
            keyTimes="0;0.5;1"
            calcMode="linear"
            begin="4s"
            path={gPath}
          >
            <mpath href="#g-train-path" />
          </animateMotion>
        </circle>

      </svg>
    </div>
  );
};

export default SubwayScene; 