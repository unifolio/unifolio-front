import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import * as Icons from 'components/common/Icons';
import UnsettedButton from 'components/common/UnsettedButton.js';

const Signup01 = ({ signupInputData, onClickNext }) => {
  const [email, setEmail] = useState(signupInputData.email ?? '');
  const [password, setPassword] = useState({
    value: signupInputData.password ?? '',
    isVisible: false,
  });
  const [passwordCheck, setPasswordCheck] = useState({
    value: signupInputData.password_check ?? '',
    isVisible: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [$password, $passwordCheck] = [useRef(null), useRef(null)];
  const emailRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (email !== '' && password.value !== '' && passwordCheck.value !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword({ ...password, value: e.target.value });
  };
  const handlePasswordCheckChange = (e) => {
    setPasswordCheck({ ...passwordCheck, value: e.target.value });
  };
  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/;
  const handleSubmit = (e) => {
    if (!emailRegExp.test(email)) {
      emailRef.current.focus();
      setErrorMessage('Email 형식이 옳바르지 않습니다.');
    } else if (!passwordRegExp.test(password.value)) {
      $password.current.focus();
      setErrorMessage('비밀번호는 영문, 숫자 포함 10~16자리이어야 합니다.');
    } else if (password.value !== passwordCheck.value) {
      $password.current.focus();
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      onClickNext(
        {
          email,
          password: password.value,
          password_check: passwordCheck.value,
        },
        1,
        e.target.parentNode,
      );
    }
  };

  const handleClickEyeIcon = (key) => {
    if (key === 'password') {
      if (password.isVisible) {
        password.isVisible = false;
        $password.current.type = 'password';
      } else {
        password.isVisible = true;
        $password.current.type = 'text';
      }
    } else if (key === 'passwordCheck') {
      if (password.isVisible) {
        passwordCheck.isVisible = false;
        $passwordCheck.current.type = 'password';
      } else {
        passwordCheck.isVisible = true;
        $passwordCheck.current.type = 'text';
      }
    }
  };

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupEmailInput
          ref={emailRef}
          onChange={handleEmailChange}
          value={email}
        />{' '}
        <br />
        <div style={{ width: '100%' }}>
          <SignupPasswordInput
            ref={$password}
            onChange={handlePasswordChange}
            value={password.value}
          />
          <Icons.EyeIcon
            onClick={() => handleClickEyeIcon('password')}
            style={{
              position: 'absolute',
              transform: 'translate(-25px,15px)',
              cursor: 'pointer',
            }}
          />
        </div>
        <br />
        <div style={{ width: '100%' }}>
          <SignupPasswordChkInput
            ref={$passwordCheck}
            onChange={handlePasswordCheckChange}
            value={passwordCheck.value}
          />
          <Icons.EyeIcon
            onClick={() => handleClickEyeIcon('passwordCheck')}
            style={{
              position: 'absolute',
              transform: 'translate(-25px,15px)',
              cursor: 'pointer',
            }}
          />
        </div>
        <br />
        <SubmitButton active={isActive} onClick={handleSubmit}>
          다음 단계 진행하기
        </SubmitButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </SignupForm>
    </SignupRowBlock>
  );
};

const SubmitButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  color: ${(props) => (props.active ? 'white' : '#BCB6B6')};
  background-color: ${(props) =>
    props.active ? styles.palette.unifolioBlue : '#F4F4F4'};
  pointer-events: ${(props) => (props.active ? '' : 'none')};
  border-radius: 5px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;

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
  autocomplete: 'on',
}))`
  width: 100%;
  ${styles.layout.signInput}

  &:focus {
    outline: none;
  }
`;
const SignupPasswordChkInput = styled.input.attrs((props) => ({
  type: 'password',
  name: 'password_check',
  placeholder: '비밀번호 재확인',
  autocomplete: 'on',
}))`
  width: 100%;
  ${styles.layout.signInput}

  &:focus {
    outline: none;
  }
`;
const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
`;
export default Signup01;
