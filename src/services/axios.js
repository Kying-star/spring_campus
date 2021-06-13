/*
 * @Author: your name
 * @Date: 2021-06-11 21:21:52
 * @LastEditTime: 2021-06-13 11:48:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /spring_campus/src/services/axios.js
 */
/**
 * axios配置
 */

import axios from "axios";
import { baseURL } from "./config";
axios.defaults.baseURL = baseURL;
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 6000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
