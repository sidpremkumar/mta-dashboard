import MTAClient from "../MTAClient/MTAClient";

const HEWES_ST = 100
const METROPOLITAN_AVENUE = 629

async function testMTA() {
    const response = await MTAClient.getUpcomingTrainTimes({ stationId: METROPOLITAN_AVENUE, linePassed: 'L' })
}

testMTA();

