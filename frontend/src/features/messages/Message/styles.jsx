import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: ${({ own }) => (own ? 'row-reverse' : 'row')};
  justify-self: ${({ own }) => (own ? 'flex-end' : 'flex-start')};
  gap: ${styleConstants.gapM};
  color: ${({ theme }) => theme.text};
  width: 75%;
  background: inherit;

  @media ${breakpoints.xl} {
    width: 50%;
  }
`;

export const Meta = styled.div`
  display: flex;
  gap: ${styleConstants.gapS};
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
  background: ${({ own, theme }) => (own ? theme.primary : theme.background500)};
  color: ${({ own, theme }) => (own ? theme.ownMessageText : theme.text)};
  padding: ${styleConstants.paddingS};
  word-wrap: break-word;
  max-width: 500px; // TODO: temp fix: messages overflow, try to make it better
`;
