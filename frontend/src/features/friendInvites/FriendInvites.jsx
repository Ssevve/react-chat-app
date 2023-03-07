import styled from 'styled-components';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { addFriendById } from 'features/friends/friendsSlice';
import { selectFriendInvites, deleteFriendInvite } from 'features/friendInvites/friendInvitesSlice';

import DropdownList from 'components/common/DropdownList';
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

function FriendInvites() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const friendInvites = useSelector(selectFriendInvites);
  const isLoading = useSelector((state) => state.friends.loading);

  const cancelInvite = (invite) => dispatch(deleteFriendInvite(invite._id));
  const acceptInvite = (invite) => {
    const friendId =
      invite.receiver._id === loggedInUser._id ? invite.sender._id : invite.receiver._id;

    dispatch(addFriendById(friendId));
    dispatch(deleteFriendInvite(invite._id));
  };

  return (
    <>
      <DropdownList dim title={`Friend invites (${friendInvites.length})`}>
        {friendInvites.length
          ? friendInvites.map((invite) => (
              <Wrapper key={invite._id}>
                <User
                  events={false}
                  user={invite.receiver._id === loggedInUser._id ? invite.sender : invite.receiver}
                />
                <Buttons>
                  {invite.sender._id !== loggedInUser._id && (
                    <Button
                      variant="success"
                      disabled={isLoading}
                      onClick={() => acceptInvite(invite)}
                    >
                      <FiCheckCircle size="1.5rem" />
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => cancelInvite(invite)}>
                    <FiXCircle size="1.5rem" />
                  </Button>
                </Buttons>
              </Wrapper>
            ))
          : null}
      </DropdownList>
    </>
  );
}

export default FriendInvites;
