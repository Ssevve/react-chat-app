import styled from 'styled-components/macro';

import Loader from 'components/common/Loader';

const Button = styled.button`
  background: var(--clr-accent);
  color: var(--clr-light-400);
  font-weight: 700;
  border-radius: var(--border-radius);
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: var(--hover-opacity);
  }
`;

function SubmitButton({ isLoading, children }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <Loader /> : children}
    </Button>
  );
}

export default SubmitButton;