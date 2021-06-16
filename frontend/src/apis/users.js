import axios from 'axios';
import { signupAuth, usersShow, usersEdit, usersUpdate, loginAuth, logout} from '../urls/index';

export const fetchUsersShow = () => {
    return axios.get(usersShow,{ withCredentials: true })
    .then(res => {
        return res.data
    })
    .catch((e) => console.error(e))
}

export const fetchUsersEdit = () => {
    return axios.get(usersEdit, { withCredentials: true })
    .then(res => {
        return res.data
    })
    .catch((e) => console.error(e))
}

export const postUsersUsernameUpdate = (username) => {
    return axios.post(usersUpdate,
        {
            username: username
        },{ withCredentials: true })
        .then(res => {
            return res.data;
        })
        .catch((e) => {throw e;})
}

export const postUsersEmailUpdate = (email) => {
    return axios.post(usersUpdate,
        {
            email: email
        },{ withCredentials: true })
        .then(res => {
            return res.data;
        })
        .catch((e) => {throw e;})
}

export const postSignupAuth = (username, password, email) => {
    return axios.post(signupAuth,
        {
            username: username,
            password: password,
            email: email
        },{ withCredentials: true })
    .then(res => {
        return res.data;
    })
    .catch((e) => {throw e;})
}

export const postLoginAuth = (username, password) => {
    return axios.post(loginAuth,
        {
            username: username,
            password: password,
        },{ withCredentials: true })
    .then(res => {
        return res.data;
    })
    .catch((e) => {throw e;})
}

export const postLogout = () => {
    return axios.post(logout,
                    　{},
                    　{withCredentials: true}
                    )
    .then(res => {
        return res.data;
    })
    .catch((e) => {throw e;})
}