import { FiInfo, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import styled from 'styled-components/macro';

const variants = {
  info: {
    icon: <FiInfo size="1.25rem" />,
    title: 'Info',
    color: 'accent',
  },
  success: {
    icon: <FiCheckCircle size="1.25rem" />,
    title: 'Success',
    color: 'success',
  },
  error: {
    icon: <FiAlertCircle size="1.25rem" />,
    title: 'Error',
    color: 'danger',
  },
};

const Wrapper = styled.div`
  color: ${({ variant, theme }) => theme[variants[variant].color]};
  border: 1px solid currentColor;
  border-radius: var(--border-radius);
  padding: var(--padding);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1;
  margin-bottom: var(--padding);
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
`;

const Alert = styled.span`
  color: ${({ type }) => variants[type].color};
  font-size: 0.85rem;
`;

function AlertBox({ variant, children }) {
  return (
    <Wrapper variant={variant}>
      <Header>
        {variants[variant].icon}
        <Title>{variants[variant].title}</Title>
      </Header>
      <Alert type={variant}>{children}</Alert>
    </Wrapper>
  );
}

export default AlertBox;
