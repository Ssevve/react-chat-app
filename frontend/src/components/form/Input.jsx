import styled from 'styled-components';

const StyledInput = styled.input`
  border-radius: var(--border-radius);
  font-size: 1rem;
  padding: 0.75rem;
  color: var(--clr-dark);
  min-width: 100%;
  width: 0;
  border: ${({ error }) => (error ? '1px solid var(--clr-danger)' : '1px solid currentColor')};
  outline: ${({ error }) => error && '1px solid var(--clr-danger)'};
`;

function Input({ register, name, error, type = 'text', invalidCredentials = false, ...rest }) {
  return (
    <StyledInput
      {...register(name)}
      name={name}
      error={error}
      aria-invalid={error ? true : false}
      type={type}
      {...rest}
    />
  );
}

export default Input;
