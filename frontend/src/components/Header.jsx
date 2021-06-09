import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postLogout} from '../apis/users';
import '../styles/Header.css';

export const Header = () => {
    const history = useHistory();

    const logoutCorrect = () => {
        localStorage.setItem("loginState", "false");
        history.push("/top");
        console.log(localStorage.getItem("loginState"));
    }
    
    const handleLogout = () => {
        postLogout()
        .then(() => logoutCorrect())
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
                <Link to="/login" className="login-button">
                    <div className="header-button-login">
                        ログイン<br/>LOGIN
                    </div>
                </Link>
                <Link to="/signup" className="signup-button">
                    <div className="header-button-signup">
                        新規登録<br/>SIGN UP
                    </div>
                </Link>

                <div className="header-button-logout" onClick={() => handleLogout()}>
                    ログアウト<br/>LOGOUT
                </div>
            </div>
        </header>
    )
}