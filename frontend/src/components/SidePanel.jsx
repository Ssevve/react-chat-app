import styled from 'styled-components/macro';
import breakpoints from 'shared/breakpoints';

const borderMap = {
  left: 'border-right',
  right: 'border-left',
};

const StyledDiv = styled.div`
  height: calc(100% - 4rem); // topbar height = 4rem
  width: 90%;
  max-width: 18.75rem;
  position: fixed;
  top: 4rem;
  background: var(--clr-light-400);
  ${({ anchor }) => `${borderMap[anchor]}: 1px solid var(--clr-light-200)}`};
  ${({ anchor, expanded }) => `${anchor}: ${expanded ? '0' : '-18.75rem'}`};
  transition: ${({ anchor }) => `${anchor} 0.1s ease-in-out`};
  display: grid;
  grid-template-rows: 4rem 1fr 4rem;
  z-index: 1;
  @media ${breakpoints.xl} {
    ${({ anchor }) => `${anchor}: 0`};
  }
`;

function SidePanel({ anchor, expanded, className, children }) {
  return (
    <StyledDiv anchor={anchor} expanded={expanded} className={className}>
      {children}
    </StyledDiv>
  );
}

export default SidePanel;
