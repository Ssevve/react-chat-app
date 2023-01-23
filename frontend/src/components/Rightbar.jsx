import styled from 'styled-components/macro';
import breakpoints from '../breakpoints';

import Friends from './Friends';

const StyledRightbar = styled.div`
  padding: var(--padding);
  border-left: 1px solid var(--clr-light-200);
  height: calc(100% - 4rem);
  width: 90%;
  max-width: 300px;
  position: fixed;
  top: 4rem;
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

function Rightbar({ expanded, friends, chats, setCurrentChat }) {
  return (
    <StyledRightbar expanded={expanded}>
      <Title>Friends</Title>
      <Friends friends={friends} chats={chats} setCurrentChat={setCurrentChat} />
    </StyledRightbar>
  );
}

export default Rightbar;
