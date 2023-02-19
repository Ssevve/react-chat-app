import styled from 'styled-components/macro';

const StyledDiv = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.inverted};
  opacity: 0.2;
`;

function Divider() {
  return <StyledDiv />;
}

export default Divider;
