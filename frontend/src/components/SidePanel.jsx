import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';
import useWindowWidth from 'hooks/useWindowWidth';

const StyledDiv = styled.div`
  --header-height: ${styleConstants.pageHeaderHeight};
  height: 100%;
  position: absolute;
  width: 90%;
  max-width: ${styleConstants.sidePanelMaxWidth};
  background: ${({ theme }) => theme.background400};
  display: grid;
  grid-template-rows: ${styleConstants.pageHeaderHeight} 1fr ${styleConstants.pageFooterHeight};
  z-index: 1;
  box-shadow: ${styleConstants.boxShadow};

  ${({ anchor }) =>
    anchor === 'left'
      ? {
          left: 0,
        }
      : { right: 0 }};

  &.slide-appear {
    transform: ${({ anchor }) => (anchor === 'left' ? 'translateX(-100%)' : 'translateX(100%)')};
  }

  &.slide-appear-active {
    transform: translateX(0);
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &.slide-enter {
    transform: ${({ anchor }) => (anchor === 'left' ? 'translateX(-100%)' : 'translateX(100%)')};
  }

  &.slide-enter-active {
    transform: translateX(0);
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &.slide-exit {
    transform: translateX(0);
  }

  &.slide-exit-active {
    transform: ${({ anchor }) => (anchor === 'left' ? 'translateX(-100%)' : 'translateX(100%)')};
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1;

  &.fade-appear {
    opacity: 0;
  }

  &.fade-appear-active {
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &.fade-exit-done {
    opacity: 0;
  }
`;

function SidePanel({ anchor, onBackdropClick, forceExpandWidth, expanded, className, children }) {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const panelRef = useRef();
  const backdropRef = useRef();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (window.matchMedia(`(min-width: ${forceExpandWidth})`).matches) {
      setIsExpanded(true);
      setShowBackdrop(false);
    } else {
      setIsExpanded(expanded);
      setShowBackdrop(true);
    }
  }, [windowWidth, forceExpandWidth, expanded]);

  return (
    <>
      {showBackdrop && (
        <CSSTransition
          nodeRef={backdropRef}
          in={isExpanded}
          appear={true}
          timeout={225}
          classNames="fade"
          unmountOnExit
        >
          <Backdrop
            ref={backdropRef}
            onClick={onBackdropClick}
            aria-hidden="true"
            expanded={expanded}
          />
        </CSSTransition>
      )}
      <CSSTransition
        in={isExpanded}
        nodeRef={panelRef}
        appear={true}
        timeout={225}
        classNames="slide"
        unmountOnExit
      >
        <StyledDiv ref={panelRef} anchor={anchor} expanded={expanded} className={className}>
          {children}
        </StyledDiv>
      </CSSTransition>
    </>
  );
}

export default SidePanel;
