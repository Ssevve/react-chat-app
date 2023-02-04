import useAuth from 'hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom';

function GuestRoutes() {
  const { auth } = useAuth();
  return auth ? <Navigate to="/" /> : <Outlet />;
}

export default GuestRoutes;
