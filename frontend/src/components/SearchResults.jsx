import styled from 'styled-components/macro';

import User from './User';

const Results = styled.ul``;

function SearchResults({ results }) {
  return (
    <Results>
      {results?.map((result) => (
        <li key={result._id}>
          <User user={result} />
        </li>
      ))}
    </Results>
  );
}

export default SearchResults;
