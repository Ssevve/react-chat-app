import styled from 'styled-components/macro';

import UserAvatar from '../UserAvatar';

import ConnectionStatus from './ConnectionStatus';

const AvatarWrapper = styled.div`
  position: relative;
  background: inherit;
  display: flex;
  height: max-content;
`;

function UserAvatarWithConnectionStatus({ user }) {
  return user ? (
    <AvatarWrapper>
      <UserAvatar user={user} />
      <ConnectionStatus userId={user._id} />
    </AvatarWrapper>
  ) : null;
}

export default UserAvatarWithConnectionStatus;
