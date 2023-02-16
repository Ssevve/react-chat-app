import axios from 'axios';

let store;

export const injectStore = (_store) => {
  store = _store;
};

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

client.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${store.getState().auth.accessToken}`;
  return config;
});

export default client;
