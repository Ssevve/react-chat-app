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

import { Wrapper, ButtonsWrapper, AcceptButton, DeclineButton } from './styles';

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
      <DropdownList title="Friend invites">
        {friendInvites?.length
          ? friendInvites.map((invite) => (
              <Wrapper key={invite._id}>
                <User
                  events={false}
                  user={invite.receiver._id === loggedInUser._id ? invite.sender : invite.receiver}
                />
                <ButtonsWrapper>
                  {invite.sender._id !== loggedInUser._id && (
                    <AcceptButton
                      type="button"
                      disabled={isLoading}
                      onClick={() => acceptInvite(invite)}
                    >
                      <FiCheckCircle size="1.75rem" />
                    </AcceptButton>
                  )}
                  <DeclineButton type="button" onClick={() => cancelInvite(invite)}>
                    <FiXCircle size="1.75rem" />
                  </DeclineButton>
                </ButtonsWrapper>
              </Wrapper>
            ))
          : null}
      </DropdownList>
    </>
  );
}

export default FriendInvites;
