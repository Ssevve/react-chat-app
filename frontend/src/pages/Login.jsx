import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoints from '../breakpoints';
import Container from '../components/Container';

const S = {};

S.Main = styled.main`
  background: var(--bg-light);
  height: 100%;
  background: #f2f2f2;
`;

S.Container = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media ${breakpoints.medium} {
    flex-direction: row;
  }
`;

S.Section = styled.section`
  display: grid;
  gap: 2rem;
  @media ${breakpoints.medium} {
    flex: 1;
  }
`;

S.Heading = styled.h1`
  font-size: clamp(3rem, 10vw, 4rem);
  color: var(--clr-accent);
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  @media ${breakpoints.medium} {
    text-align: left;
  }
`;

S.Paragraph = styled.p`
  font-size: clamp(1.3rem, 4vw, 1.5rem);
  text-align: center;
  margin-bottom: 2rem;
  @media ${breakpoints.medium} {
    text-align: left;
    margin-bottom: 0;
  }
`;

S.Form = styled.form`
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: var(--border-radius);
  display: grid;
  gap: 1rem;
  background: var(--clr-light);
  @media ${breakpoints.medium} {
    flex: 1;
  }
`;

S.Label = styled.label`
  display: grid;
  gap: 0.2rem;
  font-size: 0.875rem;
`;

S.Input = styled.input`
  border-radius: var(--border-radius);
  border: 1px solid currentColor;
  font-size: 1rem;
  padding: 0.75rem;
  color: var(--clr-dark);
  min-width: 100%;
  width: 0;
`;

S.Button = styled.button`
  background: var(--clr-accent);
  color: var(--clr-light);
  font-weight: 700;
  border-radius: var(--border-radius);
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: var(--hover-opacity);
  }
`;

S.Divider = styled.div`
  height: 1px;
  background: var(--clr-dark);
  opacity: 0.2;
`;

S.NeedAccount = styled.p`
  font-size: 0.875rem;
  margin: 0 auto;
`;

S.Link = styled(Link)`
  color: var(--clr-accent);
  margin-left: 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  return (
    <S.Main>
      <S.Container>
        <S.Section>
          <S.Heading>Chat app</S.Heading>
          <S.Paragraph>Stay connected with your friends. Anywhere, anytime.</S.Paragraph>
        </S.Section>
        <S.Form>
          <S.Label>
            Username
            <S.Input type="text" />
          </S.Label>
          <S.Label>
            Password
            <S.Input type="password" />
          </S.Label>
          <S.Button type="submit">Log in</S.Button>
          <S.Divider />
          <S.NeedAccount>
            Need an account?
            <S.Link to="/signup">Sign up</S.Link>
          </S.NeedAccount>
        </S.Form>
      </S.Container>
    </S.Main>
  );
}

export default Login;
