import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import './App.css';
import { MapDisplayHeader } from './components/map-display/MapDisplayHeader';
import { MapPanel } from './components/map-display/MapPanel';
import { SubwayBoard } from './components/subway-display/SubwayBoard';
import { WeatherPanel } from './components/weather-display/WeatherPanel';
import getTrainTimings from './tools/getTrainTimings';

function App() {
  const [trainData, setTrainData] = useState<Awaited<ReturnType<typeof getTrainTimings>> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newData = await getTrainTimings();
        console.log(newData);
        setTrainData(newData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch train data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for updates
    const interval = setInterval(fetchData, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen grid grid-rows-[auto,1fr] overflow-hidden bg-zinc-900 text-white">
      <header className="py-2 bg-black flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {isLoading ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <IconCheck />
          )}
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </header>
      <main className="grid grid-cols-[2fr,1fr] h-full">
        <div className="p-4 overflow-hidden">
          {!trainData ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-2xl text-gray-400">Loading train data...</div>
            </div>
          ) : (
            <SubwayBoard trainData={trainData} isLoading={isLoading} />
          )}
        </div>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center gap-4 p-4">
            <MapDisplayHeader />
          </div>
          <div className="flex-1 px-4 py-2">
            <MapPanel />
          </div>
          <div className="px-4 py-2">
            <WeatherPanel />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
