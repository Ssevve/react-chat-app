import styled from 'styled-components/macro';
import { HiMenu } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import breakpoints from '../breakpoints';

const Header = styled.header`
  width: 100vw;
  border-bottom: 1px solid var(--clr-light-200);
  padding: var(--padding);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${breakpoints.medium} {
    width: calc(100vw - 300px);
    position: relative;
    left: 300px;
  }

  @media ${breakpoints.large} {
    width: calc(100vw - 600px);
    position: relative;
    left: 300px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: var(--padding);
`;

const LeftbarButton = styled(Button)`
  @media ${breakpoints.medium} {
    display: none;
  }
`;

const RightbarButton = styled(Button)`
  @media ${breakpoints.large} {
    display: none;
  }
`;

const CurrentChat = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  padding: var(--padding);
`;

function Topbar({ setExpandLeftbar, setExpandRightbar }) {
  const handleLeftbarExpand = () => {
    setExpandRightbar(false);
    setExpandLeftbar((prev) => !prev);
  };

  const handleRightbarExpand = () => {
    setExpandLeftbar(false);
    setExpandRightbar((prev) => !prev);
  };

  return (
    <Header>
      <LeftbarButton type="button" onClick={handleLeftbarExpand}>
        <HiMenu size="1.5rem" />
      </LeftbarButton>
      <CurrentChat>Current</CurrentChat>
      <RightbarButton type="button" onClick={handleRightbarExpand}>
        <FaUserFriends size="1.5rem" />
      </RightbarButton>
    </Header>
  );
}

export default Topbar;
