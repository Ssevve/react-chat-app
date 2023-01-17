import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronUp } from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--padding);
  border-radius: var(--border-radius);
  border-top-left-radius: ${(props) => (props.showDropup ? 'initial' : 'var(--border-radius)')};
  border-top-right-radius: ${(props) => (props.showDropup ? 'initial' : 'var(--border-radius)')};
  border: 1px solid var(--clr-light-300);
  background: ${(props) => (props.showDropup ? 'var(--clr-accent)' : 'var(--clr-light-400)')};
  color: ${(props) => (props.showDropup ? 'var(--clr-light-400)' : 'var(--clr-dark)')};
  cursor: pointer;
  z-index: 1;
  &:hover {
    background: ${(props) => (props.showDropup ? 'var(--clr-accent)' : 'var(--clr-light-200)')};
  }
`;

const DropupMenu = styled.ul`
  list-style: none;
  background: var(--clr-light-400);
  border: ${(props) => (props.showDropup ? '1px solid var(--clr-accent)' : 'none')};
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  padding: ${(props) => (props.showDropup ? 'var(--padding)' : '0')};
  display: flex;
  flex-direction: column;
  gap: var(--padding);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  max-height: ${(props) => (props.showDropup ? 'auto' : '0')};
  z-index: -1;
  overflow: hidden;
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

const Avatar = styled.img`
  --size: 3rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
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

const Arrow = styled(FiChevronUp)`
  transform: ${(props) => (props.showDropup ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.1s ease-in-out;
`;

function UserDropup({ user }) {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [showDropup, setShowDropup] = useState(false);

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
    <StyledButton
      onMouseLeave={() => setShowDropup(false)}
      showDropup={showDropup}
      onClick={() => setShowDropup((prev) => !prev)}
    >
      <DropupMenu showDropup={showDropup}>
        <DropupItem>
          <LogoutButton onClick={handleLogout}>
            <RiLogoutCircleLine size="1.25rem" />
            Logout
          </LogoutButton>
        </DropupItem>
      </DropupMenu>
      <User>
        <Avatar src={user.avatar.url} alt={user.username} />
        <Info>
          <Username>{user.username}</Username>
          <StatusText>{user.statusText}</StatusText>
        </Info>
      </User>
      <Arrow showDropup={showDropup} size="1.5rem" />
    </StyledButton>
  );
}

export default UserDropup;
