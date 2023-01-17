import styled from 'styled-components';
import breakpoints from '../breakpoints';

const StyledRightbar = styled.div`
  padding: 1rem;
  border-left: 1px solid var(--clr-accent);
  height: 100%;
  width: 90%;
  max-width: 300px;
  position: absolute;
  right: ${(props) => (props.expanded ? '0' : '-300px')};
  transition: right 0.1s ease-in-out;
  background: var(--clr-light-400);

  @media ${breakpoints.large} {
    height: 100vh;
    top: 0;
    right: 0;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  line-height: 1;
`;

function Rightbar({ expanded }) {
  return (
    <StyledRightbar expanded={expanded}>
      <Title>Friends</Title>
    </StyledRightbar>
  );
}

export default Rightbar;
