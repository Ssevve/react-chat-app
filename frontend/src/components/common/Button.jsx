import styles from 'shared/styles';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: var(--border-radius);
  background: inherit;
  opacity: ${({ dim }) => dim && styles.dimOpacity};
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 700;
  padding: ${styles.padding.s};
  font-family: var(--font-family);
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.itemHoverBackground};
    opacity: 1;

    ${({ theme, variant }) =>
      variant && {
        color: theme[variant],
      }}
  }
`;

function Button({ onClick, dim, variant, className, children, ariaLabel }) {
  return (
    <StyledButton
      dim={dim}
      type="button"
      onClick={onClick}
      variant={variant}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
