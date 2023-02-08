import styled from 'styled-components/macro';
import { format } from 'timeago.js';
import breakpoints from 'utils/breakpoints';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';

import UserAvatar from 'components/common/UserAvatar';
import UserAvatarWithStatus from 'components/common/UserAvatarWithStatus';

const StyledMessage = styled.div`
  display: flex;
  flex-direction: ${({ own }) => (own ? 'row-reverse' : 'row')};
  gap: 0.5rem;
  justify-self: ${({ own }) => (own ? 'flex-end' : 'flex-start')};
  max-width: 75%;
  padding: var(--padding);

  @media ${breakpoints.large} {
    max-width: 50%;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const Time = styled.span`
  font-size: 0.75rem;
`;

const Content = styled.p`
  margin-top: 0.25rem;
  border-radius: var(--border-radius);
  background: ${({ own }) => (own ? 'var(--clr-accent)' : 'var(--clr-light-200)')};
  color: ${({ own }) => (own ? 'var(--clr-light-400)' : 'inherit')};
  padding: var(--padding);
`;

function Message({ message }) {
  const loggedInUser = useSelector(selectUser);
  const sender = message.sender?._id ? message.sender : loggedInUser;
  const ownMessage = sender._id === loggedInUser._id;
  return (
    message && (
      <StyledMessage own={ownMessage}>
        {ownMessage ? <UserAvatar user={sender} /> : <UserAvatarWithStatus user={sender} />}
        <div>
          <Meta>
            <Username>{ownMessage ? 'You' : sender.username}</Username>
            <Time>{format(message.createdAt)}</Time>
          </Meta>
          <Content own={ownMessage}>{message.content}</Content>
        </div>
      </StyledMessage>
    )
  );
}

export default Message;
