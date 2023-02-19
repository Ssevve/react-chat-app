import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: ${({ own }) => (own ? 'row-reverse' : 'row')};
  gap: 0.5rem;
  justify-self: ${({ own }) => (own ? 'flex-end' : 'flex-start')};
  max-width: 75%;
  padding: var(--padding);

  @media ${breakpoints.xl} {
    max-width: 50%;
  }
`;

export const Meta = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;
  align-items: center;
`;

export const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

export const Time = styled.span`
  font-size: 0.75rem;
`;

export const Content = styled.p`
  margin-top: 0.25rem;
  border-radius: var(--border-radius);
  background: ${({ own, theme }) => (own ? theme.accent : theme.tertiary)};
  color: ${({ own, theme }) => (own ? theme.primary : 'inherit')};
  padding: var(--padding);
`;
