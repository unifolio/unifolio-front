import React from 'react';
import SignupContainer from '../containers/SignupContainer';
import styled from 'styled-components';

import style from '../lib/styles';

const SignupPosition = styled.div`
  height:calc(100vh - 4rem);
  ${style.layout.marginContainer}
  
  display:flex;
  justify-content: center;
`
const SignupBlock = styled.div`
  width: 60%;
  margin-top: 10%;

  display:flex;
  flex-direction:column; 
  align-items: center;
  
  h1 {
    display:flex;
    justify-content: center;
  }
  button {
    height: 3rem;
    border: none;
  }
`

const SignupPage = () => {
  
  
  return (
    <SignupPosition>
      <SignupBlock>
        <SignupContainer />
      </SignupBlock>
    </SignupPosition>
  );
}

export default SignupPage;
