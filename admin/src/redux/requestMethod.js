import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://ecommerce-api-server-1.herokuapp.com/api/"
const localStorageData = JSON.parse(localStorage.getItem('persist:root'));
let TOKEN = '';
if (localStorageData !== null && localStorageData.currentUser !== 'null') {
    const user = JSON.parse(localStorageData?.user);
    if (user !== null) {
        TOKEN = user?.currentUser?.accessToken || '';
    }
}

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})
