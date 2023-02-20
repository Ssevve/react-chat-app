import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.tertiary};
  height: 4rem;
  background: ${({ theme }) => theme.primary};
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: var(--padding);
  display: flex;
  color: ${({ theme }) => theme.inverted};
`;

export const StyledInput = styled.input`
  padding: 1rem;
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.inverted};
  padding-left: 2.75rem;
  align-self: stretch;
  flex: 1;
  background: inherit;
  &::placeholder {
    color: ${({ theme }) => theme.inverted};
    opacity: 0.6;
  }
`;

export const ClearButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--padding);
  position: absolute;
  right: 0;
  color: ${({ theme }) => theme.inverted};
`;
