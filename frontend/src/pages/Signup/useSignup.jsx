import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/auth/signup', {
        username: data.username,
        password: data.password,
      });
      navigate('/login');
    } catch (err) {
      if (err.response.status === 409) setUsernameTaken(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, usernameTaken, isLoading, signup };
};

export default useSignup;
