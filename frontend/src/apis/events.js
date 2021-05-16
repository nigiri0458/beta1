import axios from 'axios';
import { eventsIndex, eventsShow } from '../urls/index';


export const fetchEventsIndex = () => {
    return axios.get(eventsIndex)
    .then(res => {
        return res.data;
    })
    .catch((e) => {console.error(e);})
}

export const fetchEventsShow = (eventId) => {
    return axios.get(eventsShow(eventId))
    .then(res => {
        return res.data;
    })
    .catch((e) => console.error(e))
}