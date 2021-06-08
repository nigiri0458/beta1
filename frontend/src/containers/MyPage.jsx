import {React, useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';

import { initialState, usersActionTypes, usersReducer } from '../reducers/users';
import { REQUEST_STATE } from '../constants';

import {fetchUsersShow} from '../apis/users';

import '../styles/MyPage.css';

export const Mypage = () => {

    const [state, dispatch] = useReducer(usersReducer, initialState);

    useEffect(() => {
        dispatch({type: usersActionTypes.FETCHING});
        fetchUsersShow()
        .then((data)=>
            dispatch({
                type: usersActionTypes.FETCH_SUCCESS,
                payload: {
                    user: data.user
                }
            })
        );
    }, [])

    return(
        <div className="mypage-wrapper">
            <p className="mypage-title">マイページ MyPage</p>
            <h2 className="mypage-username">ユーザー名 Username</h2>
            <p className="mypage-username2">{state.userInfo.username}</p>
            <Link to="/user/edit" className="mypage-edit-link">
                <div className="mypage-edit-button">
                    ユーザー情報変更<br/>Edit User Info
                </div>
            </Link>
            
            <Link to="/cart" className="mypage-cart-link">
                <div className="mypage-cart-button">
                    カート<br/>Cart
                </div>
            </Link>
        </div>
    )
}