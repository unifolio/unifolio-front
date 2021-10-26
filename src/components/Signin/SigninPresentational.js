import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import styles from 'lib/styles';

import * as Icons from "components/common/Icons/";
import SigninSocial from "components/Signin/SigninSocial";


const SigninPresentational = ({ handleSignin }) => {
  const [signinState, setSigninState] = useState({
    email: localStorage.getItem("_unifolio_signin_account") ? localStorage.getItem("_unifolio_signin_account") : ""
  });
    
  const handleEmailChange = ({target}) => {
    setSigninState((state) => ({...state, email: target.value}));
  };
  
  const handlePasswordChange = ({target}) => {
    setSigninState((state) => ({...state, password: target.value}));
  };
  
  const handleRememberChange = () => {
    setSigninState((state) => ({...state, remember: !state.remember}));
  };

  const handleClickSignin = () => {
    if (signinState.remember) localStorage.setItem("_unifolio_signin_account", signinState.email)
    handleSignin(signinState);
  };
  
  return (
    <SigninLayout>
      <SigninBlock>
        <SigninBlockRow>
          <SigninTitle> 로그인 </SigninTitle>
        </SigninBlockRow>
        <SigninBlockCenterSection>
          <SigninIdInput onChange={handleEmailChange} value={signinState.email}/> 
          <SigninPasswordInput onChange={handlePasswordChange} />
          <SigninSubmitButton onClick={handleClickSignin} signinState={signinState}> 로그인하기 </SigninSubmitButton>
          <SigninBlockRowSpaceBetween>
            <SigninRememberCheckBoxLayer>
              <SigninCheckBoxInput type="checkbox" id="willbeRemembered" />
              <SigninCheckBoxInputLabel htmlFor="willbeRemembered" onClick={handleRememberChange}/>
            </SigninRememberCheckBoxLayer>
            <SigninForgotPassword /> 
          </SigninBlockRowSpaceBetween>
        </SigninBlockCenterSection>
        
        <SigninBlockBottomSection>
          
        </SigninBlockBottomSection>
        <SigninBlockRow> 소셜 로그인</SigninBlockRow>
        <SigninSocialsSection>
          <SigninSocial> <Icons.GoogleIcon /> </SigninSocial>
          <SigninSocial> <Icons.FacebookIcon /> </SigninSocial>
          <SigninSocial> <Icons.NaverIcon />  </SigninSocial>
          <SigninSocial> <Icons.KakaoIcon /> </SigninSocial> 
          
          {/* <button> <Icons.GoogleIcon /> </button>
          <button> <Icons.FacebookIcon /> </button>
          <button> <Icons.NaverIcon /> </button>
          <button> <Icons.KakaoIcon /> </button> */}
        </SigninSocialsSection>
        <SigninBlockRow marginTop={"3rem"}> 
          <div>
            <span>아직 계정이 없으시다면?</span>
            <Link to="/signup"> 
              <HighlightSpan> 회원가입 </HighlightSpan>
            </Link>
          </div>
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
`;

const HighlightSpan = styled.span`
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
  justify-content: center;

  button {
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 50%;
    background-color: white;
  }
  button + button {
    margin-left: 24px;
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

const SigninSubmitButton = styled.button`
  height: 4rem;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  ${ ({ signinState }) => signinState.email && signinState.password 
    ? css`
        color: white;
        background-color: ${styles.palette.unifolioBlue};
      `
    : css`
      color: "#BCB6B6";
    `
  }
`;

const SigninRememberCheckBoxLayer = styled.div`
  color: ${styles.palette.unifolioBlue};
  
  display: flex;
  align-items: center;
  
  ::after {
    content: "아이디 저장";
    margin-left: 10px;
  }
  
  input[type='checkbox']:checked + label {
    background-color: ${styles.palette.unifolioBlue};
  }
`;

const SigninCheckBoxInput = styled.input`
  display: none;
`;
const SigninCheckBoxInputLabel = styled.label`
  width: 1.2rem;
  height: 1.2rem;
  
  border: 1px solid ${styles.palette.unifolioBlue};
  cursor: pointer;
`;


const SigninForgotPassword = styled.div`
  color: ${styles.palette.unifolioBlue};
  background-color: none;
  
  cursor: pointer;
  
  &::after {
    content: "아이디 / 비밀번호 찾기"
  }
`;

export default SigninPresentational;