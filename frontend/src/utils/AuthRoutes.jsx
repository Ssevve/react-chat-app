import useAuth from '../hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom';

function AuthRoutes() {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
