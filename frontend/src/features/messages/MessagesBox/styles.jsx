import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';

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

export const WelcomeWrapper = styled.section`
  color: var(--clr-dark);
  padding: var(--padding);
  text-align: center;
  display: grid;
  row-gap: 2rem;
  width: 50%;
  margin: 0 auto;
  align-content: center;
  height: 100%;
`;
export const WelcomeTitle = styled.h2`
  font-size: 2rem;
`;
export const WelcomeCopy = styled.p`
  font-size: 1.5rem;
`;

export const CurrentChatInfo = styled.section`
  border-bottom: 1px solid var(--clr-light-200);
`;

export const Messages = styled.section`
  padding: var(--padding);
  max-height: calc(100% - 4rem);
  top: 4rem;
  bottom: 4rem;
  width: 100%;
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: 2rem;
  overflow-y: auto;
`;
