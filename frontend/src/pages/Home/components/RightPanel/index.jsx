import { useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from './SearchResults';
import Searchbar from './Searchbar';
import FriendInvites from 'features/friends/FriendInvites';
import { useSelector } from 'react-redux';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.large} {
    height: 100vh;
    top: 0;
    right: 0;
  }
`;

const Title = styled.h2`
  padding: var(--padding);
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ isSearching }) => (isSearching ? 'flex-end' : 'flex-start')};
  gap: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const Section = styled.section`
  margin-top: 1rem;
`;

const SearchToggle = styled.button`
  height: var(--bottom-row-height);
  background: var(--clr-light-400);
  color: var(--clr-accent);
  font-weight: 700;
  border-radius: var(--border-radius);
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: var(--clr-accent);
    color: var(--clr-light-400);
  }
`;

function RightPanel({ expanded }) {
  const auth = useSelector((state) => state.auth);
  const [results, setResults] = useState([]);
  const queryRef = useRef('');
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = async () => {
    if (queryRef.current.value.length < 3) {
      return setResults([]);
    }
    try {
      const res = await axios.get(`/users/search/${queryRef.current.value}`, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    setResults([]);
  };

  return (
    <StyledSidePanel anchor="right" expanded={expanded}>
      <Title isSearching={isSearching}>
        {isSearching ? (
          <>
            <CloseButton type="button" onClick={handleCloseSearch}>
              <IoMdClose size="2rem" />
            </CloseButton>
          </>
        ) : (
          'Friends'
        )}
      </Title>
      <Section>
        {isSearching ? (
          <SearchResults results={results} />
        ) : (
          <>
            <FriendInvites />
            <FriendsList />
          </>
        )}
      </Section>
      {isSearching ? (
        <Searchbar forwardRef={queryRef} onChange={handleChange} />
      ) : (
        <SearchToggle type="button" onClick={() => setIsSearching(true)}>
          Add new friend
        </SearchToggle>
      )}
    </StyledSidePanel>
  );
}

export default RightPanel;
