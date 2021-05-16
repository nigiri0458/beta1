import {React, useEffect} from 'react';

import { fetchEventsIndex } from '../apis/events';

export const Events = () => {
    useEffect(() => {
        fetchEventsIndex()
        .then((data) => 
            console.log(data)
        )
    }, [])
    return(
        <div></div>
    )
}