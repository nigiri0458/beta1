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
            history.push("/");
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
                    <div>管理者ページ</div>
                    <div>{state.userInfo.username}</div>

                    <div>
                            <p>Name</p>
                            <input type="text" name="Name" value={name} onChange={(e) => setName(e.target.value)} />

                            <p>Group</p>
                            <input type="text" name="Group" value={group} onChange={(e) => setGroup(e.target.value)} />

                            <p>Image</p>
                            
                            <input type="file" name="Image" onChange={(e) => setImage(e.target.files[0])} />
                            

                            <p>Date</p>
                            <input type="date" name="Date" value={date} onChange={(e) => setDate(e.target.value)} />

                            <p>Description</p>
                            <textarea type="text" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <p>Info</p>
                            <input type="text" name="Info" value={info} onChange={(e) => setInfo(e.target.value)} />

                            <p>Price</p>
                            <input type="text" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

                            <p>Submit</p>
                            <button onClick={() => handleSubmit()} >Submit</button>
                        <img src={url} />
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );
}