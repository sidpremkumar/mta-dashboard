export interface Departure {
    routeId: string;
    time: number;
    destinationStationId: string;
}

export interface DepartureDirections {
    N?: Departure[];
    S?: Departure[];
}

export interface Line {
    name: string;
    stationId: string;
    departures: DepartureDirections;
}

export interface StationData {
    complexId: number;
    name: string;
    lines: Line[];
}