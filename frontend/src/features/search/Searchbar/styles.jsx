import styled from 'styled-components/macro';
import { FiSearch } from 'react-icons/fi';
import styleConstants from 'shared/styleConstants';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.background600};
  padding: ${styleConstants.paddingL};
`;

export const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 1.5rem;
  color: ${({ theme }) => theme.text};
  opacity: ${styleConstants.dimOpacity};
`;

export const StyledInput = styled.input`
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  align-self: stretch;
  padding: ${styleConstants.paddingS};
  border-radius: var(--border-radius);
  flex: 1;
  background: ${({ theme }) => theme.background400};
  &::placeholder {
    opacity: ${styleConstants.dimOpacity};
  }
`;

export const ClearButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 1.5rem;
  background: ${({ theme }) => theme.background400};
  color: ${({ theme }) => theme.text};
  opacity: ${styleConstants.dimOpacity};
  &:hover {
    opacity: 1;
  }
`;
