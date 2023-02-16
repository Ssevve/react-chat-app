import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectAccessToken } from 'features/auth/authSlice';
import { fetchFriendInvites, fetchFriends } from 'features/friends/friendsSlice';

import Spinner from 'components/common/Spinner';
import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from 'features/search/SearchResults';
import Searchbar from 'features/search/Searchbar';
import FriendInvites from 'features/friends/FriendInvites';

const Title = styled.h2`
  padding: var(--padding);
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ isSearching }) => (isSearching ? 'flex-end' : 'flex-start')};
  gap: 1rem;
`;

const Section = styled.section`
  padding: 1rem 0 0;
  overflow-y: auto;
  display: grid;
  row-gap: 1rem;
  align-content: start;
`;

function RightPanel({ expanded }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const authData = {
    userId: loggedInUser._id,
    accessToken,
  };

  useEffect(() => {
    dispatch(fetchFriendInvites(authData));
    dispatch(fetchFriends(authData));
  }, []);

  return (
    <SidePanel anchor="right" expanded={expanded}>
      <Title>Friends</Title>
      <Section>
        {isTyping ? (
          <SearchResults isSearching={isSearching} results={results} />
        ) : (
          <>
            <FriendInvites />
            <FriendsList />
          </>
        )}
      </Section>
      <Searchbar
        setIsSearching={setIsSearching}
        setIsTyping={setIsTyping}
        setResults={setResults}
      />
    </SidePanel>
  );
}

export default RightPanel;
