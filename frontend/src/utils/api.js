import axios from 'axios';

const get = (url, accessToken = '') => {
  return axios.get(process.env.REACT_APP_API_URL + url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const post = (url, data, accessToken = '') => {
  return axios.post(process.env.REACT_APP_API_URL + url, data, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const put = (url, data, accessToken = '') => {
  return axios.put(process.env.REACT_APP_API_URL + url, data, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const destroy = (url, accessToken = '') => {
  return axios.delete(process.env.REACT_APP_API_URL + url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

export { get, post, put, destroy };
