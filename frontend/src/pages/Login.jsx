import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoints from '../breakpoints';
import Container from '../components/Container';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorBox from '../components/ErrorBox';

const Main = styled.main`
  background: var(--clr-light-300);
  height: 100%;
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
  background: var(--clr-light-400);
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
  font-size: 1rem;
  padding: 0.75rem;
  color: var(--clr-dark);
  min-width: 100%;
  width: 0;
  border: ${(props) => (props.error ? '1px solid var(--clr-danger)' : '1px solid currentColor')};
  outline: ${(props) => props.error && '1px solid var(--clr-danger)'};
`;

const ErrorMessage = styled.span`
  color: var(--clr-danger);
  font-size: 0.8125rem;
  height: 1.125rem;
`;

const Button = styled.button`
  background: var(--clr-accent);
  color: var(--clr-light-400);
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

const schema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, {
      message: 'No special characters allowed',
    })
    .required()
    .min(4)
    .max(15)
    .label('Username'),
  password: yup.string().required().min(8).label('Password'),
});

function Login() {
  const { setAuth } = useContext(AuthContext);
  const {
    watch,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  });
  const [isFetchError, setIsFetchError] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const username = watch('username');
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/auth/login', {
        username: data.username,
        password: data.password,
      });
      setAuth(res.data);
    } catch (err) {
      if (err.response.status === 400 || err.response.status === 401) setInvalidCredentials(true);
      else setIsFetchError(true);
    }
  };

  useEffect(() => {
    if (errors.username) setInvalidCredentials(true);
    if (errors.password) setInvalidCredentials(true);
  }, [errors]);

  useEffect(() => {
    setIsFetchError(false);
  }, [username, password]);

  useEffect(() => {
    clearErrors('username');
    setInvalidCredentials(false);
  }, [username, clearErrors]);

  useEffect(() => {
    clearErrors('password');
    setInvalidCredentials(false);
  }, [password, clearErrors]);

  return (
    <Main>
      <StyledContainer>
        <Section>
          <Heading>Chat app</Heading>
          <Paragraph>Stay connected with your friends. Anywhere, anytime.</Paragraph>
        </Section>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {isFetchError && (
            <ErrorBox>
              <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
            </ErrorBox>
          )}
          <Label>
            Username
            <Input
              {...register('username')}
              error={errors.username?.message || invalidCredentials}
              aria-invalid={errors.password ? true : false}
              type="text"
            />
            {(errors.username || invalidCredentials) && (
              <ErrorMessage>Invalid username or password</ErrorMessage>
            )}
          </Label>
          <Label>
            Password
            <Input
              {...register('password')}
              error={errors.password?.message || invalidCredentials}
              aria-invalid={errors.password ? true : false}
              type="password"
            />
            {(errors.password || invalidCredentials) && (
              <ErrorMessage>Invalid username or password</ErrorMessage>
            )}
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
