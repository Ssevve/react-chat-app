import styled from 'styled-components/macro';

const Button = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 50%;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--padding);
  padding-right: var(--padding);
`;

export const ButtonsWrapper = styled(Wrapper)`
  gap: 1rem;
`;

export const AcceptButton = styled(Button)`
  color: ${({ theme }) => theme.success};
`;

export const DeclineButton = styled(Button)`
  color: ${({ theme }) => theme.danger};
`;
