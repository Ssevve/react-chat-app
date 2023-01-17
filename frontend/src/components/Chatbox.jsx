import styled from 'styled-components';
import breakpoints from '../breakpoints';

const Section = styled.section`
  flex: 2.5;
  padding: var(--padding);

  @media ${breakpoints.medium} {
    position: relative;
    left: 300px;
  }
`;

function Chatbox() {
  return <Section>Chatbox</Section>;
}

export default Chatbox;
