import styled from 'styled-components/macro';

import Spinner from 'components/common/Spinner';

const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  border-radius: var(--border-radius);
  border: none;
  padding: 0.875rem;
  font-size: 1rem;
  display: grid;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  transition: background 0.1s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }
`;

function SubmitButton({ isLoading, children }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <Spinner size="1rem" stroke="primary" /> : children}
    </Button>
  );
}

export default SubmitButton;
