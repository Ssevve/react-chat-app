import styled from 'styled-components/macro';
import useConnectedUsers from 'hooks/useConnectedUsers';

const StyledSpan = styled.span`
  --size: 1rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ online, theme }) => (online ? theme.success : theme.danger)};
  position: absolute;
  bottom: 0;
  right: 0;
`;

function ConnectionStatus({ userId }) {
  const { connectedUsers } = useConnectedUsers();

  const isOnline = userId in connectedUsers;

  return <StyledSpan online={isOnline} />;
}

export default ConnectionStatus;
