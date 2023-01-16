import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function GuestRoutes() {
  const { auth } = useContext(AuthContext);
  return auth ? <Navigate to="/" /> : <Outlet />;
}

export default GuestRoutes;
