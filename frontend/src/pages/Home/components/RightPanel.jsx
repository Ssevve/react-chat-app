import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectFilteredSearchResults } from 'features/search/searchSlice';
import styleConstants from 'shared/styleConstants';

import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from 'features/search/SearchResults';
import Searchbar from 'features/search/Searchbar';
import FriendInvites from 'features/friendInvites/FriendInvites';

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
  align-content: start;
`;

function RightPanel({ expanded }) {
  const searchResults = useSelector(selectFilteredSearchResults);

  const sectionContent = searchResults ? (
    <SearchResults />
  ) : (
    <>
      <FriendInvites />
      <FriendsList />
    </>
  );

  return (
    <SidePanel anchor="right" expanded={expanded}>
      <Title>{searchResults ? 'Search Friends' : 'Friends'}</Title>
      <Section>{sectionContent}</Section>
      <Searchbar />
    </SidePanel>
  );
}

export default RightPanel;
