import {React, useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/Login.css';

import {postLoginAuth} from '../apis/users'

export const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        postLoginAuth(username,password)
        .then(() => history.push("/top"))
        .catch((e) => console.error(e))
    }
    return(
        <div className="login-wrapper">
            <p>ログイン画面だお</p>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" onClick={() => handleSubmit()} />

        </div>
    )
}