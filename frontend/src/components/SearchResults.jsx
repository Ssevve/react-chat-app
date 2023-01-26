import styled from 'styled-components/macro';

import User from './User';

const Results = styled.ul`
  overflow: hidden;
`;

function SearchResults({ results }) {
  return (
    <Results>
      {results?.map((result) => (
        <li key={result._id}>
          <User events={false} user={result} />
        </li>
      ))}
    </Results>
  );
}

export default SearchResults;
