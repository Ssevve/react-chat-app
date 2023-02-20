import styled from 'styled-components/macro';

export const WelcomeWrapper = styled.section`
  color: ${({ theme }) => theme.inverted};
  padding: var(--padding);
  text-align: center;
  display: grid;
  row-gap: 2rem;
  width: 100%;
  margin: 0 auto;
  align-content: center;
  height: 100%;
`;
export const WelcomeTitle = styled.h2`
  font-size: 2rem;
`;
export const WelcomeCopy = styled.p`
  font-size: 1.5rem;
`;

function WelcomeMessage() {
  return (
    <WelcomeWrapper>
      <WelcomeTitle>Welcome to Chat App!</WelcomeTitle>
      <WelcomeCopy>
        Select an existing chat from the left panel or add a friend to start a new one.
      </WelcomeCopy>
    </WelcomeWrapper>
  );
}

export default WelcomeMessage;
