import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.text};
  opacity: 0.2;
`;

function Divider() {
  return <StyledDiv data-testid="divider" />;
}

export default Divider;
