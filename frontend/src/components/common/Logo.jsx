import styled from 'styled-components';
import { BsFillChatFill } from 'react-icons/bs';
import breakpoints from 'shared/breakpoints';

const StyledLogo = styled.h1`
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  padding: var(--padding);
  line-height: 1;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: 700;
  @media ${breakpoints.medium} {
    display: ${({ hideOnTablet }) => (hideOnTablet ? 'none' : 'flex')};
  }
`;

const LogoText = styled.span`
  color: ${({ color, theme }) => theme[color]};
`;

const LogoIcon = styled(BsFillChatFill)`
  color: ${({ color, theme }) => theme[color]};
`;

function Logo({ textColor, iconColor, hideOnMobile, hideOnTablet }) {
  return (
    <StyledLogo hideOnMobile={hideOnMobile} hideOnTablet={hideOnTablet}>
      <LogoText color={textColor}>Chat App</LogoText>
      <LogoIcon color={iconColor} />
    </StyledLogo>
  );
}

Logo.defaultProps = {
  textColor: 'primary',
  iconColor: 'primary',
  hideOnMobile: false,
  hideOnTablet: false,
};

export default Logo;
