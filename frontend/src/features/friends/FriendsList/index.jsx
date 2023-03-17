import { useSelector } from 'react-redux';
import { selectFriends } from 'features/friends/friendsSlice';
import { selectConnectedUsers } from 'features/users/usersSlice';

import DropdownList from 'components/common/DropdownList';
import Friend from 'features/friends/Friend';

function FriendsList({ setExpandRightPanel }) {
  const friends = Object.values(useSelector(selectFriends));
  const connectedUsers = useSelector(selectConnectedUsers);
  const online = friends.filter((friend) => friend._id in connectedUsers);
  const offline = friends.filter((friend) => !(friend._id in connectedUsers));

  return (
    <>
      <DropdownList title={`Online (${online.length})`}>
        {online.length
          ? online.map((friend) => (
              <Friend
                key={friend._id}
                friend={friend}
                setExpandRightPanel={setExpandRightPanel}
              />
            ))
          : null}
      </DropdownList>
      <DropdownList dim title={`Offline (${offline.length})`}>
        {offline.length
          ? offline.map((friend) => (
              <Friend
                key={friend._id}
                friend={friend}
                setExpandRightPanel={setExpandRightPanel}
              />
            ))
          : null}
      </DropdownList>
    </>
  );
}

export default FriendsList;
