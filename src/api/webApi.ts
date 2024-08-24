import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' }
});

function checkUsername(username: string) {
  return axiosInstance.get<{ valid: boolean }>('/user/signup/check/username', { params: { value: username } });
}

function checkEmail(email: string) {
  return axiosInstance.get<{ valid: boolean }>('/user/signup/check/email', { params: { value: email } });
}

export { checkUsername, checkEmail };