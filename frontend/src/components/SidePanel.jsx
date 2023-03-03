import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';

function setStylesByAnchor(anchor, expanded) {
  if (anchor === 'left') {
    return {
      left: 0,
      transform: !expanded && 'translateX(-100%)',
    };
  } else {
    return {
      right: 0,
      transform: !expanded && 'translateX(100%)',
    };
  }
}

const StyledDiv = styled.div`
  --header-height: ${styleConstants.pageHeaderHeight};
  height: 100%;
  position: absolute;
  width: 90%;
  max-width: ${styleConstants.sidePanelMaxWidth};
  background: ${({ theme }) => theme.background400};
  display: grid;
  grid-template-rows: ${styleConstants.pageHeaderHeight} 1fr ${styleConstants.pageFooterHeight};
  z-index: 2;
  box-shadow: ${styleConstants.boxShadow};
  transform: translateX(0);
  transition: transform 0.1s ease-in-out;

  ${({ anchor, expanded }) => anchor && setStylesByAnchor(anchor, expanded)}
`;

function SidePanel({ anchor, expanded, className, children }) {
  return (
    <StyledDiv aria-hidden={!expanded} anchor={anchor} expanded={expanded} className={className}>
      {children}
    </StyledDiv>
  );
}

export default SidePanel;
