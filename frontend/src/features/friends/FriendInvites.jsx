import styled from 'styled-components/macro';
import { BsCheck } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';

import DropdownList from 'components/common/DropdownList';
import User from 'components/common/User';
import { selectUser, selectAccessToken } from 'features/auth/authSlice';
import {
  selectFriendInvites,
  addFriendById,
  deleteFriendInviteById,
} from 'features/friends/friendsSlice';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--padding);
  padding-right: var(--padding);
`;

const Button = styled.button`
  background: none;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: background 0.1s ease-in-out;
  padding: 0.15rem;
`;

const AcceptButton = styled(Button)`
  color: green;
  &:hover {
    background: var(--hover-success);
  }
`;

const DeclineButton = styled(Button)`
  color: var(--clr-danger);
  &:hover {
    background: var(--hover-danger);
  }
`;

function FriendInvites() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const friendInvites = useSelector(selectFriendInvites);
  const isLoading = useSelector((state) => state.friends.loading);

  const cancelInvite = async (invite) => {
    dispatch(deleteFriendInviteById({ inviteId: invite._id, accessToken }));
  };

  const acceptInvite = async (invite) => {
    const friendId =
      invite.receiver._id === loggedInUser._id ? invite.sender._id : invite.receiver._id;

    dispatch(addFriendById({ inviteId: invite._id, friendId, accessToken }));
  };

  return (
    <>
      <DropdownList title="Friend invites">
        {friendInvites.length
          ? friendInvites.map((invite) => (
              <Wrapper key={invite._id}>
                <User
                  events={false}
                  user={invite.receiver._id === loggedInUser._id ? invite.sender : invite.receiver}
                />
                <Wrapper>
                  {invite.sender._id !== loggedInUser._id ? (
                    // Multi click, loading
                    // Disable on click
                    <AcceptButton
                      type="button"
                      disabled={isLoading}
                      onClick={() => acceptInvite(invite)}
                    >
                      <BsCheck size="1.5rem" />
                    </AcceptButton>
                  ) : null}
                  <DeclineButton type="button" onClick={() => cancelInvite(invite)}>
                    <IoMdClose size="1.5rem" />
                  </DeclineButton>
                </Wrapper>
              </Wrapper>
            ))
          : null}
      </DropdownList>
    </>
  );
}

export default FriendInvites;
