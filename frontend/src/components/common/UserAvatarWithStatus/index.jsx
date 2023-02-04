import styled from 'styled-components';

import UserAvatar from '../UserAvatar';

import ConnectionStatus from './ConnectionStatus';

const AvatarWrapper = styled.div`
  position: relative;
  height: max-content;
`;

function UserAvatarWithStatus({ user }) {
  return user ? (
    <AvatarWrapper>
      <UserAvatar user={user} />
      <ConnectionStatus userId={user._id} />
    </AvatarWrapper>
  ) : null;
}

export default UserAvatarWithStatus;
