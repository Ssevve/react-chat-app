import styled from 'styled-components/macro';
import { BsCheck } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

import DropdownList from './DropdownList';
import User from './User';

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

function FriendInvites({ friendInvites }) {
  const { auth } = useAuth();

  return (
    <>
      <DropdownList title="Friend invites">
        {friendInvites?.map((invite) => (
          <Wrapper>
            <User
              events={false}
              key={invite._id}
              user={invite.receiver._id === auth.user._id ? invite.sender : invite.receiver}
            />
            <Wrapper>
              {invite.sender._id !== auth.user._id && (
                <AcceptButton type="button">
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
