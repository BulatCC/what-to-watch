import axios, {AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './Token';

const BACKEND_URL = 'https://10.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 4000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
