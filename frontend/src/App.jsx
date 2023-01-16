import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import AuthRoutes from './utils/AuthRoutes';
import GuestRoutes from './utils/GuestRoutes';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

const StyledApp = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </StyledApp>
  );
}

export default App;
