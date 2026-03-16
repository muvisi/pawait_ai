import getConfig from 'next/config';
import axiosClient from '../axios';

const { publicRuntimeConfig } = getConfig();

export const userHeaders: any = axiosClient.defaults.headers;

export const userBaseUrl = publicRuntimeConfig.BASE_URL;
