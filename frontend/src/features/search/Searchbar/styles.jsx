import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  border-top: 1px solid var(--clr-light-200);
  height: 4rem;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: var(--padding);
  display: flex;
`;

export const StyledInput = styled.input`
  padding: 1rem;
  border: none;
  font-size: 1rem;
  color: var(--clr-dark);
  padding-left: 2.75rem;
  align-self: stretch;
  flex: 1;
`;

export const ClearButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--padding);
  position: absolute;
  right: 0;
`;
