import styled from 'styled-components';
import { ReactComponent as Loader } from 'assets/loader.svg';

const Wrapper = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  row-gap: var(--padding);
  padding: 0;
  margin: 0;
`;

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

const Text = styled.span`
  color: var(--clr-dark);
  font-size: 1rem;
`;

function Spinner({ size, stroke, text }) {
  return (
    <Wrapper>
      <StyledLoader width={size} height={size} stroke={stroke} />
      {text && <Text>{text}</Text>}
    </Wrapper>
  );
}

Spinner.defaultProps = {
  size: '2rem',
  stroke: 'var(--clr-light-200)',
  text: '',
};

export default Spinner;
