import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';
import breakpoints from 'shared/breakpoints';

export const Section = styled.section`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.background300};
  transition: opacity 0.1s ease-in-out;

  ${({ sidePanelExpanded }) =>
    sidePanelExpanded && {
      opacity: '0.1',
      pointerEvents: 'none',
    }};

  @media ${breakpoints.large} {
    ${({ sidePanelExpanded }) =>
      sidePanelExpanded && {
        opacity: '1',
        pointerEvents: 'initial',
      }};
  }
`;

export const CurrentChatInfo = styled.section`
  box-shadow: ${styleConstants.boxShadow};
  background: ${({ theme }) => theme.background600};
  padding: ${styleConstants.paddingL};
  z-index: 1;
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
