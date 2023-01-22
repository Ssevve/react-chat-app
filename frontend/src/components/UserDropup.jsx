import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FiChevronUp } from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import useClickOutside from '../hooks/useClickOutside';

import UserAvatar from './UserAvatar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const StyledButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: var(--padding);
  border-radius: var(--border-radius);
  border-top-left-radius: ${({ showDropup }) => (showDropup ? 'initial' : 'var(--border-radius)')};
  border-top-right-radius: ${({ showDropup }) => (showDropup ? 'initial' : 'var(--border-radius)')};
  border: 1px solid
    ${({ showDropup }) => (showDropup ? 'var(--clr-accent)' : 'var(--clr-light-300)')};
  background: ${({ showDropup }) => (showDropup ? 'var(--clr-accent)' : 'var(--clr-light-400)')};
  color: ${({ showDropup }) => (showDropup ? 'var(--clr-light-400)' : 'var(--clr-dark)')};
  cursor: pointer;
  &:hover {
    background: ${({ showDropup }) => (showDropup ? 'var(--clr-accent)' : 'var(--clr-light-200)')};
  }
`;

const DropupMenu = styled.ul`
  list-style: none;
  background: var(--clr-light-400);
  border: ${({ showDropup }) => (showDropup ? '1px solid var(--clr-accent)' : 'none')};
  padding: ${({ showDropup }) => (showDropup ? 'var(--padding)' : '0')};
  display: flex;
  flex-direction: column;
  gap: var(--padding);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  max-height: ${({ showDropup }) => (showDropup ? 'auto' : '0')};
`;

const DropupItem = styled.li`
  background: var(--clr-light-400);
  color: var(--clr-accent);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  &:hover {
    background: var(--clr-accent);
    color: var(--clr-light-400);
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
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
`;

const Arrow = styled.span`
  transform: ${({ showDropup }) => (showDropup ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.1s ease-in-out;
`;

function UserDropup() {
  const dropupRef = useRef(null);
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [showDropup, setShowDropup] = useState(false);
  useClickOutside(dropupRef, () => setShowDropup(false));

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      setAuth(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Wrapper onMouseLeave={() => setShowDropup(false)} ref={dropupRef}>
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
          <UserAvatar size="3rem" showDropup={showDropup} user={auth.user} />
          <Info>
            <Username>{auth.user.username}</Username>
            <StatusText>{auth.user.statusText}</StatusText>
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
