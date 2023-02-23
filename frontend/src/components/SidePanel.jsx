import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

function setStylesByAnchor(anchor, theme, expanded) {
  if (anchor === 'left') {
    return {
      left: `${expanded ? '0' : '-18.75rem'}`,
      transition: `left 0.1s ease-in-out`,
    };
  } else {
    return {
      right: `${expanded ? '0' : '-18.75rem'}`,
      transition: `right 0.1s ease-in-out`,
    };
  }
}

const StyledDiv = styled.div`
  --header-height: ${styleConstants.pageHeaderHeight};
  height: calc(100% - var(--header-height));
  width: 90%;
  max-width: 18.75rem;
  position: fixed;
  background: ${({ theme }) => theme.background400};
  display: grid;
  grid-template-rows: ${styleConstants.pageHeaderHeight} 1fr ${styleConstants.pageFooterHeight};
  z-index: 2;
  box-shadow: ${styleConstants.boxShadow};
  @media ${breakpoints.xl} {
    ${({ anchor }) => `${anchor}: 0`};
  }

  ${({ anchor, theme, expanded }) => anchor && setStylesByAnchor(anchor, theme, expanded)}
`;

function SidePanel({ anchor, expanded, className, children }) {
  return (
    <StyledDiv anchor={anchor} expanded={expanded} className={className}>
      {children}
    </StyledDiv>
  );
}

export default SidePanel;
