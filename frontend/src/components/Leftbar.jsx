import { BsFillChatFill } from 'react-icons/bs';
import useChats from '../hooks/useChats';
import styled from 'styled-components/macro';
import breakpoints from '../lib/breakpoints';

import Chats from '../components/Chats';
import UserDropup from '../components/UserDropup';

const StyledLeftbar = styled.div`
  padding: var(--padding);
  border-right: 1px solid var(--clr-light-200);
  height: calc(100% - 4rem); // topbar height = 4rem
  width: 90%;
  max-width: 300px;
  position: fixed;
  top: 4rem;
  left: ${({ expanded }) => (expanded ? '0' : '-300px')};
  transition: left 0.1s ease-in-out;
  background: var(--clr-light-400);
  display: grid;
  grid-template-rows: auto 1fr auto;
  z-index: 1;

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

function Leftbar({ expanded }) {
  const { chats, currentChat, setCurrentChat } = useChats();
  return (
    <StyledLeftbar expanded={expanded}>
      <Logo>
        <BsFillChatFill />
        <LogoText>Chat App</LogoText>
      </Logo>
      <Chats chats={chats} currentChat={currentChat} setCurrentChat={setCurrentChat} />
      <UserDropup />
    </StyledLeftbar>
  );
}

export default Leftbar;
