import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import styled from 'styled-components/macro';

const types = {
  success: {
    icon: <AiOutlineCheckCircle size="1.25rem" />,
    title: 'Success',
    color: 'var(--clr-success)',
  },
  error: {
    icon: <AiOutlineWarning size="1.25rem" />,
    title: 'Error',
    color: 'var(--clr-danger)',
  },
};

const Div = styled.div`
  color: ${({ type }) => types[type].color};
  border: 1px solid currentColor;
  border-radius: var(--border-radius);
  padding: var(--padding);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 1;
  margin-bottom: var(--padding);
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
`;

const Alert = styled.span`
  color: ${({ type }) => types[type].color};
  font-size: 0.85rem;
`;

function AlertBox({ type, children }) {
  return (
    <Div type={type}>
      <Header>
        {types[type].icon}
        <Title>{types[type].title}</Title>
      </Header>
      <Alert type={type}>{children}</Alert>
    </Div>
  );
}

export default AlertBox;
