import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://customer-ticket-support-system.firebaseio.com/'
})

export default instance;