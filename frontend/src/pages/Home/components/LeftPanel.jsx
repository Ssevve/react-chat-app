import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import { fetchChats } from 'features/chats/chatsSlice';
import { selectUser } from 'features/auth/authSlice';
import { toggleSettings } from 'features/settings/settingsSlice';
import styleConstants from 'shared/styleConstants';

import SidePanel from 'components/SidePanel';
import Spinner from 'components/common/Spinner';
import ChatsList from 'features/chats/ChatsList';
import Logo from 'components/common/Logo';
import User from 'components/common/User';
import Button from 'components/common/Button';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.medium} {
    grid-template-rows: 1fr auto;
    left: 0;
  }
`;

const UserPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${styleConstants.paddingL};
  background: ${({ theme }) => theme.background600};
`;

const Buttons = styled.section`
  display: flex;
`;

function LeftPanel({ expanded }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.chats.loading);
  const loggedInUser = useSelector(selectUser);

  useEffect(() => {
    // Fetch chats here, not in ChatsList component, to avoid an infinite loop
    dispatch(fetchChats());
  }, []);

  const handleLogout = async () => {
    try {
      // Reset whole app state
      dispatch({ type: 'store/reset' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowSettings = () => dispatch(toggleSettings());

  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo applyPadding colorIcon hideOnTablet />
      {isLoading ? <Spinner text="Loading chats" /> : <ChatsList />}
      <UserPanel>
        <User user={loggedInUser} />
        <Buttons>
          <Button aria-label="Settings" onClick={handleShowSettings}>
            <FiSettings aria-hidden="true" size="1.25rem" />
          </Button>
          <Button variant="danger" aria-label="Logout" onClick={handleLogout}>
            <FiLogOut aria-hidden="true" size="1.25rem" />
          </Button>
        </Buttons>
      </UserPanel>
    </StyledSidePanel>
  );
}

export default LeftPanel;
