import { BsFillChatFill } from 'react-icons/bs';
import styled from 'styled-components/macro';
import useChats from 'hooks/useChats';
import breakpoints from 'lib/breakpoints';

import SidePanel from './SidePanel';
import Chats from './Chats';
import UserDropup from './UserDropup';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.medium} {
    height: 100vh;
    top: 0;
    left: 0;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  padding: var(--padding);
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--clr-accent);
`;

const LogoText = styled.h1`
  color: var(--clr-dark);
  font-size: 1.5rem;
`;

function LeftPanel({ expanded }) {
  const { chats, currentChat, setCurrentChat } = useChats();
  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo>
        <BsFillChatFill />
        <LogoText>Chat App</LogoText>
      </Logo>
      <Chats chats={chats} currentChat={currentChat} setCurrentChat={setCurrentChat} />
      <UserDropup />
    </StyledSidePanel>
  );
}

export default LeftPanel;
