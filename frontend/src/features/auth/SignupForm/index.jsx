import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import styles from 'shared/styles';

import SubmitButton from 'components/common/SubmitButton';
import signupSchema from '../schemas/signupSchema';
import { signup, clearFetchError } from '../authSlice';
import AlertBox from '../form/AlertBox';
import FormTitle from '../form/FormTitle';
import Form from '../form/Form';
import Label from '../form/Label';
import Input from '../form/Input';
import ErrorMessage from '../form/ErrorMessage';
import Divider from '../form/Divider';

const HaveAccount = styled.p`
  font-size: 0.875rem;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  margin-left: 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledSubmitButton = styled(SubmitButton)`
  padding: ${styles.padding.m};
  min-height: 2.625rem;
`;

function SignupForm() {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (usernameTaken)
      setError('username', { message: 'Username already taken' });

    return () => {
      dispatch(clearFetchError());
    };
  }, [usernameTaken]);

  const onSubmit = async (data) => {
    // Making a copy to avoid a TypeError: Cannot assign to read only property 'x' of object '#<Object>
    const credentials = { ...data };
    const res = await dispatch(signup(credentials));
    if (res.error) {
      return setUsernameTaken(res.payload.usernameTaken);
    }
    return navigate('/login');
  };
  const fetchError = !usernameTaken && signupError;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} ariaLabel="Sign up">
      <FormTitle>Sign up</FormTitle>
      {fetchError ? (
        <AlertBox variant="error">
          Something went wrong. Please try again.
        </AlertBox>
      ) : null}
      <Label>
        Username
        <Input error={errors.username} name="username" register={register} />
        {errors.username ? (
          <ErrorMessage message={errors.username.message} />
        ) : null}
      </Label>
      <Label>
        Password
        <Input
          error={errors.password}
          name="password"
          register={register}
          type="password"
        />
        {errors.password ? (
          <ErrorMessage message={errors.password.message} />
        ) : null}
      </Label>
      <Label>
        Repeat password
        <Input
          error={errors.repeatPassword}
          name="repeatPassword"
          register={register}
          type="password"
        />
        {errors.repeatPassword ? (
          <ErrorMessage message={errors.repeatPassword.message} />
        ) : null}
      </Label>
      <StyledSubmitButton isLoading={isLoading}>Sign up</StyledSubmitButton>
      <Divider />
      <HaveAccount>
        Have an account?
        <StyledLink to="/login">Log in</StyledLink>
      </HaveAccount>
    </Form>
  );
}

export default SignupForm;
