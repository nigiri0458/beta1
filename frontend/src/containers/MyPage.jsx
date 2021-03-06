import {React, useEffect, useReducer, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import { initialState, usersActionTypes, usersReducer } from '../reducers/users';

import {fetchUsersShow, postUsersUsernameUpdate, postUsersEmailUpdate} from '../apis/users';

import '../styles/MyPage.css';

export const Mypage = () => {
    const history = useHistory();

    const [state, dispatch] = useReducer(usersReducer, initialState);

    useEffect(() => {
        dispatch({type: usersActionTypes.FETCHING});
        fetchUsersShow()
        .then((data)=> {
                dispatch({
                    type: usersActionTypes.FETCH_SUCCESS,
                    payload: {
                        user: data.user
                    }
                });
                console.log(data);
            }
        )
        .catch((e) => {
            console.log(e);
            history.push('/top');
        });
    }, [])

    const [usernameEditorOpen, setUsernameEditorOpen] = useState(false);
    const [usernameModalOpen, setUsernameModalOpen] = useState(false);
    const [emailEditorOpen, setEmailEditorOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [username, setUsername] = useState(state.userInfo.username);
    const [email, setEmail] = useState(state.userInfo.email);

    const usernameModalSubmit = () => {
        postUsersUsernameUpdate(username)
        .then(() => window.location.reload())
        .catch((e) => console.log(e));
        setUsernameModalOpen(false);
        setUsernameEditorOpen(false);
        //fetchUsersShow()
        //.then((data)=> console.log(data));
    }

    const usernameModalClose = () => {
        setUsernameModalOpen(false);
        setUsernameEditorOpen(false);
    }

    const emailModalSubmit = () => {
        postUsersEmailUpdate(email)
        .then(() => window.location.reload())
        .catch((e) => console.log(e));
        setEmailModalOpen(false);
        setEmailEditorOpen(false);
    }

    const emailModalClose = () => {
        setEmailModalOpen(false);
        setEmailEditorOpen(false);
    }

    return(
        <div className="mypage-wrapper">
            <p className="mypage-title">??????????????? MyPage</p>
            <h2 className="mypage-username">??????????????? Username</h2>
            {
                usernameModalOpen ?
                <div className="mypage-modal">
                    <p className="mypage-modal-message">??????????????????    {username}    ?????????????????????????????????????????????</p>
                    <div className="mypage-modal-container">
                        <button className="mypage-submit-button1" onClick={() => usernameModalSubmit()}>??????<br/>Yes</button>
                        <button className="mypage-submit-button2" onClick={() => usernameModalClose()}>?????????<br/>No</button>
                    </div>
                </div>
                :
                <div>
                </div>
            }
            {
                emailModalOpen ?
                <div className="mypage-modal">
                    <p className="mypage-modal-message">????????????????????????    {email}    ?????????????????????????????????????????????</p>
                    <div className="mypage-modal-container">
                        <button className="mypage-submit-button1" onClick={() => emailModalSubmit()}>??????<br/>Yes</button>
                        <button className="mypage-submit-button2" onClick={() => emailModalClose()}>?????????<br/>No</button>
                    </div>
                </div>
                :
                <div>
                </div>
            }
            <div className="mypage-edit-form">
                {
                    usernameEditorOpen ?
                    <div>
                        <TextField 
                            id="standard-basic"
                            label=""
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="mypage-edit-button1" onClick={() => setUsernameModalOpen(true)}>??????<br/>Submit</button>
                        <button className="mypage-edit-button2" onClick={() => setUsernameEditorOpen(false)}>???????????????<br/>Cancel</button>
                    </div>
                    :
                    <div>
                        <p className="mypage-username2">{state.userInfo.username}</p>
                        <button className="mypage-edit-button3" onClick={() => setUsernameEditorOpen(true)}>??????<br/>Edit</button>
                    </div>
                }
            </div>
            <h2 className="mypage-email">????????????????????? Email</h2>
            <div className="mypage-edit-form">
                {
                    emailEditorOpen ?
                    <div>
                        <TextField 
                            id="standard-basic"
                            label=""
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="mypage-edit-button1" onClick={() => setEmailModalOpen(true)}>??????<br/>Submit</button>
                        <button className="mypage-edit-button2" onClick={() => setEmailEditorOpen(false)}>???????????????<br/>Cancel</button>
                    </div>
                    :
                    <div>
                        <p className="mypage-email2">{state.userInfo.email}</p>
                        <button className="mypage-edit-button3" onClick={() => setEmailEditorOpen(true)}>??????<br/>Edit</button>
                    </div>
                }
            </div>
            
            <Link to="/cart" className="mypage-cart-link">
                <div className="mypage-cart-button">
                    ?????????<br/>Cart
                </div>
            </Link>
        </div>
    )
}
