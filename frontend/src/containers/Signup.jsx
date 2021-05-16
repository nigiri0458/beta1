import React, {useState} from 'react';
import '../styles/Signup.css';
import {postSignupAuth} from '../apis/users';

export const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        postSignupAuth(username, password, email)
    }


    return(
        <div className="signup-wrapper">
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="submit" onClick={() => handleSubmit()} />
        </div>
    )
}