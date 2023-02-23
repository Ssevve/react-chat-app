import styled from 'styled-components/macro';

const StyledInput = styled.input`
  border-radius: var(--border-radius);
  background: ${({ theme }) => theme.primary};
  font-size: 1rem;
  padding: 0.75rem;
  color: ${({ theme }) => theme.inverted};
  min-width: 100%;
  width: 0;
  border: 1px solid ${({ error, theme }) => (error ? theme.danger : theme.inverted)};
  outline: ${({ error, theme }) => (error ? `1px solid ${theme.danger}` : 'none')};
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
