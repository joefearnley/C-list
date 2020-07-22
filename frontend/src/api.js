import axios from 'axios';
import config from './config';

const defaultOptions = {
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
};

let instance = axios.create(defaultOptions);
instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? `Token ${token}` : null;
        return config;
    },
    error => {
        return Promise.reject(error);
    });

export default instance;