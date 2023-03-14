import { useDispatch, useSelector } from 'react-redux';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import { selectUser, logout } from 'features/auth/authSlice';
import { toggleSettings } from 'features/settings/settingsSlice';
import styleConstants from 'shared/styleConstants';

import SidePanel from 'components/SidePanel';
import ChatsList from 'features/chats/ChatsList';
import User from 'features/users/User';
import Button from 'components/common/Button';

const StyledSidePanel = styled(SidePanel)`
  grid-template-rows: 1fr ${styleConstants.pageFooterHeight};
  @media (min-width: ${breakpoints.medium}) {
    position: static;
  }
`;

const UserPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${styleConstants.padding400};
  background: ${({ theme }) => theme.background600};
`;

const Buttons = styled.section`
  display: flex;
`;

function LeftPanel({ expanded, forceExpandWidth, setExpandLeftPanel, setExpandRightPanel }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);

  const handleLogout = async () => dispatch(logout());
  const handleHidePanel = () => setExpandLeftPanel(false);

  const handleShowSettings = () => {
    handleHidePanel();
    setExpandRightPanel(false);
    dispatch(toggleSettings());
  };

  return (
    <StyledSidePanel
      anchor="left"
      onBackdropClick={handleHidePanel}
      forceExpandWidth={forceExpandWidth}
      expanded={expanded}
    >
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
