import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { fetchFriendInvites, fetchFriends } from 'features/friends/friendsSlice';

import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from 'features/search/SearchResults';
import Searchbar from 'features/search/Searchbar';
import FriendInvites from 'features/friends/FriendInvites';

const Title = styled.h2`
  padding: var(--padding);
  font-size: 1.5rem;
  line-height: 1;
  align-items: center;
  display: flex;
  justify-content: ${({ isLoading }) => (isLoading ? 'flex-end' : 'flex-start')};
  gap: 1rem;
`;

const Section = styled.section`
  padding: 1rem 0 0;
  overflow-y: auto;
  display: grid;
  row-gap: 1rem;
  align-content: ${({ isLoading }) => (isLoading ? 'center' : 'start')};
`;

function RightPanel({ expanded }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchFriendInvites(loggedInUser._id));
    dispatch(fetchFriends(loggedInUser._id));
  }, [loggedInUser._id]);

  return (
    <SidePanel anchor="right" expanded={expanded}>
      <Title>Friends</Title>
      <Section>
        {query ? (
          <SearchResults isLoading={isLoading} results={results} />
        ) : (
          <>
            <FriendInvites />
            <FriendsList />
          </>
        )}
      </Section>
      <Searchbar
        setIsLoading={setIsLoading}
        query={query}
        setQuery={setQuery}
        setResults={setResults}
      />
    </SidePanel>
  );
}

export default RightPanel;
