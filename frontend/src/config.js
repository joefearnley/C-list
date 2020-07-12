import axios from 'axios';

const config = {
    API_URL: process.env.REACT_APP_API_URL,
    API_AUTH_URL: process.env.REACT_APP_API_AUTH_URL
};

const defaultOptions = {
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
};

let instance = axios.create(defaultOptions);
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    console.log('getting token...');
    console.log(token);

    config.headers.Authorization =  token ? `Token ${token}` : '';
    return config;
});

export default config;