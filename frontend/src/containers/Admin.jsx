import {React, useEffect, useReducer, useState} from 'react';
import { initialState, usersActionTypes, usersReducer } from '../reducers/users';
import {useHistory} from 'react-router-dom';
import {adminShow} from '../apis/users';

import '../styles/Admin.css';

export const Admin = () => {
    const history = useHistory();

    const [state, dispatch] = useReducer(usersReducer, initialState);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        dispatch({type: usersActionTypes.FETCHING});
        adminShow()
        .then((data)=> {
                dispatch({
                    type: usersActionTypes.FETCH_SUCCESS,
                    payload: {
                        user: data.user
                    }
                });
                console.log(data);
                setPageLoaded(true);
            }
        )
        .catch((e) => {
            console.log(e);
            history.push("/top");
        })
    }, [])



    return(
        <div className="admin-page-wrapper">
            {
                pageLoaded ?
                <div>
                    <div>管理者ページ</div>
                    <div>{state.userInfo.username}</div>
                </div>
                :
                <div></div>
            }
        </div>
    );
}