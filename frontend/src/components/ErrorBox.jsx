import { AiOutlineWarning } from 'react-icons/ai';
import styled from 'styled-components';

const StyledErrorBox = styled.div`
  border: 1px solid var(--clr-danger);
  border-radius: var(--border-radius);
  padding: var(--padding);
  color: var(--clr-danger);
`;

const StyledSpan = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
`;

const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

function ErrorBox({ children }) {
  return (
    <StyledErrorBox>
      <BoxHeader>
        <AiOutlineWarning size="1.25rem" />
        <StyledSpan>Error</StyledSpan>
      </BoxHeader>
      {children}
    </StyledErrorBox>
  );
}

export default ErrorBox;
