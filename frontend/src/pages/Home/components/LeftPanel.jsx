import { useDispatch, useSelector } from 'react-redux';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import { selectUser } from 'features/auth/authSlice';
import { toggleSettings } from 'features/settings/settingsSlice';
import styleConstants from 'shared/styleConstants';

import SidePanel from 'components/SidePanel';
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

function LeftPanel({ expanded, setExpandLeftPanel, setExpandRightPanel }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      // Reset whole app state
      dispatch({ type: 'store/reset' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowSettings = () => {
    setExpandLeftPanel(false);
    setExpandRightPanel(false);
    dispatch(toggleSettings());
  };

  return (
    <StyledSidePanel anchor="left" expanded={expanded}>
      <Logo applyPadding colorIcon hideOnTablet />
      <ChatsList />
      <UserPanel>
        <User user={loggedInUser} />
        <Buttons>
          <Button dim aria-label="Settings" onClick={handleShowSettings}>
            <FiSettings aria-hidden="true" size="1.25rem" />
          </Button>
          <Button dim variant="danger" aria-label="Logout" onClick={handleLogout}>
            <FiLogOut aria-hidden="true" size="1.25rem" />
          </Button>
        </Buttons>
      </UserPanel>
    </StyledSidePanel>
  );
}

export default LeftPanel;
