import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriends, fetchFriends } from 'features/friends/friendsSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';

import DropdownList from 'components/common/DropdownList';
import Friend from 'features/friends/Friend';

function FriendsList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector(selectFriends);
  const { connectedUsers } = useConnectedUsers();
  const online = friends.length ? friends.filter((friend) => friend._id in connectedUsers) : [];
  const offline = friends.length ? friends.filter((friend) => !(friend._id in connectedUsers)) : [];

  useEffect(() => {
    dispatch(fetchFriends({ userId: auth.user._id, accessToken: auth.accessToken }));
  }, []);

  return (
    <>
      <DropdownList title="Online">
        {online.length
          ? online.map((friend) => <Friend key={friend._id} friend={friend}></Friend>)
          : null}
      </DropdownList>
      <DropdownList title="Offline">
        {offline.length
          ? offline.map((friend) => <Friend key={friend._id} friend={friend}></Friend>)
          : null}
      </DropdownList>
    </>
  );
}

export default FriendsList;
