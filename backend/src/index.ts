import express, { Express, Request, Response } from 'express';
import MTAClient from './MTAClient/MTAClient';

const app: Express = express();
const port = 3000;


/**
 * This route takes in two params, a stationId and a linePassed and returns the next train times for that station and line
 * 
 * @param stationId - The station id to get the train times for
 * @param linePassed - The line to get the train times for
 * @returns The next train times for that station and line
 */
app.get('/train-times', async (req: Request, res: Response) => {
    const { stationId, linePassed } = req.query;
    const trainTimes = await MTAClient.getUpcomingTrainTimes({ stationId: Number(stationId), linePassed: linePassed as 'M' | 'L' });
    res.json(trainTimes);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});