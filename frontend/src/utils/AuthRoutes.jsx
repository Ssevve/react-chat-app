import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AuthRoutes() {
  const { auth } = useContext(AuthContext);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
