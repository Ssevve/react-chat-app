import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import styles from 'shared/styles';

const StyledForm = styled.form`
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: var(--border-radius);
  display: grid;
  gap: ${styles.gap.l};
  background: ${({ theme }) => theme.background300};
  @media (min-width: ${breakpoints.medium}) {
    flex: 1;
  }
`;

function Form({ ariaLabel, children, onSubmit }) {
  return (
    <StyledForm aria-label={ariaLabel} onSubmit={onSubmit}>
      {children}
    </StyledForm>
  );
}

export default Form;
