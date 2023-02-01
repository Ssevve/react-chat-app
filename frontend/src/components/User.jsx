import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import useConnectedUsers from '../hooks/useConnectedUsers';

import UserAvatar from './UserAvatar';

const Button = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  background: none;
  border: none;
  gap: 1rem;
  padding: var(--padding);
  transition: background 0.1s ease-in-out;
  border-radius: var(--border-radius);
  pointer-events: ${({ events }) => (events ? 'auto' : 'none')};
  cursor: pointer;
  &:hover {
    background: var(--clr-light-200);
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const ConnectionStatus = styled.span`
  --size: 1rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  border: 2px solid var(--clr-light-400);
  background: ${({ online }) => (online ? 'green' : 'red')};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Details = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const StatusText = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
`;

function User({ user, events = true, onClick }) {
  const { connectedUsers } = useConnectedUsers();
  const [isOnline, setIsOnline] = useState(false);
  const usersLoaded = user && connectedUsers;

  useEffect(() => {
    setIsOnline(user._id in connectedUsers);
  }, [connectedUsers, user._id]);

  return (
    usersLoaded && (
      <Button type="button" onClick={onClick} events={events}>
        <AvatarWrapper>
          <UserAvatar user={user} />
          <ConnectionStatus online={isOnline} />
        </AvatarWrapper>
        <Details>
          <Username>{user.username}</Username>
          {user.statusText && <StatusText>{user.statusText}</StatusText>}
        </Details>
      </Button>
    )
  );
}

export default User;
