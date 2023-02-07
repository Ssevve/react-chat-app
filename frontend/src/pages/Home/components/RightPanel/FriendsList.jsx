import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChat, selectAllChats } from 'features/chats/chatsSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';

import DropdownList from 'components/common/DropdownList';
import User from 'components/common/User';

function FriendsList({ friends }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const chats = useSelector(selectAllChats);
  const { connectedUsers } = useConnectedUsers();
  const [onlineFriends, setOnlineFriends] = useState(null);
  const [offlineFriends, setOfflineFriends] = useState(null);

  useEffect(() => {
    if (!friends) return;
    const online = friends.filter((friend) => friend._id in connectedUsers);
    const offline = friends.filter((friend) => !(friend._id in connectedUsers));

    setOnlineFriends(online);
    setOfflineFriends(offline);
  }, [friends, connectedUsers]);

  const handleFriendClick = (friend) => {
    let selectedChat = {};

    if (chats.length) {
      selectedChat = chats.find((chat) => chat.members.includes(friend._id));
    }

    if (!selectedChat.members) selectedChat.members = [auth.user._id, friend._id];

    dispatch(setCurrentChat(selectedChat));
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

export default FriendsList;
