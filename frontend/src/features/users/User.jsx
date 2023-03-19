import styled from 'styled-components/macro';
import styles from 'shared/styles';

import UserAvatar from './UserAvatar';

const Wrapper = styled.section`
  display: flex;
  gap: ${styles.gap.m};
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

function User({ user, className }) {
  return (
    user && (
      <Wrapper className={className}>
        <UserAvatar showConnectionStatus user={user} />
        <Details>
          <Username>{user.username}</Username>
        </Details>
      </Wrapper>
    )
  );
}

export default User;
