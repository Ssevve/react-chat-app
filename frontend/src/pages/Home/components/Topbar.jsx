import styled from 'styled-components/macro';
import { HiMenu } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

import Logo from 'components/common/Logo';

const Header = styled.header`
  min-height: ${styleConstants.pageHeaderHeight};
  width: 100vw;
  padding: ${styleConstants.paddingL};
  display: grid;
  align-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
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
  color: ${({ theme }) => theme.topbarText};
`;

const LeftPanelButton = styled(Button)`
  justify-self: start;
  @media ${breakpoints.medium} {
    display: none;
  }
`;

const RightPanelButton = styled(Button)`
  grid-column: 3/4;
  justify-self: end;
  @media ${breakpoints.xl} {
    display: none;
  }
`;

function Topbar({ setExpandLeftPanel, setExpandRightPanel }) {
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
      <LeftPanelButton type="button" onClick={handleLeftPanelExpand}>
        <HiMenu size="1.5rem" />
      </LeftPanelButton>
      <RightPanelButton type="button" onClick={handleRightPanelExpand}>
        <FaUserFriends size="1.5rem" />
      </RightPanelButton>
    </Header>
  );
}

export default Topbar;
