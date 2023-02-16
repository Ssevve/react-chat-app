import { IoMdAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { createFriendInvite } from 'features/friends/friendsSlice';

import Spinner from 'components/common/Spinner';
import User from 'components/common/User';

import { Results, Result, InviteButton, NoUsers } from './styles';

function SearchResults({ isLoading, results }) {
  const dispatch = useDispatch();

  const handleClick = async (resultId) => {
    dispatch(createFriendInvite(resultId));
  };

  if (isLoading) return <Spinner text="Searching" />;
  if (!results) return null;
  if (results.length === 0) return <NoUsers>No users found.</NoUsers>;
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
