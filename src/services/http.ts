import axios, { AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';
import config from '../config';
import { alert, getSession } from '../utils';

const http = axios.create({ baseURL: config.api.baseURL });

http.interceptors.request.use(
  (request) => {
    const { access_token = '' } = getSession();
    const headers = request.headers as AxiosRequestHeaders;
    headers['Authorization'] = access_token ? `Bearer ${access_token}` : '';
    request.headers = headers;
    return request;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    const response = err?.response || ({} as AxiosResponse);
    const { data } = response || {};
    if (data?.detail) {
      alert.error(data?.detail);
    }
    return Promise.reject(response);
  }
);

export default http;