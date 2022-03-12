import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import styles from 'lib/styles';
import { useSelector } from 'react-redux';
import API from 'lib/api';

const Signup03 = ({ onClickNext, onClickBack }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [isAuthActive, setIsAuthActive] = useState(false);
  const [isValidatePhoneNumber, setIsValidatePhoneNumber] = useState(false);
  const signupStateFormData = useSelector((store) => store.signup);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setSignupState(signupStateFormData);
  }, []);
  useEffect(() => {
    if (phoneNumberRegExp.test(signupState.phoneNumber)) {
      setIsValidatePhoneNumber(true);
    } else {
      setIsValidatePhoneNumber(false);
    }
  }, [signupState]);
  useEffect(() => {
    for (const key of ['phoneNumber', 'authCode']) {
      if (!signupState[key]) {
        setIsComplete(false);
        return;
      }
    }
    setIsComplete(true);
  }, [signupState]);

  const authCodeRequest = async (e) => {
    setIsLoading(true);
    await API.post.userSMS(signupState.phoneNumber);
    setIsLoading(false);
    setIsAuthActive(true);
  };

  const handlePhoneNumberChange = ({ target }) => {
    setSignupState((state) => ({ ...state, phoneNumber: target.value }));
  };

  const handleAuthCodeChange = ({ target }) => {
    setSignupState((state) => ({ ...state, authCode: target.value }));
  };

  const handlePrev = () => {};
  const handleNext = async () => {
    const response = await API.get.userSMSVerify(
      signupState.phoneNumber,
      signupState.authCode,
    );
    console.log(response);
    if (response.status !== 200) return;
    onClickNext(
      {
        ...signupState,
        phone_number: signupState.phoneNumber,
        auth_code: signupState.authCode,
      },
      3,
    );
  };
  const phoneNumberRegExp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{7})/;

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupPhoneNumberLayer>
          <SignupAuthCodeRequestButton>SKT (임시)</SignupAuthCodeRequestButton>
          <SignupPhoneNumberInput
            onChange={handlePhoneNumberChange}
            disabled={isAuthActive}
            defaultValue={signupStateFormData?.phoneNumber}
          />
          <SignupAuthCodeRequestButton
            onClick={authCodeRequest}
            disabled={!isValidatePhoneNumber && !isLoading}
          >
            인증번호 받기
          </SignupAuthCodeRequestButton>
        </SignupPhoneNumberLayer>
        <br />
        {isAuthActive && (
          <>
            <SignupAuthCodeInput onChange={handleAuthCodeChange} /> <br />
          </>
        )}
        <SignupButtonsLayer>
          <SignupPrevButton type='button' onClick={onClickBack}>
            뒤로가기
          </SignupPrevButton>
          <SignupNextButton
            type='button'
            onClick={handleNext}
            isComplete={isComplete}
            disabled={!isComplete}
          >
            다음으로
          </SignupNextButton>
        </SignupButtonsLayer>
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
const SignupPhoneNumberLayer = styled.div`
  display: flex;

  /* 임시 */
  button + input {
    margin-left: 15px;
  }
  input + button {
    margin-left: 15px;
  }
`;
const SignupPhoneNumberInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'phoneNumber',
  placeholder: '휴대폰번호 (01012341234)',
}))`
  ${styles.layout.signInput}
  flex-grow: 1;
`;

const SignupAuthCodeInput = styled.input.attrs((props) => ({
  type: 'number',
  name: 'authCode',
  id: 'authCodeInputField',
  placeholder: '인증번호',
  required: true,
}))`
  ${styles.layout.signInput}
`;

const SignupAuthCodeRequestButton = styled.button`
  color: ${styles.palette.unifolioBlue};
  background: none;
  border: none;
  ${({ disabled }) => {
    return disabled
      ? css`
          background-color: ${styles.palette.deactiveBackgroundGrey};
          color: ${styles.palette.deactiveGrey};
        `
      : css`
          color: ${styles.palette.unifolioBlue};
          background: none;
          border: none;
        `;
  }}
`;

const SignupButtonsLayer = styled.div`
  display: flex;

  button + button {
    margin-left: 15px;
  }
`;

const SignupNextButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  flex-grow: 1;

  ${({ isComplete }) => {
    return isComplete
      ? css`
          background-color: ${styles.palette.unifolioBlue};
          color: white;
        `
      : css`
          background-color: ${styles.palette.deactiveBackgroundGrey};
          color: ${styles.palette.deactiveGrey};
        `;
  }}
`;

const SignupPrevButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  cursor: pointer;
`;

export default Signup03;
