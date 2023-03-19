import styled from 'styled-components';

import AlertBox from '../form/AlertBox';

const Text = styled.p`
  color: ${({ theme }) => theme.info};
  font-size: 0.875rem;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  margin-bottom: ${({ mb }) => mb};
  line-height: 1.5;
`;

function DemoUserInfo() {
  return (
    <AlertBox variant="info">
      <Text bold mb="0.25rem">
        Demo user credentials:
      </Text>
      <Text>username: demo</Text>
      <Text>password: demo1234</Text>
      <br />
      <Text>
        Initial login can take a bit longer because the server may be sleeping.
        😴😴😴
      </Text>
    </AlertBox>
  );
}

export default DemoUserInfo;
