import { useState } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from 'features/auth/authSlice';
import styled from 'styled-components/macro';
import signupSchema from 'features/auth/schemas/signupSchema';

import AuthPageLayout from 'layouts/AuthPageLayout';
import ErrorBox from 'features/auth/form/ErrorBox';
import Form from 'features/auth/form/Form';
import FormTitle from 'features/auth/form/FormTitle';
import Label from 'features/auth/form/Label';
import Input from 'features/auth/form/Input';
import ErrorMessage from 'features/auth/form/ErrorMessage';
import SubmitButton from 'features/auth/form/SubmitButton';
import Divider from 'features/auth/form/Divider';

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

function Signup() {
  const [usernameTaken, setUsernameTaken] = useState(false);
  const signupError = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    // Making a copy to avoid a TypeError: Cannot assign to read only property 'x' of object '#<Object>
    const credentials = { ...data };
    const res = await dispatch(signup(credentials));
    if (res.error) {
      setUsernameTaken(res.payload.usernameTaken);
      setError('username', { message: 'Username already taken' });
    }
  };

  const fetchError = !usernameTaken && signupError;

  return (
    <AuthPageLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title="Sign up" />
        {fetchError && (
          <ErrorBox>
            <ErrorMessage message="Something went wrong. Please try again." />
          </ErrorBox>
        )}
        <Label label="Username">
          <Input error={errors.username} name="username" register={register} />
          {errors.username && <ErrorMessage message={errors.username.message} />}
        </Label>
        <Label label="Password">
          <Input error={errors.password} name="password" register={register} type="password" />
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </Label>
        <Label label="Repeat password">
          <Input
            error={errors.repeatPassword}
            name="repeatPassword"
            register={register}
            type="password"
          />
          {errors.repeatPassword && <ErrorMessage message={errors.repeatPassword.message} />}
        </Label>
        <SubmitButton text="Sign up" isLoading={isLoading} />
        <Divider />
        <HaveAccount>
          Have an account?
          <StyledLink to="/login">Log in</StyledLink>
        </HaveAccount>
      </Form>
    </AuthPageLayout>
  );
}

export default Signup;
