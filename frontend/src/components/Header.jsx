import {React} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/loginState/loginStateSlice';
import {postLogout} from '../apis/users';
import '../styles/Header.css';

export const Header = () => {

    const loginState = useSelector((state) => state.loginState.boolean);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutCorrect = () => {
        localStorage.setItem("loginState", "false");
        dispatch(logout());
        history.push('/top');
    }
    
    const handleLogout = () => {
        postLogout()
        .then(() => logoutCorrect())
        .catch((e) => console.error(e));
    }

    return (
        <header>
            <div className="home-button">
                <Link to="/top" className="header-link0">
                トップ<br />Top
                </Link>
            </div>
            <div className="header-right">
                {
                    loginState === "true" ?
                    <div>
                        <Link to="/mypage" className="header-link1">
                            <div className="header-button1">
                                マイページ<br/>My Page
                            </div>
                        </Link>
                        <Link to="/cart" className="header-link2">
                            <div className="header-button2">
                                カート<br/>Cart
                            </div>
                        </Link>
                    </div>
                    :
                    <div>
                        <Link to="/login" className="header-link1">
                            <div className="header-button1">
                                ログイン<br/>LOGIN
                            </div>
                        </Link>
                        <Link to="/signup" className="header-link2">
                            <div className="header-button2">
                                新規登録<br/>SIGN UP
                            </div>
                        </Link>
                    </div>
                    
                }

            {
                loginState === "true" ?
                <div className="header-button-logout" onClick={() => handleLogout()}>
                    ログアウト<br/>LOGOUT
                </div>
                :
                <div></div>
            }
            </div>
        </header>
    )
}