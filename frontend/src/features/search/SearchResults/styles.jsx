import styled from 'styled-components/macro';
import { ReactComponent as Loader } from 'assets/loader.svg';

export const Results = styled.ul`
  overflow: hidden;
`;

export const Result = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InviteButton = styled.button`
  color: var(--clr-accent);
  border: 1px solid currentColor;
  margin-right: var(--padding);
  background: none;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  padding: 0.15rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: var(--hover-accent);
  }
`;

export const StyledLoader = styled(Loader)`
  width: 100%;
  height: 2rem;
`;
