import styled from 'styled-components';
import useConnectedUsers from 'hooks/useConnectedUsers';

const StyledSpan = styled.span`
  --size: 1rem;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  border: 2px solid var(--clr-light-400);
  background: ${({ online }) => (online ? 'var(--clr-success)' : 'var(--clr-danger)')};
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
