import styled from 'styled-components';

import AlertBox from './form/AlertBox';

const Text = styled.p`
  color: var(--clr-accent);
  font-size: 0.875rem;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  margin-bottom: ${({ mb }) => mb};
`;

function DemoUserInfo() {
  return (
    <AlertBox type="info">
      <Text bold mb="0.25rem">
        Demo user credentials:
      </Text>
      <Text>username: demo</Text>
      <Text>password: demo1234</Text>
    </AlertBox>
  );
}

export default DemoUserInfo;
