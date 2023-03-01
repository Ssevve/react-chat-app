import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FiUserPlus } from 'react-icons/fi';
import { createFriendInvite } from 'features/friendInvites/friendInvitesSlice';
import { selectFilteredSearchResults } from './searchSlice';

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

const NoUsers = styled.p`
  margin-left: var(--padding);
`;

function SearchResults() {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectFilteredSearchResults);
  const isSearching = useSelector((state) => state.search.loading);

  const handleClick = (resultId) => dispatch(createFriendInvite(resultId));

  if (isSearching) return <Spinner text="Searching" />;
  if (!isSearching && searchResults.length === 0) return <NoUsers>No users found.</NoUsers>;
  return (
    <Results>
      {searchResults.map((result) => (
        <Result key={result._id}>
          <User user={result} />
          <Button
            variant="success"
            aria-label="Send friend invite"
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
