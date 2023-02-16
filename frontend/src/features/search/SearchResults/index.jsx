import { IoMdAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import { createFriendInvite } from 'features/friends/friendsSlice';

import Spinner from 'components/common/Spinner';
import User from 'components/common/User';

import { Results, Result, InviteButton } from './styles';

function SearchResults({ isSearching, results }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const handleClick = async (resultId) => {
    dispatch(createFriendInvite({ friendId: resultId, accessToken }));
  };

  if (isSearching) return <Spinner text="Searching" />;
  if (results.length === 0) return <p>No users found.</p>;
  return (
    <Results>
      {results.map((result) => (
        <Result key={result._id}>
          <User events={false} user={result} />
          <InviteButton type="button" onClick={() => handleClick(result._id)}>
            <IoMdAdd size="1.5rem" />
          </InviteButton>
        </Result>
      ))}
    </Results>
  );
}

export default SearchResults;
