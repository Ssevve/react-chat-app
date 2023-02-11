import { useState } from 'react';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

import SidePanel from 'components/SidePanel';
import FriendsList from 'features/friends/FriendsList';
import SearchResults from '../features/search/SearchResults';
import Searchbar from '../features/search/Searchbar';
import FriendInvites from 'features/friends/FriendInvites';

const StyledSidePanel = styled(SidePanel)`
  @media ${breakpoints.xl} {
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

const Section = styled.section`
  padding: 1rem 0 0;
  overflow-y: auto;
  display: grid;
  row-gap: 1rem;
  align-content: start;
`;

function RightPanel({ expanded }) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // const [loading, setLoading] = useState(false);

  return (
    <StyledSidePanel anchor="right" expanded={expanded}>
      <Title>Friends</Title>
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
      <Searchbar setIsSearching={setIsSearching} setResults={setResults} />
    </StyledSidePanel>
  );
}

export default RightPanel;
