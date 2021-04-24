import React from 'react';
import styled from 'styled-components';

const UnsettedButton = ({ children, ...rest }) => {
  return <StyleUnsetButton {...rest} > {children} </StyleUnsetButton>
}

const StyleUnsetButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default UnsettedButton;
