import axios from 'axios';
import { eventsIndex, eventsShow, eventCreate } from '../urls/index';


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

export const createEvent = (name, group, image, date, description, info, price) => {
    return axios.post(eventCreate,
            {
                name: name,
                group: group,
                image: image,
                date: date,
                description: description,
                info: info,
                price: price
            }, { withCredentials: true })
    .then(res => {
        return res.data;
    })
    .catch((e) => {throw e;})
}