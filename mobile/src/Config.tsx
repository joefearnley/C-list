const urls = {
    local: 'localhost:8000',
    test: 'c-lister.herokuapp.com'
};

const host = window.location.hostname;
const baseUrl = host === 'localhost' ? urls.local : urls.test;
const apiUrl = `http://${baseUrl}/api/v1`;

const config = {
    API_URL: apiUrl
};

export default config;