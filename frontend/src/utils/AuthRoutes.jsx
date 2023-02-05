import { Outlet, Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

function AuthRoutes() {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
