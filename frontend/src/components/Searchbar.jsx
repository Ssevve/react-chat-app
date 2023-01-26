import debounce from 'lodash.debounce';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: var(--padding);
  height: 1.5rem;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--clr-light-200);
  font-size: 1rem;
  color: var(--clr-dark);
  flex: 1;
  padding-left: 2.25rem;
`;

function Searchbar({ onChange, forwardRef }) {
  const debounceHandleChange = useMemo(() => debounce(onChange, 300), []);

  return (
    <Wrapper>
      <SearchIcon>
        <BiSearch size="1.5rem" />
      </SearchIcon>
      <StyledInput
        aria-label="Username"
        placeholder="Search by username"
        autoFocus
        ref={forwardRef}
        onChange={debounceHandleChange}
      />
    </Wrapper>
  );
}

export default Searchbar;
