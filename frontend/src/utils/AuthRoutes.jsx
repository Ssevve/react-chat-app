import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';

function AuthRoutes() {
  const loggedInUser = useSelector(selectUser);
  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
