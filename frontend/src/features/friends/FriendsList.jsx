import { useSelector } from 'react-redux';
import { selectFriends } from 'features/friends/friendsSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';

import DropdownList from 'components/common/DropdownList';
import Friend from 'features/friends/Friend';

function FriendsList() {
  const friends = Object.values(useSelector(selectFriends));
  const { connectedUsers } = useConnectedUsers();
  const online = friends?.length ? friends.filter((friend) => friend._id in connectedUsers) : [];
  const offline = friends?.length
    ? friends.filter((friend) => !(friend._id in connectedUsers))
    : [];

  console.log(friends);

  return (
    <>
      <DropdownList title="Online">
        {online.map((friend) => (
          <Friend key={friend._id} friend={friend} />
        ))}
      </DropdownList>
      <DropdownList dim title="Offline">
        {offline.map((friend) => (
          <Friend key={friend._id} friend={friend} />
        ))}
      </DropdownList>
    </>
  );
}

export default FriendsList;
