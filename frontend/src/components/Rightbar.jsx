import styled from 'styled-components/macro';
import breakpoints from '../breakpoints';

const StyledRightbar = styled.div`
  padding: var(--padding);
  border-left: 1px solid var(--clr-light-200);
  height: calc(100% - 57px);
  width: 90%;
  max-width: 300px;
  position: fixed;
  top: 57px;
  right: ${({ expanded }) => (expanded ? '0' : '-300px')};
  transition: right 0.1s ease-in-out;
  background: var(--clr-light-400);

  @media ${breakpoints.large} {
    height: 100vh;
    top: 0;
    right: 0;
  }
`;

const Title = styled.h2`
  padding: var(--padding);
  font-size: 1.5rem;
  line-height: 1;
`;

function Rightbar({ expanded, setCurrentChat }) {
  return (
    <StyledRightbar expanded={expanded}>
      <Title>Friends</Title>
    </StyledRightbar>
  );
}

export default Rightbar;
