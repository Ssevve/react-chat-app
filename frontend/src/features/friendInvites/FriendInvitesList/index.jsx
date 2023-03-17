import { useSelector } from 'react-redux';
import DropdownList from 'components/common/DropdownList';
import { selectFriendInvites } from '../friendInvitesSlice';

import FriendInvite from '../FriendInvite';

function FriendInvites() {
  const friendInvites = useSelector(selectFriendInvites);

  return (
    <DropdownList dim title={`Friend invites (${friendInvites.length})`}>
      {friendInvites.length
        ? friendInvites.map((invite) => (
            <FriendInvite key={invite._id} invite={invite} />
          ))
        : null}
    </DropdownList>
  );
}

export default FriendInvites;
