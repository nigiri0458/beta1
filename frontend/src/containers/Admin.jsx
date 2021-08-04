import {React, useEffect, useReducer, useState} from 'react';
import { initialState, usersActionTypes, usersReducer } from '../reducers/users';
import {useHistory} from 'react-router-dom';
import {adminShow} from '../apis/users';

import '../styles/Admin.css';
import { createEvent } from '../apis/events';

export const Admin = () => {
    const history = useHistory();

    const [state, dispatch] = useReducer(usersReducer, initialState);
    const [pageLoaded, setPageLoaded] = useState(false);

    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [image, setImage] = useState("");
    const [url, setUrl] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [info, setInfo] = useState('');
    const [price, setPrice] = useState('');

    

    useEffect(() => {
        dispatch({type: usersActionTypes.FETCHING});
        adminShow()
        .then((data)=> {
                dispatch({
                    type: usersActionTypes.FETCH_SUCCESS,
                    payload: {
                        user: data.user
                    }
                });
                console.log(data);
                setPageLoaded(true);
            }
        )
        .catch((e) => {
            console.log(e);
        })
    }, [])

    const handleSubmit = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "test_preset");
        data.append("cloud_name", "handshake");
        fetch("https://api.cloudinary.com/v1_1/handshake/image/upload", {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
            console.log(data.url);
            //console.log(url);
            createEvent(name, group, data.url, date, description, info, price)
            .then(() => {
            console.log("sent correctly");
            })
            .catch((e) => console.log(e));
        })
        .catch(e => console.log(e));
    }


    return(
        <div className="admin-page-wrapper">
            {
                pageLoaded ?
                <div>
                    <div className="admin-page-title">管理者ページ</div>
                    <div className="admin-page-title">{state.userInfo.username}</div>

                    <div>
                            <p className="admin-page-word">Name</p>
                            <input className="admin-page-input" type="text" name="Name" value={name} onChange={(e) => setName(e.target.value)} />

                            <p className="admin-page-word">Group</p>
                            <input className="admin-page-input" type="text" name="Group" value={group} onChange={(e) => setGroup(e.target.value)} />

                            <p className="admin-page-word">Image</p>
                            <input className="admin-page-input-file" type="file" name="Image" onChange={(e) => setImage(e.target.files[0])} />
                            

                            <p className="admin-page-word">Date</p>
                            <input className="admin-page-input-date" type="date" name="Date" value={date} onChange={(e) => setDate(e.target.value)} />

                            <p className="admin-page-word">Description</p>
                            <textarea className="admin-page-input-area" type="text" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <p className="admin-page-word">Info</p>
                            <input className="admin-page-input" type="text" name="Info" value={info} onChange={(e) => setInfo(e.target.value)} />

                            <p className="admin-page-word">Price</p>
                            <input className="admin-page-input" type="text" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

                            <p className="admin-page-word">Submit</p>
                            <button className="admin-page-button" onClick={() => handleSubmit()} >Submit</button>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );
}