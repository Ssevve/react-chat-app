import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';

import UserAvatarWithConnectionStatus from './UserAvatarWithConnectionStatus';

const Wrapper = styled.section`
  display: flex;
  gap: ${styleConstants.gapL};
  background: inherit;
`;

const Details = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

const StatusText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: ${styleConstants.dimOpacity};
`;

function User({ user, className }) {
  return (
    user && (
      <Wrapper className={className}>
        <UserAvatarWithConnectionStatus user={user} />
        <Details>
          <Username>{user.username}</Username>
          {user.statusText ? <StatusText>{user.statusText}</StatusText> : null}
        </Details>
      </Wrapper>
    )
  );
}

export default User;
