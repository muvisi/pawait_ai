import axios from './axios/public';

export const login = async (payload: {
  username_or_email: string;
  password: string;
}) => {
  const data = await axios.post(`users/login`, payload).then((res) => {
    const response = res.data;
    return response;
  });
  return data;
};

export const signUp = async (payload: {
  email: string;
  username: string;
  password: any;
}) => {
  const data = await axios.post(`users/signup`, payload).then((res) => {
    const response = res.data;
    return response;
  });
  return data;
};
