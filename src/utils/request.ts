import axios from 'axios';
import k from '../utils/constants';

const request = axios.create({
  baseURL: k.SERVER_BASE_URL,
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
});

export default request;
