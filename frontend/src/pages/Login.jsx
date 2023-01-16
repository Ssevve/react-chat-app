import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoints from '../breakpoints';
import Container from '../components/Container';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Main = styled.main`
  background: var(--bg-light);
  height: 100%;
  background: #f2f2f2;
`;

const StyledContainer = styled(Container)`
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

const Form = styled.form`
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

const Label = styled.label`
  display: grid;
  gap: 0.2rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  border-radius: var(--border-radius);
  border: 1px solid currentColor;
  font-size: 1rem;
  padding: 0.75rem;
  color: var(--clr-dark);
  min-width: 100%;
  width: 0;
`;

const Button = styled.button`
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

const Divider = styled.div`
  height: 1px;
  background: var(--clr-dark);
  opacity: 0.2;
`;

const NeedAccount = styled.p`
  font-size: 0.875rem;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  color: var(--clr-accent);
  margin-left: 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const { setAuth } = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      setAuth(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <StyledContainer>
        <Section>
          <Heading>Chat app</Heading>
          <Paragraph>Stay connected with your friends. Anywhere, anytime.</Paragraph>
        </Section>
        <Form onSubmit={handleSubmit}>
          <Label>
            Username
            <Input ref={usernameRef} type="text" />
          </Label>
          <Label>
            Password
            <Input ref={passwordRef} type="password" />
          </Label>
          <Button type="submit">Log in</Button>
          <Divider />
          <NeedAccount>
            Need an account?
            <StyledLink to="/signup">Sign up</StyledLink>
          </NeedAccount>
        </Form>
      </StyledContainer>
    </Main>
  );
}

export default Login;
