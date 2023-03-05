import React from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { useState } from 'react';
import styled from 'styled-components/macro';
import styleConstants from 'shared/styleConstants';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: inherit;
  gap: ${styleConstants.gap200};
  margin-top: 1rem;
`;

const Button = styled.button`
  text-align: left;
  padding-left: ${styleConstants.padding200};
  display: flex;
  align-items: center;
  gap: ${styleConstants.gap100};
  text-transform: uppercase;
  background: inherit;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  opacity: ${styleConstants.dimOpacity};
  &:hover {
    opacity: 1;
  }
`;

const Arrow = styled.span`
  display: flex;
  justify-content: flex-start;
  transition: transform 0.1s ease-in-out;
  transform: ${({ expand }) => (expand ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

const Title = styled.h3`
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 700;
`;

const List = styled.ul`
  list-style: none;
  flex-direction: column;
  display: ${({ expand }) => (expand ? 'flex' : 'none')};
  overflow: hidden;
  background: inherit;
`;

const ListItem = styled.li`
  background: inherit;
  padding: ${({ noItemPadding }) => (noItemPadding ? 0 : styleConstants.padding400)};
  opacity: ${({ dim }) => (dim ? styleConstants.dimOpacity : 1)};
  &:hover {
    opacity: 1;
  }
`;

function DropdownList({ title, dim, noItemPadding, children }) {
  const [expand, setExpand] = useState(true);

  return (
    <Wrapper>
      <Button onClick={() => setExpand((prev) => !prev)}>
        <Arrow expand={expand}>
          <RxTriangleDown size="1.5rem" />
        </Arrow>
        <Title>{title}</Title>
      </Button>
      {children && (
        <List expand={expand}>
          {React.Children.map(children, (child) => (
            <ListItem dim={dim} noItemPadding={noItemPadding}>
              {child}
            </ListItem> // Does not need a key, because the children have their own keys already
          ))}
        </List>
      )}
    </Wrapper>
  );
}

DropdownList.defaultProps = {
  dim: false,
};

export default DropdownList;
