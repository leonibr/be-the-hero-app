import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_APP_URL; // ?  process.env.BASE_APP_URL :  'http://localhost:3333';
const api = axios.create(
    {
        baseURL
    });

export default api;