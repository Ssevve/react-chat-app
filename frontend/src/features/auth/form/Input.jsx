import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';

const StyledInput = styled.input`
  border-radius: var(--border-radius);
  background: ${({ theme }) => theme.background500};
  font-size: 1rem;
  padding: ${styleConstants.paddingM};
  color: ${({ theme }) => theme.text};
  min-width: 100%;
  width: 0;
  border: none;
  outline: ${({ error, theme }) => error && `1px solid ${theme.danger}`};
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
