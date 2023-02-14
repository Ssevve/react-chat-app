import { useSelector } from 'react-redux';
import { selectFriends } from 'features/friends/friendsSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';

import DropdownList from 'components/common/DropdownList';
import Friend from 'features/friends/Friend';

function FriendsList() {
  const friends = useSelector(selectFriends);
  const { connectedUsers } = useConnectedUsers();
  const online = friends.length ? friends.filter((friend) => friend._id in connectedUsers) : [];
  const offline = friends.length ? friends.filter((friend) => !(friend._id in connectedUsers)) : [];

  return (
    <>
      <DropdownList title="Online">
        {online.length ? online.map((friend) => <Friend key={friend._id} friend={friend} />) : null}
      </DropdownList>
      <DropdownList title="Offline">
        {offline.length
          ? offline.map((friend) => <Friend key={friend._id} friend={friend} />)
          : null}
      </DropdownList>
    </>
  );
}

export default FriendsList;
