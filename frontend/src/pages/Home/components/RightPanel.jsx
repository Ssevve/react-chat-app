import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { fetchFriends } from 'features/friends/friendsSlice';
import { fetchFriendInvites } from 'features/friendInvites/friendInvitesSlice';
import { selectFilteredSearchResults } from 'features/search/searchSlice';
import { selectFriendInvites } from 'features/friendInvites/friendInvitesSlice';
import { selectFriends } from 'features/friends/friendsSlice';
import styleConstants from 'shared/styleConstants';

import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from 'features/search/SearchResults';
import Searchbar from 'features/search/Searchbar';
import FriendInvites from 'features/friendInvites/FriendInvites';
import Spinner from 'components/common/Spinner';

const Title = styled.h2`
  padding: ${styleConstants.paddingL};
  font-size: 1.5rem;
  align-items: center;
  display: flex;
  justify-content: ${({ isLoading }) => (isLoading ? 'flex-end' : 'flex-start')};
  gap: ${styleConstants.gapXL};
  color: ${({ theme }) => theme.text};
`;

const Section = styled.section`
  background: inherit;
  overflow-y: auto;
  display: grid;
  row-gap: ${styleConstants.gapXL};
  align-content: ${({ fetchingFriends }) => (fetchingFriends ? 'center' : 'start')};
`;

function RightPanel({ expanded }) {
  const friends = useSelector(selectFriends);
  const friendInvites = useSelector(selectFriendInvites);
  const friendsLoading = useSelector((state) => state.friends.loading);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const results = useSelector(selectFilteredSearchResults);
  const isLoading = useSelector((state) => state.search.loading);

  useEffect(() => {
    dispatch(fetchFriendInvites(loggedInUser._id));
    dispatch(fetchFriends(loggedInUser._id));
  }, [loggedInUser._id]);

  const fetchingFriends = !friends && !friendInvites && friendsLoading;

  const sectionContent =
    results.length > 0 ? (
      <SearchResults isLoading={isLoading} results={results} />
    ) : (
      <>
        <FriendInvites />
        <FriendsList />
      </>
    );

  return (
    <SidePanel anchor="right" expanded={expanded}>
      <Title>{results.length > 0 ? 'Search Friends' : 'Friends'}</Title>
      <Section fetchingFriends={fetchingFriends}>
        {fetchingFriends ? <Spinner text="Loading friends" /> : sectionContent}
      </Section>
      <Searchbar />
    </SidePanel>
  );
}

export default RightPanel;
