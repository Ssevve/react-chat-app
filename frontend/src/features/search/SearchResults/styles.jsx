import styled from 'styled-components/macro';

export const Results = styled.ul`
  overflow: hidden;
`;

export const Result = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InviteButton = styled.button`
  color: ${({ theme }) => theme.accent};
  margin-right: var(--padding);
  background: none;
  display: flex;
  cursor: pointer;
  border: none;
  border-radius: 50%;
`;

export const NoUsers = styled.p`
  margin-left: var(--padding);
`;
