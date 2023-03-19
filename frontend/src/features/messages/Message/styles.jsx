import styled from 'styled-components/macro';
import styles from 'shared/styles';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: ${({ own }) => (own ? 'row-reverse' : 'row')};
  justify-self: ${({ own }) => (own ? 'flex-end' : 'flex-start')};
  gap: ${styles.gap.s};
  color: ${({ theme }) => theme.text};
  width: 75%;
  background: inherit;
`;

export const Meta = styled.div`
  display: flex;
  gap: ${styles.gap.s};
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
  background: ${({ own, theme }) =>
    own ? theme.primary : theme.background500};
  color: ${({ own, theme }) => (own ? theme.ownMessageText : theme.text)};
  padding: ${styles.padding.m};
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
`;
