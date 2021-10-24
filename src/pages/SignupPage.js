import React from 'react';
import styled from 'styled-components';

import SignupContainer from '../containers/SignupContainer';
import style from '../lib/styles';

const SignupPage = () => {

  return (
    <SignupLayout>
      <SignupArea>
        <SignupContainer />
      </SignupArea>
    </SignupLayout>
  );
}

const SignupLayout = styled.div`
  height:calc(100vh - 4rem);
  ${style.layout.marginContainer}
  
  display:flex;
  justify-content: center;
  align-items: center;
`
const SignupArea = styled.div`
  width: 60%;

  display:flex;
  flex-direction:column; 
  align-items: center;
  
  h1 {
    display:flex;
    justify-content: center;
  }

`

export default SignupPage;
