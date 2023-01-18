import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import breakpoints from '../breakpoints';
import Container from '../components/Container';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorBox from '../components/ErrorBox';
import Loader from '../components/Loader';

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
  background: var(--clr-light-400);
  @media ${breakpoints.medium} {
    flex: 1;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
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
  border: ${({ error }) => (error ? '1px solid var(--clr-danger)' : '1px solid currentColor')};
  outline: ${({ error }) => error && '1px solid var(--clr-danger)'};
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

const HaveAccount = styled.p`
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

const ErrorMessage = styled.span`
  color: var(--clr-danger);
  font-size: 0.75rem;
  height: 1.125rem;
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
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required()
    .label('Repeat password'),
});

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [isFetchError, setIsFetchError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const username = watch('username');
  const password = watch('password');
  const repeatPassword = watch('repeatPassword');

  const onSubmit = async (data) => {
    setIsFetching(true);
    try {
      await axios.post('/auth/signup', {
        username: data.username,
        password: data.password,
      });
      navigate('/login');
    } catch (err) {
      if (err.response.status === 409) {
        return setError('username', { message: 'Username already taken' });
      }
      setIsFetchError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setIsFetchError(false);
  }, [username, password, repeatPassword]);

  return (
    <Main>
      <StyledContainer>
        <Section>
          <Heading>Chat app</Heading>
          <Paragraph>Stay connected with your friends. Anywhere, anytime.</Paragraph>
        </Section>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Sign up</FormTitle>
          {isFetchError && (
            <ErrorBox>
              <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
            </ErrorBox>
          )}
          <Label>
            Username
            <Input
              error={errors.username?.message}
              {...register('username')}
              type="text"
              aria-invalid={errors.username ? true : false}
            />
            {errors.username && (
              <ErrorMessage role="alert">{errors.username?.message}</ErrorMessage>
            )}
          </Label>
          <Label>
            Password
            <Input
              error={errors.password?.message}
              {...register('password')}
              type="password"
              aria-invalid={errors.password ? true : false}
            />
            {errors.password && (
              <ErrorMessage role="alert">{errors.password?.message}</ErrorMessage>
            )}
          </Label>
          <Label>
            Repeat password
            <Input
              error={errors.repeatPassword?.message}
              {...register('repeatPassword')}
              type="password"
              aria-invalid={errors.repeatPassword ? true : false}
            />
            {errors.repeatPassword && (
              <ErrorMessage role="alert">{errors.repeatPassword?.message}</ErrorMessage>
            )}
          </Label>
          <Button type="submit">{isFetching ? <Loader /> : 'Sign up'}</Button>
          <Divider />
          <HaveAccount>
            Have an account?
            <StyledLink to="/login">Log in</StyledLink>
          </HaveAccount>
        </Form>
      </StyledContainer>
    </Main>
  );
}

export default Signup;