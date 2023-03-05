import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

const StyledForm = styled.form`
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: var(--border-radius);
  display: grid;
  gap: ${styleConstants.gapXL};
  background: ${({ theme }) => theme.background300};
  @media (min-width: ${breakpoints.medium}) {
    flex: 1;
  }
`;

function Form({ children, onSubmit }) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

export default Form;
