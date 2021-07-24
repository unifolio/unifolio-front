import React from 'react';
import styled from 'styled-components';

import palette from 'lib/styles/palette';

const ScrewIcon = () => {
  return (
    <ScrewIconElement />
  )
}

const ScrewIconElement = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${palette.unifolioBlue};
  border-radius: 50%;
  color: white;
  margin-right: 9px;
  
  ::after {
    content:"+";
    width: 100%;
    height: 100%;
    font-size: 20px;

    display:flex;
    justify-content: center;
    align-items: center;
  }
`

export default ScrewIcon;