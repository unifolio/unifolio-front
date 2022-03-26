import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import styles from 'lib/styles';
import { useSelector } from 'react-redux';

const Signup01 = ({ onClickNext }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signupStateFormData = useSelector((store) => store.signup);
  useEffect(() => {
    setSignupState(signupStateFormData);
  }, []);
  useEffect(() => {
    if (
      signupState.email &&
      signupState.password &&
      signupState.passwordCheck &&
      signupState.nickname
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [signupState]);

  const handleEmailChange = ({ target }) => {
    setSignupState((state) => ({ ...state, email: target.value }));
  };

  const handlePasswordChange = ({ target }) => {
    setSignupState((state) => ({ ...state, password: target.value }));
  };

  const handlePasswordCheckChange = ({ target }) => {
    setSignupState((state) => ({ ...state, passwordCheck: target.value }));
  };

  const handleChangeNickName = ({ target }) => {
    setSignupState((state) => ({ ...state, nickname: target.value }));
  };
  const emailRegExp =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/;
  const handleNext = () => {
    if (!emailRegExp.test(signupState.email)) {
      emailRef.current.focus();
      setErrorMessage('Email 형식이 올바르지 않습니다.');
    } else if (!passwordRegExp.test(signupState.password)) {
      passwordRef.current.focus();
      setErrorMessage('비밀번호는 영문, 숫자 포함 10~16자리이어야 합니다.');
    } else if (signupState.password !== signupState.passwordCheck) {
      passwordRef.current.focus();
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      onClickNext(
        { ...signupState, password_check: signupState.passwordCheck },
        1,
      );
    }
  };

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupEmailInput
          ref={emailRef}
          onChange={handleEmailChange}
          defaultValue={signupStateFormData?.email}
          required
        />
        <br />
        <SignupPasswordInput
          ref={passwordRef}
          onChange={handlePasswordChange}
          defaultValue={signupStateFormData?.password}
          required
        />
        <br />
        <SignupPasswordChkInput
          onChange={handlePasswordCheckChange}
          required
          defaultValue={signupStateFormData?.passwordCheck}
        />
        <br />
        <SignupNickNameInput
          onChange={handleChangeNickName}
          required
          defaultValue={signupStateFormData?.nickname}
        />{' '}
        <br />
        <SignupNextButton
          onClick={handleNext}
          isComplete={isComplete}
          disabled={!isComplete}
        >
          다음 단계 진행하기
        </SignupNextButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </SignupForm>
    </SignupRowBlock>
  );
};

const SignupRowBlock = styled.div`
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
`;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignupEmailInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'email',
  placeholder: '계정으로 사용할 이메일 주소',
}))`
  ${styles.layout.signInput}
`;
const SignupPasswordInput = styled.input.attrs((props) => ({
  type: 'password',
  name: 'password',
  placeholder: '비밀번호(영문, 숫자 포함 10~16자리)',
}))`
  ${styles.layout.signInput}
`;
const SignupPasswordChkInput = styled.input.attrs((props) => ({
  type: 'password',
  name: 'password_check',
  placeholder: '비밀번호 재확인',
}))`
  ${styles.layout.signInput}
`;
const SignupNickNameInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'nickname',
  placeholder: '닉네임',
}))`
  ${styles.layout.signInput}
`;

const SignupNextButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isComplete }) => {
    return isComplete
      ? css`
          background-color: ${styles.palette.unifolioBlue};
          color: white;
          cursor: pointer;
        `
      : css`
          background-color: ${styles.palette.deactiveBackgroundGrey};
          color: ${styles.palette.deactiveGrey};
        `;
  }}
`;
const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
`;
export default Signup01;
