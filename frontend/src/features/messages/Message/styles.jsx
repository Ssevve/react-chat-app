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
  max-width: 300px; // TODO: temp fix: messages overflow, try to make it better
  background: inherit;

  @media ${breakpoints.xl} {
    width: 50%;
    max-width: 500px;
  }
`;

export const Meta = styled.div`
  display: flex;
  gap: ${styleConstants.gapM};
  justify-content: ${({ own }) => (own ? 'flex-end' : 'flex-start')};
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
  margin-top: 0.5rem;
  border-radius: var(--border-radius);
  background: ${({ own, theme }) => (own ? theme.primary : theme.background500)};
  color: ${({ own, theme }) => (own ? theme.ownMessageText : theme.text)};
  padding: ${styleConstants.paddingM};
  word-wrap: break-word;
  line-height: 1.5;
  max-width: 300px; // TODO: temp fix: messages overflow, try to make it better

  @media ${breakpoints.xl} {
    max-width: 500px;
  }
`;
