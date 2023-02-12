import { IoMdAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import { createFriendInvite } from 'features/friends/friendsSlice';

import User from 'components/common/User';

import { Results, Result, InviteButton, StyledLoader } from './styles';

function SearchResults({ loading, results }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const handleClick = async (resultId) => {
    dispatch(createFriendInvite({ friendId: resultId, accessToken }));
  };

  const resultsReady = results.length && !loading;

  return (
    <Results>
      {loading ? <StyledLoader stroke="var(--clr-light-200)" /> : null}
      {resultsReady
        ? results.map((result) => (
            <Result key={result._id}>
              <User events={false} user={result} />
              <InviteButton type="button" onClick={() => handleClick(result._id)}>
                <IoMdAdd size="1.5rem" />
              </InviteButton>
            </Result>
          ))
        : null}
    </Results>
  );
}

export default SearchResults;
