import dayjs from 'dayjs';

export const mockTrainData = {
    "Metropolitan Ave": {
        L: {
            uptown: [
                { time: dayjs().add(3, 'minute') },
                { time: dayjs().add(12, 'minute') },
                { time: dayjs().add(24, 'minute') },
            ],
            downtown: [
                { time: dayjs().add(5, 'minute') },
                { time: dayjs().add(15, 'minute') },
                { time: dayjs().add(28, 'minute') },
            ],
        },

    },
    "Broadway": {
        G: {
            uptown: [
                { time: dayjs().add(3, 'minute') },
                { time: dayjs().add(12, 'minute') },
                { time: dayjs().add(24, 'minute') },
            ],
            downtown: [
                { time: dayjs().add(5, 'minute') },
                { time: dayjs().add(15, 'minute') },
                { time: dayjs().add(28, 'minute') },
            ],
        },
    },
    "Hewes St": {
        M: {
            uptown: [
                { time: dayjs().add(3, 'minute') },
                { time: dayjs().add(12, 'minute') },
                { time: dayjs().add(24, 'minute') },
            ],
            downtown: [
                { time: dayjs().add(5, 'minute') },
                { time: dayjs().add(15, 'minute') },
                { time: dayjs().add(28, 'minute') },
            ],
        },
    },
}; 