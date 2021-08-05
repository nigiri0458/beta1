import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/Top.css';
// gitのテスト
export const Top = () => {
    useEffect(() => {
        console.log(localStorage.getItem("loginState"));
    }, [])

    const loginState = useSelector((state) => state.loginState.boolean);

    return(
        <div className="top-wrapper">
            <Link to="/events" className="top-events-link">
                <div className="top-events-button">
                    イベント一覧<br/>Events
                </div>
            </Link>

            {
                loginState === "true" ?
                <div>
                    <Link to="/mypage" className="top-link">
                        <div className="top-button">
                            マイページ<br/>Mypage
                        </div>
                    </Link>
                    <Link to="/cart" className="top-link">
                        <div className="top-button">
                            カート<br/>Cart
                        </div>
                    </Link>
                </div>
                :
                <div>
                    <Link to="/login" className="top-link">
                        <div className="top-button">
                            ログイン<br/>Login
                        </div>
                    </Link>
                    <Link to="/signup" className="top-link">
                        <div className="top-button">
                            新規登録<br/>Sign Up
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}