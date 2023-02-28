import styled from 'styled-components';

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.text};
  opacity: 0.2;
`;

export default Divider;
