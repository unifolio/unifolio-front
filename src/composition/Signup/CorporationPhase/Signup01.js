import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import * as Icons from "components/common/Icons";
import UnsettedButton from 'components/common/UnsettedButton.js';

const Signup01 = ({ onClickNext, className }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", isVisible: false });
  const [passwordCheck, setPasswordCheck] = useState({ value: "", isVisible: false });
  const [isActive, setIsActive] = useState(false);
  const [$password, $passwordCheck] = [useRef(), useRef()];

  useEffect(() => {
    if (email !== "" && password.value !== "" && passwordCheck.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })

  const handleEmailChange = (e) => { setEmail(e.target.value); }
  const handlePasswordChange = (e) => { setPassword({...password, value: e.target.value}); }
  const handlePasswordCheckChange = (e) => { setPasswordCheck({...passwordCheck, value: e.target.value}); }

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickNext({ email, password: password.value, password_check: passwordCheck.value }, 1, e.target.parentNode);
  }
  
  const handleClickEyeIcon = (key) => {
    if (key === "password") {
      if (password.isVisible) {
        password.isVisible = false;
        $password.current.type = "password"
      }
      else {
        password.isVisible = true;
        $password.current.type = "text"
      }
    }
    else if (key === "passwordCheck") {
      if (password.isVisible) {
        passwordCheck.isVisible = false;
        $passwordCheck.current.type = "password";
      }
      else {
        passwordCheck.isVisible = true;
        $passwordCheck.current.type = "text"
      }
    }
  }

  return (
    <SignupRowBlock className={className}>
      <SignupForm onSubmit={handleSubmit}>
        <SignupEmailInput onChange={handleEmailChange} /> <br />
        <div style={{width: "100%"}}>
          <SignupPasswordInput ref={$password} onChange={handlePasswordChange} /> 
          <Icons.EyeIcon 
            onClick={() => handleClickEyeIcon("password")}
            style={{
              position: "absolute", transform: "translateX(-25px)", cursor: "pointer"
            }}
          />
        </div>
        <br />
        <div style={{width: "100%"}}>
          <SignupPasswordChkInput ref={$passwordCheck} onChange={handlePasswordCheckChange} /> 
          <Icons.EyeIcon
            onClick={() => handleClickEyeIcon("passwordCheck")}
            style={{
              position: "absolute", transform: "translateX(-25px)", cursor: "pointer"
            }}
          />
        </div>
        <br />
        <SignupSubmitButton active={isActive}> 다음 단계 진행하기 </SignupSubmitButton>
      </SignupForm>
    </SignupRowBlock>
  );
}

const SignupSubmitButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  color: ${props => props.active ? "white" : "#BCB6B6"};
  background-color: ${props => props.active ? styles.palette.unifolioBlue : "#F4F4F4"};
  pointer-events: ${props => props.active ? "" : "none"}; 
  border-radius: 5px;
  
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`

const SignupRowBlock = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: column;
`;
const SignupForm = styled.form`
  display:flex;
  flex-direction:column;
`;
const SignupEmailInput = styled.input.attrs(
  props => ({ type: "text", name: "email", placeholder: "계정으로 사용할 이메일 주소" })
)`
  ${styles.layout.signInput}
`;
const SignupPasswordInput = styled.input.attrs(
  props => ({type: "password", name:"password", placeholder: "비밀번호(영문, 숫자 포함 10~16자리)"})
)`
  width: 100%;
  ${styles.layout.signInput}
  
  &:focus {
    outline: none
  }
`;
const SignupPasswordChkInput = styled.input.attrs(
  props => ({type: "password", name:"password_check", placeholder: "비밀번호 재확인"})
)`
  width: 100%;
  ${styles.layout.signInput}
  
  &:focus {
    outline: none
  }
`;
export default Signup01;
