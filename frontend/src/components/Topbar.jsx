import styled from 'styled-components/macro';
import { FiMenu, FiUsers } from 'react-icons/fi';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

import Logo from 'components/Logo';

const Header = styled.header`
  min-height: ${styleConstants.pageHeaderHeight};
  padding: ${styleConstants.padding400};
  display: flex;
  justify-content: space-between;
  column-gap: ${styleConstants.gap200};
  color: ${({ theme }) => theme.topbarText};
  background: ${({ theme }) => theme.primary};
  box-shadow: ${styleConstants.boxShadow};
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  color: inherit;
`;

const LeftPanelButton = styled(Button)`
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const RightPanelButton = styled(Button)`
  @media (min-width: ${breakpoints.xl}) {
    display: none;
  }
`;

function Topbar({ expandLeftPanel, expandRightPanel, setExpandLeftPanel, setExpandRightPanel }) {
  const handleLeftPanelExpand = () => {
    setExpandRightPanel(false);
    setExpandLeftPanel((prev) => !prev);
  };

  const handleRightPanelExpand = () => {
    setExpandLeftPanel(false);
    setExpandRightPanel((prev) => !prev);
  };

  return (
    <Header>
      <Logo hideOnMobile />
      <LeftPanelButton
        type="button"
        aria-label={expandLeftPanel ? 'Show direct messages' : 'Hide direct messages'}
        onClick={handleLeftPanelExpand}
      >
        <FiMenu aria-hidden="true" size="1.5rem" />
      </LeftPanelButton>
      <Logo hideOnTablet />
      <RightPanelButton
        type="button"
        aria-label={expandRightPanel ? 'Show friends' : 'Hide friends'}
        onClick={handleRightPanelExpand}
      >
        <FiUsers aria-hidden="true" size="1.5rem" />
      </RightPanelButton>
    </Header>
  );
}

export default Topbar;
