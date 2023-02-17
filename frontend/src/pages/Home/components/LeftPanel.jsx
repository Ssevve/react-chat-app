import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

import SidePanel from 'components/SidePanel';
import Spinner from 'components/common/Spinner';
import ChatsList from 'features/chats/ChatsList';
import UserDropup from './UserDropup';
import Logo from 'components/common/Logo';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.medium} {
    grid-template-rows: 1fr 4rem;
    left: 0;
    border: none;
  }
`;

function LeftPanel({ expanded }) {
  const isLoading = useSelector((state) => state.chats.loading);
  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo hideOnTablet={true} textColor="var(--clr-dark)" iconColor="var(--clr-accent)" />
      {isLoading ? <Spinner text="Loading chats..." /> : <ChatsList />}
      <UserDropup />
    </StyledSidePanel>
  );
}

export default LeftPanel;
