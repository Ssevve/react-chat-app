import styled from 'styled-components/macro';

import avatarPlaceholder from 'assets/no-avatar.jpg';

const Avatar = styled.img`
  --size: 2.25rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
`;

function UserAvatar({ user, className }) {
  return user ? (
    <Avatar className={className} src={user.avatar.url || avatarPlaceholder} alt={user.username} />
  ) : null;
}

export default UserAvatar;
