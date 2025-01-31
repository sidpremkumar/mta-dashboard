import { IconCloud, IconCloudRain, IconSun, IconTemperature, IconWind } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import getCurrentWeatherData from '../../tools/getCurrentWeatherData';

interface WeatherData {
    current: {
        temperature: {
            celsius: number;
            fahrenheit: number;
        };
        windSpeed: number;
        time: string;
    };
    nextHours: Array<{
        time: string;
        temperature: {
            celsius: number;
            fahrenheit: number;
        };
        windSpeed: number;
        humidity: number;
    }>;
}

const WeatherIcon: React.FC<{ condition: string; className?: string }> = ({ condition, className = "w-6 h-6" }) => {
    switch (condition.toLowerCase()) {
        case 'rain':
            return <IconCloudRain className={className} />;
        case 'cloudy':
            return <IconCloud className={className} />;
        case 'sunny':
            return <IconSun className={className} />;
        default:
            return <IconSun className={className} />;
    }
};

const formatTime = (timeString: string) => {
    return dayjs(timeString).format('h A');
};

export const WeatherPanel: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setIsLoading(true);
                const data = await getCurrentWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 15 * 60 * 1000); // Update every 15 minutes

        return () => clearInterval(interval);
    }, []);

    if (isLoading || !weatherData) {
        return (
            <div className="bg-black rounded-xl shadow-2xl p-4 text-white h-full flex items-center justify-center">
                <div className="text-zinc-400">Loading weather data...</div>
            </div>
        );
    }

    return (
        <div className="bg-black rounded-xl shadow-2xl p-4 text-white">
            {/* Current Weather */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <WeatherIcon condition="sunny" className="w-24 h-24" />
                    <div>
                        <div className="text-7xl font-bold flex items-center gap-2">
                            <div className="flex items-center">
                                {Math.round(weatherData.current.temperature.celsius)}°
                                <span className="text-3xl text-zinc-400 ml-1">C</span>
                            </div>
                            <span className="text-zinc-500">/</span>
                            <div className="flex items-center text-6xl text-zinc-400">
                                {Math.round(weatherData.current.temperature.fahrenheit)}°
                                <span className="text-3xl ml-1">F</span>
                            </div>
                            <IconTemperature className="w-12 h-12 ml-1" />
                        </div>
                        <div className="text-zinc-400 flex items-center gap-1 text-3xl">
                            <IconWind className="w-8 h-8" />
                            {Math.round(weatherData.current.windSpeed)} mph
                        </div>
                    </div>
                </div>
                <div className="text-right text-zinc-400">
                    <div className="text-3xl">Updated</div>
                    <div className="text-2xl">{formatTime(weatherData.current.time)}</div>
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className="grid grid-cols-6 gap-4">
                {weatherData.nextHours.map((hour, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="text-2xl text-zinc-400">{formatTime(hour.time)}</div>
                        <WeatherIcon condition="sunny" className="w-16 h-16" />
                        <div className="text-2xl flex flex-col items-center">
                            <div className="flex items-center">
                                {Math.round(hour.temperature.celsius)}°
                                <span className="text-xl text-zinc-400 ml-0.5">C</span>
                            </div>
                            <div className="flex items-center text-xl text-zinc-400">
                                {Math.round(hour.temperature.fahrenheit)}°
                                <span className="text-xl ml-0.5">F</span>
                            </div>
                        </div>
                        <div className="text-xl text-zinc-500">{hour.humidity}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 