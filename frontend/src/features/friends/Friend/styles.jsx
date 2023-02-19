import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-block: var(--padding);
  position: relative;
`;

export const Button = styled.button`
  padding: var(--padding);
  color: ${({ theme }) => theme.tertiary};
  background: none;
  border: none;
  cursor: pointer;
`;

export const DotsIcon = styled(BsThreeDotsVertical)`
  pointer-events: none;
`;

export const DropdownMenu = styled.ul`
  background: ${({ theme }) => theme.primary};
  list-style: none;
  position: absolute;
  right: 2.5rem;
  width: 10rem;
  padding: var(--padding);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius);
`;

export const MenuItem = styled.li`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.accent};
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.primary};
  }
`;

export const MenuButton = styled.button`
  background: inherit;
  color: inherit;
  font: inherit;
  padding: var(--padding);
  border-radius: var(--border-radius);
  flex: 1;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;
