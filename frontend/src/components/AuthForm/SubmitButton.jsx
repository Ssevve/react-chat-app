import styled from 'styled-components';

import Loader from '../common/Loader';

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

function SubmitButton({ text, isLoading }) {
  return <Button type="submit">{isLoading ? <Loader /> : text}</Button>;
}

export default SubmitButton;
