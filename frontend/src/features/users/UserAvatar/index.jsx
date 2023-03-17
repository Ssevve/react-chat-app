import styled from 'styled-components/macro';

import avatarPlaceholder from 'assets/no-avatar.jpg';

import ConnectionStatus from './ConnectionStatus';

const AvatarWrapper = styled.div`
  position: relative;
  background: inherit;
  display: flex;
  height: max-content;
`;

const Avatar = styled.img`
  --size: 2.25rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
`;

function UserAvatar({ user, showConnectionStatus }) {
  return (
    user && (
      <AvatarWrapper>
        <Avatar
          src={user.avatar.url || avatarPlaceholder}
          alt={user.username}
        />
        {showConnectionStatus && <ConnectionStatus userId={user._id} />}
      </AvatarWrapper>
    )
  );
}

export default UserAvatar;
