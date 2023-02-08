import styled from 'styled-components/macro';

const StyledSpan = styled.span`
  color: var(--clr-danger);
  font-size: 0.75rem;
  height: 1.125rem;
`;

function ErrorMessage({ message }) {
  return <StyledSpan role="alert">{message}</StyledSpan>;
}

export default ErrorMessage;
