import styled from 'styled-components/macro';

const borderMap = {
  left: 'right',
  right: 'left',
};

const StyledDiv = styled.div`
  padding: var(--padding);
  height: calc(100% - 4rem); // topbar height = 4rem
  width: 90%;
  max-width: 300px;
  position: fixed;
  top: 4rem;
  background: var(--clr-light-400);
  ${({ anchor }) => `border-${borderMap[anchor]}: 1px solid var(--clr-light-200)}`};
  ${({ anchor, expanded }) => `${anchor}: ${expanded ? '0' : '-300px'}`};
  transition: ${({ anchor }) => `${anchor} 0.1s ease-in-out`};
  display: grid;
  grid-template-rows: auto 1fr auto;
  z-index: 1;
`;

function SidePanel({ anchor, expanded, className, children }) {
  return (
    <StyledDiv anchor={anchor} expanded={expanded} className={className}>
      {children}
    </StyledDiv>
  );
}

export default SidePanel;
