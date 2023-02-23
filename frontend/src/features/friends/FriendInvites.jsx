import styled from 'styled-components';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import {
  selectFriendInvites,
  addFriendById,
  deleteFriendInviteById,
} from 'features/friends/friendsSlice';

import DropdownList from 'components/common/DropdownList';
import User from 'components/common/User';
import Button from 'components/common/Button';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
`;

function FriendInvites() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const friendInvites = useSelector(selectFriendInvites);
  const isLoading = useSelector((state) => state.friends.loading);

  const cancelInvite = async (invite) => {
    dispatch(deleteFriendInviteById(invite._id));
  };

  const acceptInvite = async (invite) => {
    const friendId =
      invite.receiver._id === loggedInUser._id ? invite.sender._id : invite.receiver._id;

    dispatch(addFriendById({ inviteId: invite._id, friendId }));
  };

  return (
    <>
      <DropdownList dim title="Friend invites">
        {friendInvites?.length
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
