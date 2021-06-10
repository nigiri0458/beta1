import {React, useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/Login.css';

//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {postLoginAuth} from '../apis/users'

export const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);

    const loginCorrect = () => {
        localStorage.setItem("loginState", "true");
        history.push("/top");
        window.location.reload();
    }

    const loginFail = (e) => {
        console.log(e);
        setLoginFailed(true);
    }

    const handleSubmit = () => {
        if(!(username==="") && !(password==="")){
            postLoginAuth(username,password)
            .then(() => loginCorrect())
            .catch((e) => loginFail(e));
        }
    }

    return(
        <div className="login-wrapper">
            <p className="login-page-title">ログイン LOGIN</p>
            <div className="login-form">
                <div className="login-form-username">
                    <TextField 
                        id="standard-basic"
                        label="ユーザー名 Username"
                        type="text"
                        value={username}
                        fullWidth
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-form-password">
                    <TextField
                        id="standard-basic"
                        label="パスワード Password"
                        type="password"
                        value={password}
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-form-submit">
                    <Button variant="contained" onClick={() => handleSubmit()}>ログイン Login</Button>
                </div>
                {
                    loginFailed ?
                    <div>
                        <p className="login-error-message">ログインに失敗しました。</p>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}