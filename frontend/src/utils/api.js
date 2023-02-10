import axios from 'axios';

const get = (url, accessToken = '') => {
  return axios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const post = (url, data, accessToken = '') => {
  return axios.post(url, data, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const put = (url, data, accessToken = '') => {
  return axios.put(url, data, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const destroy = (url, accessToken = '') => {
  return axios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

export { get, post, put, destroy };
