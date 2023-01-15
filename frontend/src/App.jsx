import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Login from './pages/Login';

const StyledApp = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
