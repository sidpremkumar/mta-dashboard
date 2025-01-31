import MTAClient from "../MTAClient/MTAClient";
// @ts-ignore
import brightness from 'brightness';

const HEWES_ST = 100
const METROPOLITAN_AVENUE = 629

async function testMTA() {
    const response = await MTAClient.getUpcomingTrainTimes({ stationId: METROPOLITAN_AVENUE, linePassed: 'L' })
}


async function testbrightness() {

    const level = await brightness.get();
    console.log(level);
    //=> 0.5

}
testbrightness();

