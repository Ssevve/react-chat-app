import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FiUserPlus } from 'react-icons/fi';
import { createFriendInvite } from 'features/friendInvites/friendInvitesSlice';

import Spinner from 'components/common/Spinner';
import User from 'features/users/User';
import Button from 'components/common/Button';
import styleConstants from 'shared/styleConstants';
import { selectFilteredSearchResults } from './searchSlice';

const Results = styled.ul`
  overflow: hidden;
  background: inherit;
`;

const Result = styled.li`
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${styleConstants.padding400};
  opacity: ${styleConstants.dimOpacity};
  &:hover {
    opacity: 1;
  }
`;

const NoUsers = styled.p`
  margin-left: 1rem;
`;

function SearchResults() {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectFilteredSearchResults);
  const isSearching = useSelector((state) => state.search.loading);

  const handleClick = (resultId) => dispatch(createFriendInvite(resultId));

  if (isSearching) return <Spinner text="Searching" />;
  if (searchResults.length === 0) return <NoUsers>No users found.</NoUsers>;
  return (
    <Results>
      {searchResults.map((result) => (
        <Result key={result._id}>
          <User user={result} />
          <Button
            variant="success"
            ariaLabel="Send friend invite"
            onClick={() => handleClick(result._id)}
          >
            <FiUserPlus aria-hidden="true" size="1.5rem" />
          </Button>
        </Result>
      ))}
    </Results>
  );
}

export default SearchResults;
