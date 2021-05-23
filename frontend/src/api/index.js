import axios from 'axios';
import '../mock';

const request = axios.create({
  baseURL: "/api",
  timeout: 3000
});

request.interceptors.request.use((config) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default request;