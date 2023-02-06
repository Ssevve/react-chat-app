import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { HiMenu } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import breakpoints from 'utils/breakpoints';

import User from 'components/common/UserAvatarWithStatus';

const Header = styled.header`
  width: 100vw;
  border-bottom: 1px solid var(--clr-light-200);
  padding: var(--padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  height: 4rem;

  @media ${breakpoints.medium} {
    width: calc(100vw - 300px);
    position: relative;
    left: 300px;
  }

  @media ${breakpoints.large} {
    width: calc(100vw - 600px);
    position: relative;
    left: 300px;
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
  @media ${breakpoints.medium} {
    display: none;
  }
`;

const RightPanelButton = styled(Button)`
  @media ${breakpoints.large} {
    display: none;
  }
`;

// const CurrentChat = styled.span`
//   font-size: 1.5rem;
//   line-height: 1;
//   padding-block: var(--padding);
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

function Topbar({ setExpandLeftPanel, setExpandRightPanel }) {
  const auth = useSelector((state) => state.auth);
  const currentChat = useSelector(selectCurrentChat);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    if (!currentChat) return;
    const chatPartner = currentChat.members.find((member) => member._id !== auth.user._id);
    setFriend(chatPartner);
  }, [currentChat, auth.user._id]);

  console.log(friend);

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
        // <CurrentChat>
        <User user={friend} events={false} />
      ) : // </CurrentChat>
      null}
      <RightPanelButton type="button" onClick={handleRightPanelExpand}>
        <FaUserFriends size="1.5rem" />
      </RightPanelButton>
    </Header>
  );
}

export default Topbar;
