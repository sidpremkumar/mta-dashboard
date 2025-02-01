/**
 * Returns the time in minutes to the station from the user's current location
 */
function getTimeToStation(station: string) {
    return {
        'Hewes St': 5,
        'Metropolitan Ave': 11,
        'Broadway': 8
    };
}

export default getTimeToStation;