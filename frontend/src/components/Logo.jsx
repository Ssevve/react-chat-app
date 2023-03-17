import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FiMessageCircle } from 'react-icons/fi';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

const StyledLogo = styled.h1`
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  color: inherit;
  align-items: center;
  gap: ${styleConstants.gap200};
  font-size: clamp(0.8rem, 7vw, 1.5rem);
  text-decoration: none;
  font-weight: 700;
  justify-content: center;
  @media (min-width: ${breakpoints.medium}) {
    justify-content: start;
    display: ${({ hideOnTablet }) => (hideOnTablet ? 'none' : 'flex')};
  }
`;

function Logo({ colorIcon, applyPadding, hideOnMobile, hideOnTablet }) {
  const { primary, topbarText } = useContext(ThemeContext);
  const iconFillColor = colorIcon ? primary : topbarText;

  return (
    <StyledLogo
      applyPadding={applyPadding}
      hideOnMobile={hideOnMobile}
      hideOnTablet={hideOnTablet}
    >
      <span>Chat App</span>
      <FiMessageCircle stroke={iconFillColor} aria-hidden="true" />
    </StyledLogo>
  );
}

Logo.defaultProps = {
  hideOnMobile: false,
  hideOnTablet: false,
};

export default Logo;
