import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { selectUser } from 'features/auth/authSlice';
import client from 'utils/api';

import { Wrapper, SearchIcon, StyledInput, ClearButton } from './styles';

function Searchbar({ setIsLoading, query, setQuery, setResults }) {
  const loggedInUser = useSelector(selectUser);

  const searchFriends = async () => {
    setIsLoading(true);
    try {
      const res = await client.get(`/users/search/${query}`);
      const filteredResults = res.data.filter((user) => user._id !== loggedInUser._id);
      setResults(filteredResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (!query) {
      return setResults(null);
    }
    const timeout = setTimeout(searchFriends, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const clearInput = () => setQuery('');
  const handleQueryChange = (e) => setQuery(e.target.value);

  return (
    <Wrapper>
      <SearchIcon>
        <BiSearch size="1.5rem" />
      </SearchIcon>
      <StyledInput
        aria-label="Search for friends by username"
        placeholder="Search friends"
        value={query}
        onChange={handleQueryChange}
      />
      {query && (
        <ClearButton onClick={clearInput}>
          <MdClear size="1rem" aria-label="Clear input"></MdClear>
        </ClearButton>
      )}
    </Wrapper>
  );
}

export default Searchbar;
