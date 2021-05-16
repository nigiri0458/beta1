import {React, useEffect} from 'react';

import { fetchEventsShow } from '../apis/events'

export const EventDetails = ({match}) => {
    useEffect(() => {
        fetchEventsShow(match.params.event_id)
        .then(data => 
            console.log(data)
        )
    }, [])

    return(
        <div></div>
    )
}