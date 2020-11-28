import React, {useState, useCallback} from 'react';
import styled from 'styled-components';

import styles from '../../lib/styles';

const SignupRowBlock = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: column;
`
const SignupForm = styled.form`
  display:flex;
  flex-direction:column;
`
const SignupEmailInput = styled.input.attrs(
  props => ({ type: "text", name: "email", placeholder: "User ID" })
)`
  ${styles.layout.signInput}
`;
const SignupPasswordInput = styled.input.attrs(
  props => ({type: "password", name:"password", placeholder: "Password"})
)`
  ${styles.layout.signInput}
`
const SignupPasswordChkInput = styled.input.attrs(
  props => ({type: "password", name:"password_check", placeholder: "Password Check"})
)`
  ${styles.layout.signInput}
`

const Signup01 = (props) => {
  const { onClickNext, className } = props;
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordCheck, SetPasswordCheck] = useState("");

  const handleEmailChange = useCallback((e) => {
    SetEmail(e.target.value);
  });

  const handlePasswordChange = useCallback((e) => {
    SetPassword(e.target.value);
  });

  const handlePasswordCheckChange = useCallback((e) => {
    SetPasswordCheck(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({email, password, passwordCheck}, 1, e.target.parentNode);
  });

  return (
    <SignupRowBlock className={className}>
      <h1> 회원가입 </h1>
      <SignupForm onSubmit={handleSubmit}>
        <SignupEmailInput onChange={handleEmailChange} /> <br />
        <SignupPasswordInput onChange={handlePasswordChange} /> <br />
        <SignupPasswordChkInput onChange={handlePasswordCheckChange} /> <br />
        <button type="submit"> 다음으로 </button>
      </SignupForm>
    </SignupRowBlock>
  );
}

export default Signup01;
