import styled from 'styled-components';
import breakpoints from '../../lib/breakpoints';

const StyledForm = styled.form`
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

function Form({ children, onSubmit }) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

export default Form;
