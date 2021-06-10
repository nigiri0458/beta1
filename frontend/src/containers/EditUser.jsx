import React, { useEffect, useReducer, useState } from 'react';
import { initialState, usersActionTypes, usersReducer } from '../reducers/users';
import {fetchUsersEdit} from '../apis/users';
import TextField from '@material-ui/core/TextField';
import {postUsersUpdate} from '../apis/users';
import {useHistory} from "react-router-dom";
import '../styles/EditUser.css';

export const EditUser = () => {
    const history = useHistory();

    const [state, dispatch] = useReducer(usersReducer, initialState);

    useEffect(() => {
        dispatch({type: usersActionTypes.FETCHING});
        fetchUsersEdit()
        .then((data)=>
            dispatch({
                type: usersActionTypes.FETCH_SUCCESS,
                payload: {
                    user: data.user
                }
            })
        );
    }, [])

    const [username, setUsername] = useState(state.userInfo.username);
    const [email, setEmail] = useState(state.userInfo.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [updateFailed, setUpdateFailed] = useState(false);

    const updateSuccess = () => {
        history.push("/mypage");
    }

    const updateFail = (e) => {
        console.log(e);
        setUpdateFailed(true);
    }

    const handleSubmit = () => {
        
    }


    return(
        <div className="edit-page-wrapper">
            <p className="edit-page-title">ユーザー情報変更 Edit User</p>
            <div className="edit-page-text">
                <TextField
                    id="standard-basic"
                    label="ユーザー名 Username"
                    type="text"
                    value={username}
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="edit-page-text">
                <TextField
                    id="standard-basic"
                    label="メール Email"
                    type="text"
                    value={email}
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="edit-page-text">
                <TextField
                    id="standard-basic"
                    label="現在のパスワード Current Password"
                    type="password"
                    value={oldPassword}
                    fullWidth
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="edit-page-text">
                <TextField
                    id="standard-basic"
                    label="新しいパスワード New Password"
                    type="password"
                    value={newPassword}
                    fullWidth
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="edit-page-text">
                <TextField
                    id="standard-basic"
                    label="新しいパスワード(確認) Confirm Current Password"
                    type="password"
                    value={newPasswordConfirm}
                    fullWidth
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
            </div>

            <button className="edit-page-button" onClick={() => handleSubmit()}>
                変更<br/>Edit
            </button>

            {
                updateFailed ?
                <div>
                    <p>変更できませんでした。ユーザー名、パスワードをご確認ください。</p>
                </div>
                :
                <div></div>
            }
        </div>
    )
}