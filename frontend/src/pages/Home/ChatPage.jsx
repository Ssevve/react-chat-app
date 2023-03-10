import { useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import breakpoints from 'shared/breakpoints';

import Topbar from 'components/Topbar';
import LeftPanel from 'components/LeftPanel';
import RightPanel from 'components/RightPanel';
import MessagesBox from 'features/messages/MessagesBox';
import WelcomeMessage from 'components/WelcomeMessage';
import Settings from 'features/settings/Settings';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.background300};
  color: ${({ theme }) => theme.text};
  overflow-x: hidden;
`;

const MidSection = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  flex: 1;
`;

function ChatPage() {
  const showSettings = useSelector((state) => state.settings.showSettings);
  const currentChat = useSelector(selectCurrentChat);
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  return (
    <Wrapper>
      <Topbar
        expandLeftPanel={expandLeftPanel}
        expandRightPanel={expandRightPanel}
        setExpandLeftPanel={setExpandLeftPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <Main expandRightPanel={expandRightPanel}>
        <LeftPanel
          setExpandLeftPanel={setExpandLeftPanel}
          setExpandRightPanel={setExpandRightPanel}
          anchor="left"
          expanded={expandLeftPanel}
          forceExpandWidth={breakpoints.medium}
        />
        <MidSection>
          {currentChat ? <MessagesBox /> : <WelcomeMessage />}
          {showSettings && <Settings />}
        </MidSection>
        <RightPanel
          expanded={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
          forceExpandWidth={breakpoints.xl}
        />
      </Main>
    </Wrapper>
  );
}

export default ChatPage;
