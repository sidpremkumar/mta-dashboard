interface SunTimeResults {
    date: string;
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
    solar_noon: string;
    golden_hour: string;
    day_length: string;
    timezone: string;
    utc_offset: number;
}

interface SunTimeResponse {
    results: SunTimeResults;
    status: string;
}

async function getSunriseAndSunsetTime(): Promise<SunTimeResponse> {
    const response = await fetch('https://api.sunrisesunset.io/json?lat=40.712776&lng=-74.005974');
    const data = await response.json();
    return data;
}
export default getSunriseAndSunsetTime;