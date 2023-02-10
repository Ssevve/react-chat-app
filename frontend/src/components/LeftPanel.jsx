import { BsFillChatFill } from 'react-icons/bs';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

import SidePanel from 'components/SidePanel';
import ChatsList from 'features/chats/ChatsList';
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
  @media ${breakpoints.medium} {
    border-bottom: 1px solid var(--clr-light-200);
  }
`;

const LogoText = styled.h1`
  color: var(--clr-dark);
  font-size: 1.5rem;
`;

function LeftPanel({ expanded }) {
  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo>
        <BsFillChatFill />
        <LogoText>Chat App</LogoText>
      </Logo>
      <ChatsList />
      <UserDropup />
    </StyledSidePanel>
  );
}

export default LeftPanel;
