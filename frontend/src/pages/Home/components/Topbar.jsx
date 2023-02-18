import styled from 'styled-components/macro';
import { HiMenu } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import breakpoints from 'utils/breakpoints';

import Logo from 'components/common/Logo';

const Header = styled.header`
  height: 4rem;
  width: 100vw;
  padding: var(--padding);
  display: grid;
  align-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: var(--clr-accent);
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: var(--padding);
  color: var(--clr-light-400);
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
      <Logo hideOnMobile={true} />
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