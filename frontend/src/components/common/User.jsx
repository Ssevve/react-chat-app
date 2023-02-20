import styled from 'styled-components/macro';

import UserAvatarWithConnectionStatus from './UserAvatarWithConnectionStatus';
import UserAvatar from './UserAvatar';

const Button = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  background: none;
  border: none;
  gap: 1rem;
  padding: var(--padding);
  transition: background 0.1s ease-in-out;
  color: ${({ theme }) => theme.inverted};
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

function User({ user, onClick, showConnectionStatus, className }) {
  return (
    user && (
      <Button type="button" onClick={onClick} className={className}>
        {showConnectionStatus ? (
          <UserAvatarWithConnectionStatus user={user} />
        ) : (
          <UserAvatar user={user} />
        )}
        <Details>
          <Username>{user.username}</Username>
          {user.statusText ? <StatusText>{user.statusText}</StatusText> : null}
        </Details>
      </Button>
    )
  );
}

User.defaultProps = {
  showConnectionStatus: true,
};

export default User;
