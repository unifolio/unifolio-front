import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import styles from 'lib/styles';

const Signup01 = ({ onClickNext }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (signupState.email && signupState.password && signupState.passwordCheck && signupState.nickname) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [signupState]);

  const handleEmailChange = ({target}) => {
    setSignupState((state) => ({...state, email: target.value}));
  }

  const handlePasswordChange = ({target}) => {
    setSignupState((state) => ({...state, password: target.value}));
  }

  const handlePasswordCheckChange = ({target}) => {
    setSignupState((state) => ({...state, passwordCheck: target.value}));
  }

  const handleChangeNickName = ({target}) => {
    setSignupState((state) => ({...state, nickname: target.value}));
  };

  const handleNext = () => {
    onClickNext({...signupState, password_check: signupState.passwordCheck}, 1);
  };

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupEmailInput onChange={handleEmailChange} /> <br />
        <SignupPasswordInput onChange={handlePasswordChange} /> <br />
        <SignupPasswordChkInput onChange={handlePasswordCheckChange} /> <br />
        <SignupNickNameInput onChange={handleChangeNickName}/> <br />
        <SignupNextButton onClick={handleNext} isComplete={isComplete} disabled={!isComplete}> 다음 단계 진행하기 </SignupNextButton>
      </SignupForm>
    </SignupRowBlock>
  );
}

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
  (props) => ({ type: "text", name: "email", placeholder: "계정으로 사용할 이메일 주소" })
)`
  ${styles.layout.signInput}
`;
const SignupPasswordInput = styled.input.attrs(
  (props) => ({type: "password", name:"password", placeholder: "비밀번호(영문, 숫자 포함 10~16자리)"})
)`
  ${styles.layout.signInput}
`;
const SignupPasswordChkInput = styled.input.attrs(
  (props) => ({type: "password", name:"password_check", placeholder: "비밀번호 재확인"})
)`
  ${styles.layout.signInput}
`;
const SignupNickNameInput = styled.input.attrs(
  props => ({ type: "text", name: "nickname", placeholder: "닉네임" })
)`
  ${styles.layout.signInput}
`;

const SignupNextButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  ${({isComplete}) => {
    return isComplete
    ? css`
        background-color: ${styles.palette.unifolioBlue};
        color: white;
      `
    : css`
        background-color: ${styles.palette.deactiveBackgroundGrey};
        color: ${styles.palette.deactiveGrey};
      `
  }}
`;
export default Signup01;
