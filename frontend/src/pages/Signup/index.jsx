import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/macro';
import signupSchema from './signupSchema';
import useSignup from './useSignup';

import AuthPageLayout from 'layouts/AuthPageLayout';
import ErrorBox from 'components/form/ErrorBox';
import Form from 'components/form/Form';
import FormTitle from 'components/form/FormTitle';
import Label from 'components/form/Label';
import Input from 'components/form/Input';
import ErrorMessage from 'components/form/ErrorMessage';
import SubmitButton from 'components/form/SubmitButton';
import Divider from 'components/form/Divider';

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
  const { error, usernameTaken, isLoading, signup } = useSignup();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (usernameTaken) setError('username', { message: 'Username already taken' });
  }, [usernameTaken, setError]);

  const fetchError = error && !usernameTaken;

  return (
    <AuthPageLayout>
      <Form onSubmit={handleSubmit(signup)}>
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
