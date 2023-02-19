import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import { fetchChats } from 'features/chats/chatsSlice';

import SidePanel from 'components/SidePanel';
import Spinner from 'components/common/Spinner';
import ChatsList from 'features/chats/ChatsList';
import UserDropup from './UserDropup';
import Logo from 'components/common/Logo';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.medium} {
    grid-template-rows: 1fr 4rem;
    left: 0;
  }
`;

function LeftPanel({ expanded }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.chats.loading);

  useEffect(() => {
    // Fetch chats here, not in ChatsList component, to avoid an infinite loop
    dispatch(fetchChats());
  }, []);

  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo hideOnTablet={true} textColor="inverted" iconColor="accent" />
      {isLoading ? <Spinner text="Loading chats" /> : <ChatsList />}
      <UserDropup />
    </StyledSidePanel>
  );
}

export default LeftPanel;
