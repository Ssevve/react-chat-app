import styled from 'styled-components/macro';

import UserAvatarWithStatus from '../UserAvatarWithStatus';

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
  return user ? (
    <Button type="button" onClick={onClick} events={events}>
      <UserAvatarWithStatus user={user} />
      <Details>
        <Username>{user.username}</Username>
        {user.statusText ? <StatusText>{user.statusText}</StatusText> : null}
      </Details>
    </Button>
  ) : null;
}

export default User;
