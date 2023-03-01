import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlusCircle, FiUser } from 'react-icons/fi';
import { createFriendInvite } from 'features/friendInvites/friendInvitesSlice';
import { selectFriendIds } from 'features/friends/friendsSlice';

import Spinner from 'components/common/Spinner';
import User from 'components/common/User';
import Button from 'components/common/Button';
import styleConstants from 'shared/styleConstants';

const Results = styled.ul`
  overflow: hidden;
  background: inherit;
`;

const Result = styled.li`
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${styleConstants.paddingL};
  opacity: ${styleConstants.dimOpacity};
  &:hover {
    opacity: 1;
  }
`;

const FriendIcon = styled(FiUser)`
  margin-right: 0.5rem;
`;

const NoUsers = styled.p`
  margin-left: var(--padding);
`;

function SearchResults({ isLoading, results }) {
  const dispatch = useDispatch();
  const friendIds = useSelector(selectFriendIds);

  const handleClick = (resultId) => dispatch(createFriendInvite(resultId));

  if (isLoading) return <Spinner text="Searching" />;
  if (!results) return null;
  if (results.length === 0) return <NoUsers>No users found.</NoUsers>;
  return (
    <Results>
      {results.map((result) => (
        <Result key={result._id}>
          <User user={result} />
          {friendIds.includes(result._id) ? (
            <FriendIcon size="1.5rem" />
          ) : (
            <Button
              variant="success"
              aria-label="Send friend invite"
              onClick={() => handleClick(result._id)}
            >
              <FiPlusCircle aria-hidden="true" size="1.5rem" />
            </Button>
          )}
        </Result>
      ))}
    </Results>
  );
}

export default SearchResults;
