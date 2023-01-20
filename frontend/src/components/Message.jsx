import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { AuthContext } from '../context/AuthContext';
import { format } from 'timeago.js';
import breakpoints from '../breakpoints';
import axios from 'axios';

import UserAvatar from './UserAvatar';

const StyledMessage = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-self: ${({ own }) => (own ? 'flex-end' : 'flex-start')};
  max-width: 75%; // change to large res.
  padding: var(--padding);
  z-index: -1;

  @media ${breakpoints.large} {
    max-width: 50%;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const Time = styled.span`
  font-size: 0.875rem;
`;

const Content = styled.p`
  border-radius: var(--border-radius);
  background: ${({ own }) => (own ? 'var(--clr-accent)' : 'var(--clr-light-200)')};
  color: ${({ own }) => (own ? 'var(--clr-light-400)' : 'inherit')};
  padding: var(--padding);
`;

function Message({ message }) {
  const { auth } = useContext(AuthContext);
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const fetchSender = async () => {
      try {
        const res = await axios.get(`/users/${message?.senderId}`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setSender(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSender();
  }, [message]);

  return (
    <StyledMessage own={message.senderId === auth.user._id}>
      <UserAvatar size="2.5rem" user={sender} />
      <div>
        <Meta>
          <Username>{sender?.username}</Username>
          <Time>{format(message.createdAt)}</Time>
        </Meta>
        <Content own={message.senderId === auth.user._id}>{message.content}</Content>
      </div>
    </StyledMessage>
  );
}

export default Message;
