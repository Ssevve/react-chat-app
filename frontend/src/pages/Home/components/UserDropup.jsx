import { useState } from 'react';
import styled from 'styled-components/macro';
import { FiChevronUp } from 'react-icons/fi';
import { FiLogOut, FiSettings } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { setShowSettings } from 'features/settings/settingsSlice';

import User from 'components/common/User';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: relative;
`;

const UserWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.tertiary};
  background: ${({ theme }) => theme.primary};
  position: relative;

  cursor: pointer;
  &:hover {
    background: ${({ showDropup, theme }) => (showDropup ? theme.accent : theme.tertiary)};
  }

  ${({ showDropup, theme }) =>
    showDropup && {
      borderTopColor: theme.accent,
      background: theme.accent,
      color: theme.primary,
    }};
`;

const StyledUser = styled(User)`
  color: ${({ showDropup, theme }) => (showDropup ? theme.primary : theme.inverted)};
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const DropupMenu = styled.ul`
  position: absolute;
  width: 100%;
  top: 0;
  transform: ${({ showDropup }) => (showDropup ? 'translateY(-100%)' : 'translateY(100%)')};
  list-style: none;
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  gap: var(--padding);
  transition: transform 0.1s ease-in-out;
  z-index: -1;
  border: 1px solid ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.primary};
`;

const DropupItem = styled.li`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.accent};
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.primary};
  }
`;

const DropupMenuButton = styled.button`
  background: inherit;
  color: inherit;
  font: inherit;
  padding: var(--padding);
  border-radius: var(--border-radius);
  flex: 1;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Arrow = styled.span`
  color: ${({ showDropup, theme }) => (showDropup ? theme.primary : theme.inverted)};
  transform: ${({ showDropup }) => (showDropup ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.1s ease-in-out;
  margin-right: var(--padding);
  position: absolute;
  right: 0;
  pointer-events: none;
`;

function UserDropup() {
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showDropup, setShowDropup] = useState(false);

  const handleLogout = async () => {
    try {
      // Reset whole app state
      dispatch({ type: 'store/reset' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowSettings = () => dispatch(setShowSettings(true));
  const handleShowDropup = () => setShowDropup((prev) => !prev);

  return (
    <Wrapper onMouseLeave={() => setShowDropup(false)}>
      <DropupMenu showDropup={showDropup}>
        <DropupItem>
          <DropupMenuButton onClick={handleShowSettings}>
            <FiSettings size="1.25rem" />
            Settings
          </DropupMenuButton>
        </DropupItem>
        <DropupItem>
          <DropupMenuButton onClick={handleLogout}>
            <FiLogOut size="1.25rem" />
            Logout
          </DropupMenuButton>
        </DropupItem>
      </DropupMenu>
      <UserWrapper showDropup={showDropup}>
        <StyledUser
          showDropup={showDropup}
          showConnectionStatus={false}
          user={loggedInUser}
          onClick={handleShowDropup}
        />
        <Arrow showDropup={showDropup}>
          <FiChevronUp size="1.5rem" />
        </Arrow>
      </UserWrapper>
    </Wrapper>
  );
}

export default UserDropup;
