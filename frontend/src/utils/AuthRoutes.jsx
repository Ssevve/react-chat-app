import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoutes() {
  const auth = useSelector((state) => state.auth);
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
