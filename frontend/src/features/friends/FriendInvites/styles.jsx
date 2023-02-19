import styled from 'styled-components/macro';

const Button = styled.button`
  background: none;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  cursor: pointer;
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
  color: ${({ theme }) => theme.success};
  &:hover {
    background: ${({ theme }) => theme.successHover};
  }
`;

export const DeclineButton = styled(Button)`
  color: ${({ theme }) => theme.danger};
  &:hover {
    background: ${({ theme }) => theme.dangerHover};
  }
`;
