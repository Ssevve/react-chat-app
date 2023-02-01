import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';

import DropdownList from './DropdownList';
import User from './User';

function Friends({ friends, chats, setCurrentChat }) {
  const { auth } = useAuth();
  const [onlineFriends, setOnlineFriends] = useState(null);
  const [offlineFriends, setOfflineFriends] = useState(null);

  useEffect(() => {
    setOnlineFriends(friends);
    setOfflineFriends(friends);
    console.log(friends);
  }, [friends]);

  const handleFriendClick = (friend) => {
    const chatsMembers = chats.map((chat) => chat.members);
    const indexOfChat = chatsMembers.findIndex(
      (members) => members[0]._id === friend._id || members[1]._id === friend._id,
    );

    if (indexOfChat === -1) {
      const newChat = {
        _id: uuidv4(),
        members: [auth.user, friend],
      };

      return setCurrentChat(newChat);
    }

    setCurrentChat(chats[indexOfChat]);
  };

  return (
    <>
      <DropdownList title="Online">
        {onlineFriends &&
          onlineFriends.map((friend) => (
            <User onClick={() => handleFriendClick(friend)} key={friend._id} user={friend} />
          ))}
      </DropdownList>
      <DropdownList title="Offline">
        {offlineFriends &&
          offlineFriends.map((friend) => (
            <User onClick={() => handleFriendClick(friend)} key={friend._id} user={friend} />
          ))}
      </DropdownList>
    </>
  );
}

export default Friends;
