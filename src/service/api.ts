import axios from 'axios';

const api = axios.create({
  baseURL: 'http://64.227.103.188:3333',
});

export default api;
