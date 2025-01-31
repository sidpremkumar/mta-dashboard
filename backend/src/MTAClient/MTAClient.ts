import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// @ts-ignore
import { createClient } from 'mta-realtime-subway-departures';
import { StationData } from './MTAClient.types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

class _MTAClient {
    private client: any;
    constructor(private apiKey: string) {
        const MTA_API_KEY = 'not-needed';
        this.client = createClient(MTA_API_KEY);
    }

    /**
     * Get the departures for a given station ID
     * @param stationId - The ID of the station to get departures for
     * @returns The departures for the given station ID
     */
    async getDepartures(stationId: number): Promise<StationData> {
        return await this.client.departures(stationId);
    }

    /**
     * Get upcoming M train departures for a given station ID
     * @param stationId - The ID of the station to get departures for
     * @returns The departures for the given station ID
     */
    async getUpcomingTrainTimes(args: { stationId: number, linePassed: 'M' | 'L' }): Promise<{ uptown: { time: Dayjs }[], downtown: { time: Dayjs }[] }> {
        const { stationId, linePassed } = args;
        // First get all the departures
        const departures = await this.getDepartures(stationId);

        const northTrains: { time: Dayjs, routeId: string }[] = [];
        const southTrains: { time: Dayjs, routeId: string }[] = [];

        for (const line of departures.lines) {
            // North direction
            if (line.departures['N']) {
                for (const train of line.departures['N']) {
                    if (train.routeId === linePassed) {
                        // Convert Unix timestamp to EST
                        const estTime = dayjs(train.time * 1000).tz('America/New_York');
                        console.log(estTime.format()); // This will now print in EST
                        northTrains.push({
                            time: estTime,
                            routeId: train.routeId
                        });
                    }
                }
            }

            // South direction
            if (line.departures['S']) {
                for (const train of line.departures['S']) {
                    if (train.routeId === linePassed) {
                        // Convert Unix timestamp to EST
                        const estTime = dayjs(train.time * 1000).tz('America/New_York');
                        console.log(estTime.format()); // This will now print in EST
                        southTrains.push({
                            time: estTime,
                            routeId: train.routeId
                        });
                    }
                }
            }
        }

        // Sort trains by departure time
        northTrains.sort((a, b) => a.time.diff(b.time));
        southTrains.sort((a, b) => a.time.diff(b.time));

        return {
            'uptown': northTrains,
            'downtown': southTrains
        };
    }
}

const MTAClient = new _MTAClient('not-needed');

export default MTAClient;
