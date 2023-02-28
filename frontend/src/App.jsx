import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import themes from 'features/settings/themes';

import AuthRoutes from 'components/AuthRoutes';
import GuestRoutes from 'components/GuestRoutes';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Signup from 'pages/Signup';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.background500};
    line-height: 1;
  }
 
  #root {
    min-height: 100vh;
  }
`;

const StyledApp = styled.div`
  min-height: 100vh;
`;

function App() {
  const theme = useSelector((state) => state.settings.theme);
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
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
    </ThemeProvider>
  );
}

export default App;
