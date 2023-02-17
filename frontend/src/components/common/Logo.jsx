import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillChatFill } from 'react-icons/bs';
import breakpoints from 'utils/breakpoints';

const StyledLogo = styled(Link)`
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  padding: var(--padding);
  line-height: 1;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: 700;
  @media ${breakpoints.medium} {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'flex' : 'none')};
  }
`;

const LogoText = styled.span`
  color: ${({ color }) => color};
`;

function Logo({ textColor, iconColor, hideOnMobile, hideOnTablet }) {
  return (
    <StyledLogo hideOnMobile={hideOnMobile} hideOnTablet={hideOnTablet}>
      <LogoText color={textColor}>Chat App</LogoText>
      <BsFillChatFill color={iconColor} />
    </StyledLogo>
  );
}

Logo.defaultProps = {
  textColor: 'var(--clr-light-400)',
  iconColor: 'var(--clr-light-400)',
  hideOnMobile: false,
  hideOnTablet: false,
};

export default Logo;
