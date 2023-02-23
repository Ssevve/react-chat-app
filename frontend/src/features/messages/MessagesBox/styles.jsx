import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

export const Section = styled.section`
  flex: 2.5;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: calc(100% - 4rem);
  transition: all 0.1s ease-in-out;
  background: ${({ theme }) => theme.background300};

  ${({ sidePanelExpanded }) =>
    sidePanelExpanded && {
      opacity: '0.1',
      pointerEvents: 'none',
    }};

  @media ${breakpoints.medium} {
    left: 18.75rem;
    max-width: calc(100vw - 18.75rem);
  }

  @media ${breakpoints.large} {
    right: 0;
    transition: right 0.1s ease-in-out, max-width 0.1s ease-in-out;

    ${({ expandRightPanel }) =>
      expandRightPanel && {
        maxWidth: 'calc(100vw - 37.5rem)',
      }};

    ${({ sidePanelExpanded }) =>
      sidePanelExpanded && {
        opacity: '1',
        pointerEvents: 'initial',
      }};
  }

  @media ${breakpoints.xl} {
    max-width: calc(100vw - 37.5rem);
    right: 18.75rem;
    transition: none;
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
