/**
 * axios配置
 */

import axios from "axios";
import { baseURL, token } from "./config";
axios.defaults.baseURL = baseURL;
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 6000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      token: token
    };
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
