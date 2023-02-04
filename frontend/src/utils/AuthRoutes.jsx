import { Outlet, Navigate } from 'react-router-dom';
import { ChatsContextProvider } from 'context/ChatsContext';
import useAuth from 'hooks/useAuth';

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
