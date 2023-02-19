import { useState } from 'react';
import styled from 'styled-components/macro';
import { FiChevronUp } from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';

import UserAvatar from 'components/common/UserAvatar';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import breakpoints from 'shared/breakpoints';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: relative;
  @media ${breakpoints.medium} {
    border-right: 1px solid ${({ theme }) => theme.tertiary};
  }
`;

const StyledButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: var(--padding);
  border: none;
  border-top: 1px solid ${({ theme }) => theme.tertiary};
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.inverted};
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

const DropupMenu = styled.ul`
  position: absolute;
  width: 100%;
  bottom: ${({ showDropup }) => (showDropup ? '4rem' : '0')};
  list-style: none;
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  gap: var(--padding);
  transition: bottom 0.1s ease-in-out;
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

const LogoutButton = styled.button`
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

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 0.5rem;
  gap: 0.25rem;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const StatusText = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
`;

const Arrow = styled.span`
  transform: ${({ showDropup }) => (showDropup ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.1s ease-in-out;
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
  return (
    <Wrapper onMouseLeave={() => setShowDropup(false)}>
      <DropupMenu showDropup={showDropup}>
        <DropupItem>
          <LogoutButton onClick={handleLogout}>
            <RiLogoutCircleLine size="1.25rem" />
            Logout
          </LogoutButton>
        </DropupItem>
      </DropupMenu>
      <StyledButton showDropup={showDropup} onClick={() => setShowDropup((prev) => !prev)}>
        <User>
          <UserAvatar showDropup={showDropup} user={loggedInUser} />
          <Info>
            <Username>{loggedInUser.username}</Username>
            <StatusText>{loggedInUser.statusText}</StatusText>
          </Info>
        </User>
        <Arrow showDropup={showDropup}>
          <FiChevronUp size="1.5rem" />
        </Arrow>
      </StyledButton>
    </Wrapper>
  );
}

export default UserDropup;
