import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

export const Section = styled.section`
  flex: 2.5;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: calc(100% - 4rem);
  top: 4rem;
  transition: all 0.1s ease-in-out;

  ${({ sidePanelExpanded }) =>
    sidePanelExpanded && {
      opacity: '0.5',
      filter: 'blur(0.1rem)',
      pointerEvents: 'none',
    }};

  @media ${breakpoints.medium} {
    max-width: ${({ expandRightPanel }) =>
      expandRightPanel ? 'calc(100vw - 600px)' : 'calc(100vw - 300px)'};
    left: 300px;
    transition: right 0.1s ease-in-out, max-width 0.1s ease-in-out;

    ${({ sidePanelExpanded }) =>
      sidePanelExpanded && {
        opacity: '1',
        filter: 'blur(0)',
        pointerEvents: 'initial',
      }};
  }

  @media ${breakpoints.large} {
    right: ${({ expandRightPanel }) => (expandRightPanel ? '300px' : '0')};
  }

  @media ${breakpoints.xl} {
    max-width: calc(100vw - 600px);
    right: 300px;
    transition: none;
  }
`;

export const Messages = styled.section`
  padding: var(--padding);
  max-height: calc(100% - 4rem);
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 4rem;
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: 2rem;
  overflow-y: auto;
`;
