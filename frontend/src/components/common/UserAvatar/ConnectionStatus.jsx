import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectConnectedUsers } from 'features/users/usersSlice';

const Wrapper = styled.div`
  --size: 0.8rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
`;

const StyledSpan = styled.span`
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 50%;
  background: ${({ online, theme }) => (online ? theme.success : theme.danger)};
`;

function ConnectionStatus({ userId }) {
  const connectedUsers = useSelector(selectConnectedUsers);

  const isOnline = userId in connectedUsers;

  return (
    <Wrapper>
      <StyledSpan online={isOnline} />
    </Wrapper>
  );
}

export default ConnectionStatus;
