import styled from 'styled-components';

import avatarPlaceholder from '../assets/no-avatar.jpg';

const Avatar = styled.img`
  --size: ${({ size }) => size};
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
`;

function UserAvatar({ user, size, className, ...rest }) {
  return (
    <Avatar
      size={size}
      className={className}
      src={user.avatar.url || avatarPlaceholder}
      alt={user.username}
    />
  );
}

export default UserAvatar;
