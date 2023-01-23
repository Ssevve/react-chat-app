import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import DropdownList from './DropdownList';
import Friend from './Friend';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

function Friends({ friends, chats, setCurrentChat }) {
  const [onlineFriends, setOnlineFriends] = useState(null);
  const [offlineFriends, setOfflineFriends] = useState(null);

  useEffect(() => {
    setOnlineFriends(friends);
    setOfflineFriends(friends);
    console.log(friends);
  }, [friends]);

  return (
    <Wrapper>
      <DropdownList title="Online">
        {onlineFriends?.map((friend) => (
          <Friend key={friend._id} chats={chats} setCurrentChat={setCurrentChat} friend={friend} />
        ))}
      </DropdownList>
      <DropdownList title="Offline">
        {offlineFriends?.map((friend) => (
          <Friend key={friend._id} chats={chats} setCurrentChat={setCurrentChat} friend={friend} />
        ))}
      </DropdownList>
    </Wrapper>
  );
}

export default Friends;
