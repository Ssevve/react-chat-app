import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';

function setStylesByAnchor(anchor, theme, expanded) {
  if (anchor === 'left') {
    return {
      borderRight: `1px solid ${theme.tertiary}`,
      left: `${expanded ? '0' : '-18.75rem'}`,
      transition: `left 0.1s ease-in-out`,
    };
  } else {
    return {
      borderLeft: `1px solid ${theme.tertiary}`,
      right: `${expanded ? '0' : '-18.75rem'}`,
      transition: `right 0.1s ease-in-out`,
    };
  }
}

const StyledDiv = styled.div`
  height: calc(100% - 4rem); // topbar height = 4rem
  width: 90%;
  max-width: 18.75rem;
  position: fixed;
  background: ${({ theme }) => theme.primary};
  display: grid;
  grid-template-rows: 4rem 1fr 4rem;
  z-index: 1;
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
