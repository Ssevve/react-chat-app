import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 90%;
  max-width: 1150px;
  margin: 0 auto;
`;

function Container({ children, className }) {
  return <StyledDiv className={className}>{children}</StyledDiv>;
}

export default Container;
