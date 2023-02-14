import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { HiMenu } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import breakpoints from 'utils/breakpoints';

import User from 'components/common/User';
import { selectUser } from 'features/auth/authSlice';

const Header = styled.header`
  width: 100vw;
  border-bottom: 1px solid var(--clr-light-200);
  padding: var(--padding);
  display: grid;
  align-content: center;
  justify-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  height: 4rem;

  @media ${breakpoints.medium} {
    grid-template-columns: auto 1fr auto;
    width: calc(100vw - 18.75rem);
    position: relative;
    left: 18.75rem;
  }

  @media ${breakpoints.xl} {
    width: calc(100vw - 37.5rem);
    position: relative;
    left: 18.75rem;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: var(--padding);
`;

const LeftPanelButton = styled(Button)`
  justify-self: start;
  @media ${breakpoints.medium} {
    display: none;
  }
`;

const RightPanelButton = styled(Button)`
  grid-column: 3/4;
  justify-self: end;
  @media ${breakpoints.xl} {
    display: none;
  }
`;

function Topbar({ setExpandLeftPanel, setExpandRightPanel }) {
  const loggedInUser = useSelector(selectUser);
  const currentChat = useSelector(selectCurrentChat);
  const [chatPartner, setChatPartner] = useState(null);

  useEffect(() => {
    if (!currentChat) return;
    const partner = currentChat.members.find((member) => member._id !== loggedInUser._id);
    setChatPartner(partner);
  }, [currentChat, loggedInUser._id]);

  const handleLeftPanelExpand = () => {
    setExpandRightPanel(false);
    setExpandLeftPanel((prev) => !prev);
  };

  const handleRightPanelExpand = () => {
    setExpandLeftPanel(false);
    setExpandRightPanel((prev) => !prev);
  };

  return (
    <Header>
      <LeftPanelButton type="button" onClick={handleLeftPanelExpand}>
        <HiMenu size="1.5rem" />
      </LeftPanelButton>
      {currentChat ? (
        <div>
          <User user={chatPartner} events={false} />
        </div>
      ) : null}
      <RightPanelButton type="button" onClick={handleRightPanelExpand}>
        <FaUserFriends size="1.5rem" />
      </RightPanelButton>
    </Header>
  );
}

export default Topbar;
