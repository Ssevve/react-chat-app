import { useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import styled from 'styled-components/macro';
import useAuth from 'hooks/useAuth';
import useChats from 'hooks/useChats';
import breakpoints from 'lib/breakpoints';

import Friends from './Friends';
import SearchResults from './SearchResults';
import Searchbar from './Searchbar';
import FriendInvites from './FriendInvites';

const StyledRightbar = styled.div`
  padding: var(--padding);
  border-left: 1px solid var(--clr-light-200);
  height: calc(100% - 4rem);
  width: 90%;
  max-width: 300px;
  position: fixed;
  top: 4rem;
  right: ${({ expanded }) => (expanded ? '0' : '-300px')};
  transition: right 0.1s ease-in-out;
  background: var(--clr-light-400);
  display: grid;
  grid-template-rows: auto 1fr auto;

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

const SearchToggleButton = styled.button`
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

function Rightbar({ expanded, friends, setFriends, friendInvites, setFriendInvites }) {
  const { auth } = useAuth();
  const { chats, setCurrentChat } = useChats();
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
    <StyledRightbar expanded={expanded}>
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
          <SearchResults results={results} setFriendInvites={setFriendInvites} />
        ) : (
          <>
            <FriendInvites
              friendInvites={friendInvites}
              setFriendInvites={setFriendInvites}
              setFriends={setFriends}
            />
            <Friends friends={friends} chats={chats} setCurrentChat={setCurrentChat} />
          </>
        )}
      </Section>
      {isSearching ? (
        <Searchbar forwardRef={queryRef} onChange={handleChange} />
      ) : (
        <SearchToggleButton type="button" onClick={() => setIsSearching(true)}>
          Add new friend
        </SearchToggleButton>
      )}
    </StyledRightbar>
  );
}

export default Rightbar;
