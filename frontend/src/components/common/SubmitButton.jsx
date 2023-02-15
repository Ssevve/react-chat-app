import styled from 'styled-components/macro';

import Spinner from 'components/common/Spinner';

const Button = styled.button`
  background: var(--clr-accent);
  color: var(--clr-light-400);
  font-weight: 700;
  border-radius: var(--border-radius);
  border: none;
  padding: 0.875rem;
  font-size: 1rem;
  display: grid;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  &:hover {
    opacity: var(--hover-opacity);
  }
`;

function SubmitButton({ isLoading, children }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <Spinner size="1rem" stroke="var(--clr-light-400)" /> : children}
    </Button>
  );
}

export default SubmitButton;
