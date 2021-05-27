import axios from 'axios'
import Vue from 'vue'
import i18n from '@/locale'
import './mock';

const request = axios.create({
  baseURL: "/api",
  timeout: 3000
});

request.interceptors.request.use((config) => {
  return config;
}, function (error) {
  Vue.notify({
    title: i18n.t("axios.request.error"),
    text: error.message,
    type: "error",
    duration: 5000
  });
  return Promise.reject(error);
});

request.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, function (error) {
  console.log(error);
  Vue.notify({
    title: i18n.t("axios.response.error"),
    text: error.message,
    type: "error",
    duration: 5000
  });
  return Promise.reject(error);
});

export default request;