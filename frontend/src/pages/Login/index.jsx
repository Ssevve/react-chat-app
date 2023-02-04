import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import useLogin from './useLogin';
import loginSchema from './loginSchema';

import AuthPageLayout from 'layouts/AuthPageLayout';
import ErrorBox from 'components/form/ErrorBox';
import FormTitle from 'components/form/FormTitle';
import Form from 'components/form/Form';
import Label from 'components/form/Label';
import Input from 'components/form/Input';
import ErrorMessage from 'components/form/ErrorMessage';
import SubmitButton from 'components/form/SubmitButton';
import Divider from 'components/form/Divider';

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
  const {
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    reValidateMode: 'onSubmit',
  });
  const { error, setError, unauthorized, setUnauthorized, isLoading, login } = useLogin();
  const username = watch('username');
  const password = watch('password');

  useEffect(() => {
    setUnauthorized(false);
    setError(null);
    clearErrors();
  }, [username, password, setUnauthorized, clearErrors, setError]);

  const invalidCredentials = errors.password || errors.username || unauthorized;
  return (
    <AuthPageLayout>
      <Form onSubmit={handleSubmit(login)}>
        <FormTitle title="Log in" />
        {error && (
          <ErrorBox>
            <ErrorMessage message="Something went wrong. Please try again." />
          </ErrorBox>
        )}
        <Label label="Username">
          <Input error={invalidCredentials} name="username" register={register} />
          {invalidCredentials && <ErrorMessage message="Invalid username or password" />}
        </Label>
        <Label label="Password">
          <Input error={invalidCredentials} name="password" register={register} type="password" />
          {invalidCredentials && <ErrorMessage message="Invalid username or password" />}
        </Label>
        <SubmitButton text="Log in" isLoading={isLoading} />
        <Divider />
        <NeedAccount>
          Need an account?
          <StyledLink to="/signup">Sign up</StyledLink>
        </NeedAccount>
      </Form>
    </AuthPageLayout>
  );
}

export default Login;
