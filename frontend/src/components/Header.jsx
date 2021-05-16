import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postLogout} from '../apis/users';
import '../styles/Header.css';

export const Header = () => {
    const history = useHistory();
    
    const handleLogout = () => {
        postLogout()
        .then(() => history.push('/top'))
        .catch((e) => console.error(e));
    }

    return (
        <header>
            <div className="home-button">
                <Link to="/top">
                HomeIcon
                </Link>
            </div>
            <div className="header-right">
                <div className="header-button">
                Login
                </div>
                <div className="header-button">
                Sign Up
                </div>
                <div className="header-button">
                Menu Bar
                </div>
                <div className="header-button" onClick={() => handleLogout()}>
                Log Out
                </div>
            </div>
        </header>
    )
}