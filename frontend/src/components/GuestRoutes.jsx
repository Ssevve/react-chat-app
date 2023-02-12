import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';

function GuestRoutes() {
  const loggedInUser = useSelector(selectUser);
  return loggedInUser ? <Navigate to="/" /> : <Outlet />;
}

export default GuestRoutes;
