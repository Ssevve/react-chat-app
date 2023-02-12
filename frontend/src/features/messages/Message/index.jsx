import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';

import UserAvatar from 'components/common/UserAvatar';
import UserAvatarWithStatus from 'components/common/UserAvatarWithConnectionStatus';

import { StyledDiv, Meta, Username, Time, Content } from './styles';

function Message({ message }) {
  const loggedInUser = useSelector(selectUser);
  const sender = message.sender?._id ? message.sender : loggedInUser;
  const ownMessage = sender._id === loggedInUser._id;
  return (
    message && (
      <StyledDiv own={ownMessage}>
        {ownMessage ? <UserAvatar user={sender} /> : <UserAvatarWithStatus user={sender} />}
        <div>
          <Meta>
            <Username>{ownMessage ? 'You' : sender.username}</Username>
            <Time>{format(message.createdAt)}</Time>
          </Meta>
          <Content own={ownMessage}>{message.content}</Content>
        </div>
      </StyledDiv>
    )
  );
}

export default Message;
