interface CurrentWeather {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
}

interface HourlyWeather {
    time: string[];
    wind_speed_10m: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
}

interface WeatherResponse {
    current: {
        temperature_2m: number;
        wind_speed_10m: number;
        weather_code: number;
        time: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        relative_humidity_2m: number[];
        wind_speed_10m: number[];
        weather_code: number[];
    };
}

interface FormattedWeatherData {
    current: {
        temperature: {
            celsius: number;
            fahrenheit: number;
        };
        windSpeed: number;
        weatherCode: number;
        time: string;
    };
    nextHours: {
        time: string;
        temperature: {
            celsius: number;
            fahrenheit: number;
        };
        windSpeed: number;
        humidity: number;
        weatherCode: number;
    }[];
}

const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9 / 5) + 32;
};

const convertToEST = (utcTimeString: string): string => {
    const date = new Date(utcTimeString);
    return date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};

async function getCurrentWeatherData(): Promise<FormattedWeatherData> {
    const LAT = 40.708540;
    const LNG = -73.950925;

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America/New_York`
    );
    const data: WeatherResponse = await response.json();

    // Format current weather
    const current = {
        temperature: {
            celsius: data.current.temperature_2m,
            fahrenheit: celsiusToFahrenheit(data.current.temperature_2m)
        },
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        time: convertToEST(data.current.time),
    };

    // Get and format next 6 hours
    const currentTimeIndex = data.hourly.time.findIndex(time =>
        new Date(time).getHours() === new Date(data.current.time).getHours()
    );

    const nextHours = data.hourly.time
        .slice(currentTimeIndex, currentTimeIndex + 6)
        .map((time, index) => ({
            time: convertToEST(time),
            temperature: {
                celsius: data.hourly.temperature_2m[currentTimeIndex + index],
                fahrenheit: celsiusToFahrenheit(data.hourly.temperature_2m[currentTimeIndex + index])
            },
            windSpeed: data.hourly.wind_speed_10m[currentTimeIndex + index],
            humidity: data.hourly.relative_humidity_2m[currentTimeIndex + index],
            weatherCode: data.hourly.weather_code[currentTimeIndex + index],
        }));

    return {
        current,
        nextHours,
    };
}

export default getCurrentWeatherData;