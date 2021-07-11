import React from 'react';
import styled from 'styled-components';

import palette from 'lib/styles/palette';

const CancelIcon = () => {
  return (
    <CancelIconElement />
  );
}

const CancelIconElement = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${palette.deactiveGrey};
  border-radius: 50%;
  color: white;
  margin-right: 9px;
  
  ::after {
    content:"x";
    width: 100%;
    height: 100%;
    font-size: 20px;

    display:flex;
    justify-content: center;
    align-items: center;
  }
`;

export default CancelIcon;