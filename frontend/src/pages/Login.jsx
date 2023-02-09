import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import loginSchema from 'features/auth/schemas/loginSchema';
import { useSelector, useDispatch } from 'react-redux';
import { login } from 'features/auth/authSlice';

import AuthPageLayout from 'layouts/AuthPageLayout';
import ErrorBox from 'features/auth/form/ErrorBox';
import FormTitle from 'features/auth/form/FormTitle';
import Form from 'features/auth/form/Form';
import Label from 'features/auth/form/Label';
import Input from 'features/auth/form/Input';
import ErrorMessage from 'features/auth/form/ErrorMessage';
import SubmitButton from 'features/auth/form/SubmitButton';
import Divider from 'features/auth/form/Divider';

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
  const [unauthorized, setUnauthorized] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

  const username = watch('username');
  const password = watch('password');

  useEffect(() => {
    clearErrors();
    setUnauthorized(false);
    setLoginError(false);
  }, [username, password, clearErrors]);

  const onSubmit = async (data) => {
    // Making a copy to avoid a TypeError: Cannot assign to read only property 'x' of object '#<Object>
    const credentials = { ...data };
    const res = await dispatch(login(credentials));
    if (res.error) {
      setUnauthorized(res.payload.unauthorized);
      setLoginError(res);
    }
  };

  const invalidCredentials = errors.password || errors.username || unauthorized;
  const fetchError = loginError && !unauthorized;
  return (
    <AuthPageLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title="Log in" />
        {fetchError ? (
          <ErrorBox>
            <ErrorMessage message="Something went wrong. Please try again." />
          </ErrorBox>
        ) : null}
        <Label label="Username">
          <Input error={invalidCredentials} name="username" register={register} />
          {invalidCredentials && <ErrorMessage message="Invalid username or password" />}
        </Label>
        <Label label="Password">
          <Input error={invalidCredentials} name="password" register={register} type="password" />
          {invalidCredentials && <ErrorMessage message="Invalid username or password" />}
        </Label>
        <SubmitButton text="Log in" isLoading={auth.loading} />
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
