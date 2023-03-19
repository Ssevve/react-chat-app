import styled from 'styled-components/macro';
import styles from 'shared/styles';

export const Section = styled.section`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.background300};
`;

export const CurrentChatInfo = styled.section`
  box-shadow: ${styles.boxShadow};
  background: ${({ theme }) => theme.background600};
  padding: ${styles.padding.l};
`;

export const Messages = styled.section`
  --footer-height: ${styles.constants.pageHeaderHeight}
  max-height: calc(100% - var(--footer-height));
  padding: ${styles.padding.l};
  padding-bottom: 0;
  background: inherit;
  bottom: ${styles.constants.pageHeaderHeight};
  width: 100%;
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: ${styles.gap.xl};
  overflow-y: auto;
`;
