import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzFmYmRjYTU2ZmNkOWE3MWI5NGJlMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzY3OTI1OCwiZXhwIjoxNjQ3NjgyODU4fQ.07X647RZ0RxhEuEVQM673Sbi6ymQpV-JEW5UVthkJLw";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})