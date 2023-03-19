import styled from 'styled-components/macro';
import styles from 'shared/styles';

import Spinner from 'components/common/Spinner';

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.submitButtonText};
  font-weight: 700;
  border-radius: var(--border-radius);
  border: none;
  padding: ${styles.padding.s};
  font-size: 1rem;
  display: grid;
  align-items: center;
  cursor: pointer;
  transition: background 0.1s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

function SubmitButton({ isLoading, className, children, ariaLabel }) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className}
      aria-label={ariaLabel}
    >
      {isLoading ? <Spinner size="1rem" stroke="submitButtonText" /> : children}
    </Button>
  );
}

export default SubmitButton;
