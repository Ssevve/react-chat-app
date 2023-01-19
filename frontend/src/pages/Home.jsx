import { useState } from 'react';
import styled from 'styled-components/macro';

import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import Chatbox from '../components/Chatbox';
import Rightbar from '../components/Rightbar';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const [expandLeftbar, setExpandLeftbar] = useState('');
  const [expandRightbar, setExpandRightbar] = useState('');
  return (
    <Wrapper>
      <Topbar setExpandLeftbar={setExpandLeftbar} setExpandRightbar={setExpandRightbar} />
      <Main>
        <Leftbar expanded={expandLeftbar} />
        <Chatbox />
        <Rightbar expanded={expandRightbar} />
      </Main>
    </Wrapper>
  );
}

export default Home;
