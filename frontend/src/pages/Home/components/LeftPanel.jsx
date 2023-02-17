import { useSelector } from 'react-redux';
import { BsFillChatFill } from 'react-icons/bs';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

import SidePanel from 'components/SidePanel';
import Spinner from 'components/common/Spinner';
import ChatsList from 'features/chats/ChatsList';
import UserDropup from './UserDropup';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.medium} {
    height: 100vh;
    top: 0;
    left: 0;
    border: none;
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
    color: var(--clr-light-400);
    background: var(--clr-accent);
  }
`;

const LogoText = styled.h1`
  color: var(--clr-dark);
  font-size: 1.5rem;
  @media ${breakpoints.medium} {
    color: var(--clr-light-400);
  }
`;

function LeftPanel({ expanded }) {
  const isLoading = useSelector((state) => state.chats.loading);
  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo>
        <LogoText>Chat App</LogoText>
        <BsFillChatFill />
      </Logo>
      {isLoading ? <Spinner text="Loading chats..." /> : <ChatsList />}
      <UserDropup />
    </StyledSidePanel>
  );
}

export default LeftPanel;
