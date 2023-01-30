import useAuth from '../hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom';
import { ChatsContextProvider } from '../context/ChatsContext';

function AuthRoutes() {
  const { auth } = useAuth();
  return auth ? (
    <ChatsContextProvider>
      <Outlet />
    </ChatsContextProvider>
  ) : (
    <Navigate to="/login" />
  );
}

export default AuthRoutes;
