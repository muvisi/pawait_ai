import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.BASE_URL;

// Create an instance of Axios
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Set Authorization header if available
    // const access = auth_key;
    // if (access) {
    //   config.headers.Authorization = `Bearer ${access}`;
    // }
    const accessToken = localStorage.getItem('accessToken');

    const access = accessToken;
    config.headers.Authorization = `Bearer ${access}` || '';

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res?.status === 401) {
      // localStorage.removeItem('auth');
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('refreshToken');
      // window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
