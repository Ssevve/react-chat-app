import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { selectAccessToken } from 'features/auth/authSlice';
import { get } from 'utils/api';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  border-top: 1px solid var(--clr-light-200);
  height: 4rem;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: var(--padding);
  display: flex;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border: none;
  font-size: 1rem;
  color: var(--clr-dark);
  padding-left: 2.75rem;
  align-self: stretch;
  flex: 1;
`;

const ClearButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--padding);
  position: absolute;
  right: 0;
`;

function Searchbar({ setIsSearching, setResults }) {
  const accessToken = useSelector(selectAccessToken);
  const [query, setQuery] = useState('');

  const searchFriends = async () => {
    try {
      const res = await get(`/users/search/${query}`, accessToken);
      setResults(res.data);
    } catch (err) {
      console.error(err);
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
