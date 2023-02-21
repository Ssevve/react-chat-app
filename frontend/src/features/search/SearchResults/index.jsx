import { useDispatch } from 'react-redux';
import { FiPlusCircle } from 'react-icons/fi';
import { createFriendInvite } from 'features/friends/friendsSlice';

import Spinner from 'components/common/Spinner';
import User from 'components/common/User';

import { Results, Result, InviteButton, AddIcon, NoUsers } from './styles';

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
            <FiPlusCircle size="1.75rem" />
          </InviteButton>
        </Result>
      ))}
    </Results>
  );
}

export default SearchResults;
