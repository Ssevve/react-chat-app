import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
import useDebounce from './useDebounce';
import { clearSearchResults, searchFriends } from 'features/search/searchSlice';

import { Wrapper, SearchIcon, StyledInput, ClearButton } from './styles';

function Searchbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);

  const handleQueryChange = (e) => setQuery(e.target.value);
  const clearQuery = () => setQuery('');

  // Debounce search
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchFriends(debouncedQuery));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedQuery]);

  return (
    <Wrapper>
      <StyledInput
        type="text"
        aria-label="Search for friends by username"
        placeholder="Search friends"
        value={query}
        onChange={handleQueryChange}
      />
      {query ? (
        <ClearButton aria-label="Clear input" onClick={clearQuery}>
          <FiX size="1.25rem" aria-hidden="true" />
        </ClearButton>
      ) : (
        <SearchIcon aria-hidden="true" size="1.25rem" />
      )}
    </Wrapper>
  );
}

export default Searchbar;
