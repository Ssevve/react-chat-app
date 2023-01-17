import styled from 'styled-components';
import breakpoints from '../breakpoints';

const StyledLeftbar = styled.div`
  padding: 1rem;
  border-right: 1px solid var(--clr-dark);
  height: 100%;
  width: 90%;
  max-width: 300px;
  position: absolute;
  left: ${(props) => (props.expanded ? '0' : '-300px')};
  transition: left 0.1s ease-in-out;
  background: var(--clr-light-400);

  @media ${breakpoints.medium} {
    height: 100vh;
    top: 0;
    left: 0;
  }
`;

const BarHeader = styled.div``;
const Logo = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
`;

const BarFooter = styled.div``;

const user = {
  username: 'Johnny',
  avatar: {
    url: 'https://i.pravatar.cc/150?img=52',
  },
  statusText: 'Something here',
};

function Leftbar({ expanded }) {
  return (
    <StyledLeftbar expanded={expanded}>
      <BarHeader>
        <Logo>Chat App</Logo>
      </BarHeader>
      <div></div>
      <BarFooter>
        <img src={user.avatar.url} alt={user.username} />
      </BarFooter>
    </StyledLeftbar>
  );
}

export default Leftbar;
