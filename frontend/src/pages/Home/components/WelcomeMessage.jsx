import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';
import breakpoints from 'shared/breakpoints';

export const WelcomeWrapper = styled.section`
  color: ${({ theme }) => theme.text};
  padding: ${styleConstants.paddingL};
  text-align: center;
  display: grid;
  place-content: center;
  row-gap: ${styleConstants.gapXXL};
  flex: 1;
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

export const WelcomeTitle = styled.h2`
  font-size: 2rem;
`;

export const WelcomeCopy = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  max-width: 37.5rem; // 600px
`;

function WelcomeMessage({ sidePanelExpanded }) {
  return (
    <WelcomeWrapper sidePanelExpanded={sidePanelExpanded}>
      <WelcomeTitle>Welcome!</WelcomeTitle>
      <WelcomeCopy>
        Select an existing chat from the left panel or add a friend to start a new one.
      </WelcomeCopy>
    </WelcomeWrapper>
  );
}

export default WelcomeMessage;
