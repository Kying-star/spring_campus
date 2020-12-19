/**
 * 封装请求方法
 */
import axios from "./axios";

export function get(url, params = {}) {
  return axios.get(url, { params }).catch(error => {
    throw new Error(error);
  });
}

export function post(url, data = {}, config = {}) {
  return axios.post(url, data, config).catch(error => {
    throw new Error(error);
  });
}

export function patch(url, data = {}, config = {}) {
  return axios.patch(url, data, config).catch(error => {
    throw new Error(error);
  });
}

export function put(url, data) {
  return axios.put(url, data).catch(error => {
    throw new Error(error);
  });
}

export function del(url) {
  return axios.del(url).catch(error => {
    throw new Error(`[RWV] ApiService ${error}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  });
}
