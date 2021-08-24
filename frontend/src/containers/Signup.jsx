import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/loginState/loginStateSlice';
import '../styles/Signup.css';
import {postSignupAuth} from '../apis/users';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const Signup = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [signupFailed, setSignupFailed] = useState(false);

    const handleSubmit = () => {
        if(!(username==="") && !(password==="")){
            if(password === passwordConfirm){
                postSignupAuth(username, password, email)
                .then(() => {
                    history.push("/top");
                    localStorage.setItem("loginState", "true");
                    dispatch(login());
                })
                .catch((e) => {
                    console.error(e);
                    setSignupFailed(true);
                })
            }else{
                
            }
        }
    }


    return(
        <div className="signup-wrapper">
            <p className="signup-page-title">新規登録 SIGNUP</p>

            <div className="signup-form">
                <div className="signup-form-username">
                    <TextField 
                        id="standard-basic"
                        label="ユーザー名 Username"
                        type="text"
                        value={username}
                        fullWidth
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="signup-form-email">
                    <TextField 
                        id="standard-basic"
                        label="メールアドレス Email"
                        type="text"
                        value={email}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="signup-form-password">
                    <TextField
                        id="standard-basic"
                        label="パスワード Password"
                        type="password"
                        value={password}
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="signup-form-password-confirm">
                    <TextField
                        id="standard-basic"
                        label="パスワード確認 Password Confirmation"
                        type="password"
                        value={passwordConfirm}
                        fullWidth
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>

                <div className="signup-form-submit">
                    <Button variant="contained" onClick={() => handleSubmit()}>新規登録 SIGNUP</Button>
                </div>

                {
                    signupFailed ?
                    <div>
                        <p className="signup-error-message">新規登録に失敗しました。<br/>同一のユーザー名・メールアドレスをもったユーザーが存在するか、<br/>パスワードが適切ではありません。</p>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}