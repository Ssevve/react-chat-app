import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { selectAccessToken, selectUser } from 'features/auth/authSlice';
import { get } from 'utils/api';

import { Wrapper, SearchIcon, StyledInput, ClearButton } from './styles';

function Searchbar({ setLoading, setIsSearching, setResults }) {
  const accessToken = useSelector(selectAccessToken);
  const loggedInUser = useSelector(selectUser);
  const [query, setQuery] = useState('');

  const searchFriends = async () => {
    setLoading(true);
    try {
      const res = await get(`/users/search/${query}`, accessToken);
      const filteredResults = res.data.filter((user) => user._id !== loggedInUser._id);
      setResults(filteredResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (!query) {
      setIsSearching(false);
      return setResults([]);
    }
    setIsSearching(true);
    const timeout = setTimeout(searchFriends, 250);

    return () => {
      clearTimeout(timeout);
    };
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
      {query ? (
        <ClearButton onClick={clearInput}>
          <MdClear size="1rem" aria-label="Clear input"></MdClear>
        </ClearButton>
      ) : null}
    </Wrapper>
  );
}

export default Searchbar;
