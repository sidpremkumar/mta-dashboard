import dayjs from "dayjs";

const HEWES_ST = 100
const METROPOLITAN_AVENUE = 629
const BROADWAY = 286

interface TrainTiming {
    time: dayjs.Dayjs;
    routeId: string;
}

interface StationTimings {
    uptown: TrainTiming[];
    downtown: TrainTiming[];
}

const getTrainTimings = async (): Promise<{ [key: string]: { [key: string]: StationTimings } }> => {
    const stations = [
        { id: HEWES_ST, line: 'M' },
        { id: METROPOLITAN_AVENUE, line: 'L' },
        { id: BROADWAY, line: 'G' }
    ];

    const results = await Promise.all(
        stations.map(async ({ id, line }) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/train-times?stationId=${id}&linePassed=${line}`,
                    {
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // Convert time strings to dayjs objects
                return {
                    uptown: data.uptown.map((t: any) => ({ ...t, time: dayjs(t.time) })),
                    downtown: data.downtown.map((t: any) => ({ ...t, time: dayjs(t.time) }))
                };
            } catch (error) {
                console.error(`Error fetching train times for ${line} line:`, error);
                return { uptown: [], downtown: [] };
            }
        })
    );

    return {
        'Hewes St': { M: results[0] as StationTimings },
        'Metropolitan Ave': { L: results[1] as StationTimings },
        'Broadway': { G: results[2] as StationTimings }
    };
};

export default getTrainTimings;