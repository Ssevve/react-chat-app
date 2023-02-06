import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GuestRoutes() {
  const auth = useSelector((state) => state.auth);
  return auth.user ? <Navigate to="/" /> : <Outlet />;
}

export default GuestRoutes;
