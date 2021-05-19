import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import styles from '../../lib/styles';

const SigninPresentational = ({ onClickSignin }, ...props ) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
    
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleRememberChange = (e) => {
    console.log(e.target.value)
  }

  const handleSignin = useCallback((e) => {
    e.preventDefault();
    onClickSignin({email, password});
  });
  
  return (
    <SigninLayout>
      <SigninBlock>
        <SigninBlockRow>
          <SigninTitle> Sign in </SigninTitle>
        </SigninBlockRow>
        <SigninBlockCenterSection>
          <SigninIdInput onChange={handleEmailChange} /> 
          <SigninPasswordInput onChange={handlePasswordChange} />
          <SigninSubmitButton onClick={handleSignin} signInState={{email, password}}> 로그인하기 </SigninSubmitButton>
          <SigninBlockRowSpaceBetween>
            <SigninRememberCheckBox>
              <SigninCheckBoxInput type="checkbox" onClick={handleRememberChange} /> Remeber me
            </SigninRememberCheckBox>
            <SigninForgotPassword> 
              
            </SigninForgotPassword>
          </SigninBlockRowSpaceBetween>
        </SigninBlockCenterSection>
        
        <SigninBlockBottomSection>
          
        </SigninBlockBottomSection>
        <SigninBlockRow> or you can join with </SigninBlockRow>
        <SigninSocialsSection>
          <button> 1 </button>
          <button> 2 </button>
          <button> 3 </button>
          <button> 4 </button>
        </SigninSocialsSection>
        <SigninBlockRow marginTop={"7rem"}> 
          Don't have any account? 
          <Link to="/signup"> Sign-up </Link>
        </SigninBlockRow>
      </SigninBlock>
      
    </SigninLayout>
  );
}
const SigninLayout = styled.div`
  height:calc(100vh - 4rem);
  ${styles.layout.marginContainer}
  font-size: var(--fontSize18);
  
  display:flex;
  justify-content: center;
`

const SigninTitle = styled.span`
  font-size: 2.357rem;
  color: ${styles.palette.unifolioBlue};
`

const SigninBlock = styled.div`
  width: 60%;
  margin-top: 10%;
  
  display:flex;
  flex-direction:column; 
`;
const SigninBlockRow = styled.div`
  padding-top: 1rem;
  font-size: 1.2rem;
  
  display:flex;
  justify-content: space-evenly;

  ${props => props.marginTop && css`margin-top: ${props.marginTop};`}
`;

const SigninBlockRowSpaceBetween = styled(SigninBlockRow)`
  justify-content: space-between;
`;

const SigninBlockCenterSection = styled.div`
  margin-top: 62px;

  display: flex;
  flex-direction: column;

  input + input {
    margin-top: 1rem;
  }
`;

const SigninBlockBottomSection = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: row;
  justify-content: space-between;
`
const SigninSocialsSection = styled.div`
  padding-top:2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  button {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`
const SigninIdInput = styled.input.attrs(
  props => ({ type: "text", name: "email", placeholder: "User ID" })
)`
  height: 4rem;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0 1rem;
`;
const SigninPasswordInput = styled.input.attrs(
  props => ({type: "password", name:"password", placeholder: "Password"})
)`
  height: 4rem;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0 1rem;
`;

const SigninCheckBoxInput = styled.input.attrs(
  props => ({type: "checkbox"})
)`
  width: 1.2rem;
  height: 1.2rem;
`;

const SigninSubmitButton = styled.button`
  height: 4rem;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  ${ (props) => props.signInState.email && props.signInState.password 
    ? css`
        color: white;
        background-color: ${styles.palette.unifolioBlue};
      `
    : css`
      color: "#BCB6B6";
    `
  }
`;

const SigninRememberCheckBox = styled.div`
  color: ${styles.palette.unifolioBlue};
  
`;
const SigninForgotPassword = styled.div`
  color: ${styles.palette.unifolioBlue};
  background-color: none;
  
  cursor: pointer;
  
  &::after {
    content: "Forgot Password?"
  }
`;

export default SigninPresentational;