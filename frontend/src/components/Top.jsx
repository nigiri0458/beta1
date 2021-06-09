import {React, useEffect} from 'react';
import '../styles/Top.css';

export const Top = () => {
    useEffect(() => {
        console.log(localStorage.getItem("loginState"));
    }, [])

    return(
        <div className="top-wrapper">Top</div>
    )
}