import styled from 'styled-components';

import Spinner from 'components/common/Spinner';

const SpinnerWrapper = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

function Loading() {
  return (
    <SpinnerWrapper>
      <Spinner text="Loading..." />
    </SpinnerWrapper>
  );
}

export default Loading;
