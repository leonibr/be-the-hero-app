import axios from 'axios';
const baseURL  = process.env.REACT_APP_BASE_APP_URL ?  process.env.REACT_APP_BASE_APP_URL :  'http://localhost:3333';
console.log('using host> ' + baseURL);
const api = axios.create(
    {
        baseURL : baseURL 
    });

export default api;