import { useState } from 'react';
import axios from 'axios';
import useAuth from 'hooks/useAuth';

const useLogin = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/auth/login', {
        username: data.username,
        password: data.password,
      });
      setAuth(res.data);
    } catch (err) {
      if (err.response.status === 401) return setUnauthorized(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, setError, unauthorized, setUnauthorized, isLoading, login };
};

export default useLogin;
