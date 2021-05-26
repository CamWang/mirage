import axios from 'axios';
import Vue from 'vue';
import './mock';

const request = axios.create({
  baseURL: "/api",
  timeout: 3000
});

request.interceptors.request.use((config) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, function (error) {
  console.log(error);
  Vue.notify({
    title: "Request Fail",
    text: error.message,
    type: "error"
  });
  return Promise.reject(error);
});

export default request;