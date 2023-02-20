import React from 'react';
import styled from 'styled-components/macro';

const StyledLabel = styled.label`
  display: grid;
  gap: 0.2rem;
  font-size: 0.875rem;
`;

function Label({ label, children }) {
  return (
    <StyledLabel>
      {label}
      {children}
    </StyledLabel>
  );
}

export default Label;
