import { addHours } from 'date-fns';

export const events = [
    {
        id: '1',
        start: new Date('2023-07-23 00:00:00'),
        end: new Date('2023-07-23 24:59:59'),
        title: 'Cumpleaños Rocio',
        notes: 'Alguna Nota de Rocio'
    },
    {
        id: '2',
        start: new Date('2023-08-23 00:00:00'),
        end: new Date('2023-08-23 24:59:59'),
        title: 'Cumpleaños Melissa',
        notes: 'Alguna Nota de Melissa'
    },
];

export const initialState = {
    isLoadingEvent: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvent: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventsState = {
    isLoadingEvent: false,
    events: [...events],
    activeEvent: { ...events[0] }
}