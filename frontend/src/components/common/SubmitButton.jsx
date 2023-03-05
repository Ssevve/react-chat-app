import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';

import Spinner from 'components/common/Spinner';

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.submitButtonText};
  font-weight: 700;
  border-radius: var(--border-radius);
  border: none;
  padding: ${styleConstants.padding200};
  font-size: 1rem;
  display: grid;
  align-items: center;
  cursor: pointer;
  transition: background 0.1s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

function SubmitButton({ isLoading, className, children, ...rest }) {
  return (
    <Button type="submit" disabled={isLoading} className={className} {...rest}>
      {isLoading ? <Spinner size="1rem" stroke="submitButtonText" /> : children}
    </Button>
  );
}

export default SubmitButton;
