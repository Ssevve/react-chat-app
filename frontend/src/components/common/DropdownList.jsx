import React from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { useState } from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

const Button = styled.button`
  text-align: left;
  padding: var(--padding);
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
`;

const Arrow = styled.span`
  display: flex;
  justify-content: flex-start;
  transition: transform 0.1s ease-in-out;
  transform: ${({ expand }) => (expand ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

const List = styled.ul`
  flex-direction: column;
  gap: 1rem;
  display: ${({ expand }) => (expand ? 'flex' : 'none')};
  overflow: hidden;
  padding-left: var(--padding);
  margin-bottom: 1rem;
`;

function DropdownList({ title, children }) {
  const [expand, setExpand] = useState(true);

  return (
    <Wrapper>
      <Button onClick={() => setExpand((prev) => !prev)}>
        <Arrow expand={expand}>
          <RxTriangleDown size="1.5rem" />
        </Arrow>
        {title}
      </Button>
      {children && (
        <List expand={expand}>
          {React.Children.map(children, (child) => (
            <li>{child}</li> // Does not need a key, because the children have their own keys already
          ))}
        </List>
      )}
    </Wrapper>
  );
}

export default DropdownList;
