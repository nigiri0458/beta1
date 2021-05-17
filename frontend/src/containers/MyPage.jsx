import {React, useEffect} from 'react';

import {fetchUsersShow} from '../apis/users';

export const Mypage = () => {
    useEffect(() => {
        fetchUsersShow()
        .then(data=>
            console.log(data)
            )
    }, [])

    return(
        <div>マイページだお</div>
    )
}