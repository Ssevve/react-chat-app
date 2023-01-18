import { BsFillChatFill } from 'react-icons/bs';
import styled from 'styled-components';
import breakpoints from '../breakpoints';

import UserDropup from '../components/UserDropup';

const StyledLeftbar = styled.div`
  padding: var(--padding);
  border-right: 1px solid var(--clr-light-200);
  height: calc(100vh - 57px); // topbar height = 57px
  width: 90%;
  max-width: 300px;
  position: absolute;
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

const Chats = styled.section``;

function Leftbar({ expanded }) {
  return (
    <StyledLeftbar expanded={expanded}>
      <Logo>
        <BsFillChatFill />
        <LogoText>Chat App</LogoText>
      </Logo>
      <Chats />
      <UserDropup />
    </StyledLeftbar>
  );
}

export default Leftbar;
