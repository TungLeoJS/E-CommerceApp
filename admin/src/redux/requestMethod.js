import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const userLocalStorage = localStorage.getItem('persist:root');
let TOKEN = '';
if (userLocalStorage) {
    TOKEN = JSON.parse(JSON.parse(userLocalStorage)?.user)?.currentUser?.accessToken;
}

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})
