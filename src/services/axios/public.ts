import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.BASE_URL;

export default axios.create({
  baseURL,
});
