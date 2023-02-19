import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';

const Main = styled.main`
  background: var(--clr-light-300);
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1150px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media ${breakpoints.medium} {
    flex-direction: row;
  }
`;

const Section = styled.section`
  display: grid;
  gap: 2rem;
  @media ${breakpoints.medium} {
    flex: 1;
  }
`;

const Heading = styled.h1`
  font-size: clamp(3rem, 10vw, 4rem);
  color: var(--clr-accent);
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  @media ${breakpoints.medium} {
    text-align: left;
  }
`;

const Paragraph = styled.p`
  font-size: clamp(1.3rem, 4vw, 1.5rem);
  text-align: center;
  margin-bottom: 2rem;
  @media ${breakpoints.medium} {
    text-align: left;
    margin-bottom: 0;
  }
`;

function AuthPageLayout({ children }) {
  return (
    <Main>
      <Container>
        <Section>
          <Heading>Chat app</Heading>
          <Paragraph>Stay connected with your friends. Anywhere, anytime.</Paragraph>
        </Section>
        {children}
      </Container>
    </Main>
  );
}

export default AuthPageLayout;
