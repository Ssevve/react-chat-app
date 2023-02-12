import styled from 'styled-components/macro';

const Button = styled.button`
  background: none;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: background 0.1s ease-in-out;
  padding: 0.15rem;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--padding);
  padding-right: var(--padding);
`;

export const AcceptButton = styled(Button)`
  color: green;
  &:hover {
    background: var(--hover-success);
  }
`;

export const DeclineButton = styled(Button)`
  color: var(--clr-danger);
  &:hover {
    background: var(--hover-danger);
  }
`;
