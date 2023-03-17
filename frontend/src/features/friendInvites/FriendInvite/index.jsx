import styled from 'styled-components/macro';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { addFriendById } from 'features/friends/friendsSlice';
import { deleteFriendInvite } from 'features/friendInvites/friendInvitesSlice';

import User from 'features/users/User';
import Button from 'components/common/Button';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: inherit;
`;

const Buttons = styled.div`
  display: flex;
`;

function FriendInvite({ invite }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const deletingFriendInvite = useSelector(
    (state) => state.friendInvites.deletingFriendInvite
  );

  const cancelInvite = (friendInvite) =>
    dispatch(deleteFriendInvite(friendInvite._id));

  const acceptInvite = (friendInvite) => {
    const friendId =
      friendInvite.receiver._id === loggedInUser._id
        ? friendInvite.sender._id
        : friendInvite.receiver._id;

    dispatch(addFriendById(friendId));
    dispatch(deleteFriendInvite(invite._id));
  };

  return (
    <Wrapper>
      <User
        events={false}
        user={
          invite.receiver._id === loggedInUser._id
            ? invite.sender
            : invite.receiver
        }
      />
      <Buttons>
        {invite.sender._id !== loggedInUser._id && (
          <Button
            ariaLabel="Accept invite"
            variant="success"
            disabled={deletingFriendInvite}
            onClick={() => acceptInvite(invite)}
          >
            <FiCheckCircle aria-hidden="true" size="1.5rem" />
          </Button>
        )}
        <Button
          ariaLabel="Cancel invite"
          disabled={deletingFriendInvite}
          variant="danger"
          onClick={() => cancelInvite(invite)}
        >
          <FiXCircle aria-hidden="true" size="1.5rem" />
        </Button>
      </Buttons>
    </Wrapper>
  );
}

export default FriendInvite;
