import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectFilteredSearchResults } from 'features/search/searchSlice';
import styles from 'shared/styles';
import breakpoints from 'shared/breakpoints';

import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from 'features/search/SearchResults';
import Searchbar from 'features/search/Searchbar';
import FriendInvites from 'features/friendInvites/FriendInvitesList';

const StyledSidePanel = styled(SidePanel)`
  @media (min-width: ${breakpoints.xl}) {
    position: static;
  }
`;

const Title = styled.h2`
  padding: ${styles.padding.l};
  font-size: 1.5rem;
  align-items: center;
  display: flex;
  justify-content: ${({ isLoading }) =>
    isLoading ? 'flex-end' : 'flex-start'};
  gap: ${styles.gap.l};
  color: ${({ theme }) => theme.text};
`;

const Section = styled.section`
  background: inherit;
  overflow-y: auto;
  display: grid;
  row-gap: ${styles.gap.l};
  align-content: start;
`;

function RightPanel({ expanded, forceExpandWidth, setExpandRightPanel }) {
  const searchResults = useSelector(selectFilteredSearchResults);

  const handleHidePanel = () => setExpandRightPanel(false);

  const sectionContent = searchResults ? (
    <SearchResults />
  ) : (
    <>
      <FriendInvites />
      <FriendsList setExpandRightPanel={setExpandRightPanel} />
    </>
  );

  return (
    <StyledSidePanel
      anchor="right"
      onBackdropClick={handleHidePanel}
      forceExpandWidth={forceExpandWidth}
      expanded={expanded}
    >
      <Title>{searchResults ? 'Search Friends' : 'Friends'}</Title>
      <Section>{sectionContent}</Section>
      <Searchbar />
    </StyledSidePanel>
  );
}

export default RightPanel;
