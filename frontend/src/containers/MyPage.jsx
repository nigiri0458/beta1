import {React, useEffect, useReducer, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import { initialState, usersActionTypes, usersReducer } from '../reducers/users';
import { REQUEST_STATE } from '../constants';

import {fetchUsersShow, postUsersUsernameUpdate, postUsersEmailUpdate} from '../apis/users';

import '../styles/MyPage.css';

export const Mypage = () => {

    const history = useHistory();
    const [state, dispatch] = useReducer(usersReducer, initialState);

    useEffect(() => {
        dispatch({type: usersActionTypes.FETCHING});
        fetchUsersShow()
        .then((data)=> {
            console.log(data);
                dispatch({
                    type: usersActionTypes.FETCH_SUCCESS,
                    payload: {
                        user: data.user
                    }
                });
            }
        )
        .catch((e) => {
            console.log(e);
            history.push('/login');
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
            <p className="mypage-title">マイページ MyPage</p>
            <h2 className="mypage-username">ユーザー名 Username</h2>
            {
                usernameModalOpen ?
                <div className="mypage-modal">
                    <p className="mypage-modal-message">ユーザー名を<br/>    {username}    <br/>に変更します。<br/>よろしいですか？</p>
                    <div className="mypage-modal-container">
                        <button className="mypage-submit-button1" onClick={() => usernameModalSubmit()}>はい<br/>Yes</button>
                        <button className="mypage-submit-button2" onClick={() => usernameModalClose()}>いいえ<br/>No</button>
                    </div>
                </div>
                :
                <div>
                </div>
            }
            {
                emailModalOpen ?
                <div className="mypage-modal">
                    <p className="mypage-modal-message">メールアドレスを<br/>    {email}    <br/>に変更します。<br/>よろしいですか？</p>
                    <div className="mypage-modal-container">
                        <button className="mypage-submit-button1" onClick={() => emailModalSubmit()}>はい<br/>Yes</button>
                        <button className="mypage-submit-button2" onClick={() => emailModalClose()}>いいえ<br/>No</button>
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
                            className="mypage-edit-textfield"
                            id="standard-basic"
                            label=""
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="mypage-edit-button1" onClick={() => setUsernameModalOpen(true)}>確定<br/>Submit</button>
                        <button className="mypage-edit-button2" onClick={() => setUsernameEditorOpen(false)}>キャンセル<br/>Cancel</button>
                    </div>
                    :
                    <div>
                        <p className="mypage-username2">{state.userInfo.username}</p>
                        <button className="mypage-edit-button3" onClick={() => setUsernameEditorOpen(true)}>変更<br/>Edit</button>
                    </div>
                }
            </div>
            <h2 className="mypage-email">メールアドレス Email</h2>
            <div className="mypage-edit-form">
                {
                    emailEditorOpen ?
                    <div>
                        <TextField 
                            className="mypage-edit-textfield"
                            id="standard-basic"
                            label=""
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="mypage-edit-button1" onClick={() => setEmailModalOpen(true)}>確定<br/>Submit</button>
                        <button className="mypage-edit-button2" onClick={() => setEmailEditorOpen(false)}>キャンセル<br/>Cancel</button>
                    </div>
                    :
                    <div>
                        <p className="mypage-email2">{state.userInfo.email}</p>
                        <button className="mypage-edit-button3" onClick={() => setEmailEditorOpen(true)}>変更<br/>Edit</button>
                    </div>
                }
            </div>
            
            <Link to="/cart" className="mypage-cart-link">
                <div className="mypage-cart-button">
                    カート<br/>Cart
                </div>
            </Link>
        </div>
    )
}
