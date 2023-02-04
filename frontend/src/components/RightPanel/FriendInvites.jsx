import styled from 'styled-components/macro';
import { BsCheck } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import useAuth from 'hooks/useAuth';
import axios from 'axios';

import DropdownList from '../common/DropdownList';
import User from '../common/User';

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

function FriendInvites({ friendInvites, setFriends, setFriendInvites }) {
  const { auth } = useAuth();

  const acceptInvite = async (invite) => {
    const newFriendId =
      invite.receiver._id === auth.user._id ? invite.sender._id : invite.receiver._id;

    try {
      const res = await axios.put(
        `/users/addFriend/${newFriendId}`,
        { inviteId: invite._id },
        {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );

      setFriends(res.data);

      const newFriendInvites = friendInvites.filter((inv) => inv._id !== invite._id);
      setFriendInvites(newFriendInvites);

      if (res.status === 200)
        await axios.delete(`/invites/${invite._id}`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DropdownList title="Friend invites">
        {friendInvites &&
          friendInvites.map((invite) => (
            <Wrapper key={invite._id}>
              <User
                events={false}
                user={invite.receiver._id === auth.user._id ? invite.sender : invite.receiver}
              />
              <Wrapper>
                {invite.sender._id !== auth.user._id && (
                  <AcceptButton type="button" onClick={() => acceptInvite(invite)}>
                    <BsCheck size="1.5rem" />
                  </AcceptButton>
                )}
                <DeclineButton type="button">
                  <IoMdClose size="1.5rem" />
                </DeclineButton>
              </Wrapper>
            </Wrapper>
          ))}
      </DropdownList>
    </>
  );
}

export default FriendInvites;
