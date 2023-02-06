import React from 'react';
import styled from 'styled-components/macro';

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

function FormTitle({ title }) {
  return <Title>{title}</Title>;
}

export default FormTitle;
