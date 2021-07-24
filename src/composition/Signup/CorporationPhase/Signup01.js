import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import UnsettedButton from 'components/common/UnsettedButton.js';

const Signup01 = ({ onClickNext, className }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "" && passwordCheck !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })

  const handleEmailChange = (e) => { setEmail(e.target.value); }
  const handlePasswordChange = (e) => { setPassword(e.target.value); }
  const handlePasswordCheckChange = (e) => { setPasswordCheck(e.target.value); }

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickNext({email, password, password_check: passwordCheck}, 1, e.target.parentNode);
  }

  return (
    <SignupRowBlock className={className}>
      <SignupForm onSubmit={handleSubmit}>
        <SignupEmailInput onChange={handleEmailChange} /> <br />
        <SignupPasswordInput onChange={handlePasswordChange} /> <br />
        <SignupPasswordChkInput onChange={handlePasswordCheckChange} /> <br />
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
  ${styles.layout.signInput}
`;
const SignupPasswordChkInput = styled.input.attrs(
  props => ({type: "password", name:"password_check", placeholder: "비밀번호 재확인"})
)`
  ${styles.layout.signInput}
`;
export default Signup01;
