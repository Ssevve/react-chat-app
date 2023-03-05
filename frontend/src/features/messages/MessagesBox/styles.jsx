import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';

export const Section = styled.section`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.background300};
`;

export const CurrentChatInfo = styled.section`
  box-shadow: ${styleConstants.boxShadow};
  background: ${({ theme }) => theme.background600};
  padding: ${styleConstants.paddingL};
`;

export const Messages = styled.section`
  --footer-height: ${styleConstants.pageFooterHeight}
  max-height: calc(100% - var(--footer-height));
  padding: ${styleConstants.paddingL};
  padding-bottom: 0;
  background: inherit;
  bottom: ${styleConstants.pageFooterHeight};
  width: 100%;
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: ${styleConstants.gapXXL};
  overflow-y: auto;
`;
