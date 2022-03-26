import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import styles from 'lib/styles';

import Accordion from 'components/common/Accordion/Accordion';
import { useSelector } from 'react-redux';

const Signup04 = ({ onClickNext, onClickBack }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const signupStateFormData = useSelector((store) => store.signup);
  useEffect(() => {
    setSignupState(signupStateFormData);
  }, []);
  useEffect(() => {
    for (const key of ['approval_access_terms']) {
      if (!signupState[key]) {
        setIsComplete(false);
        return;
      }
    }
    setIsComplete(true);
  }, [signupState]);

  const handleCheck01Change = ({ target }) => {
    setSignupState((state) => ({
      ...state,
      approval_access_terms: !state.approval_access_terms,
    }));
  };

  const handleCheck02Change = ({ target }) => {
    setSignupState((state) => ({
      ...state,
      approval_marketing: !state.approval_marketing,
    }));
  };

  const handlePrev = () => {};
  const handleNext = () => {
    onClickNext(
      {
        ...signupState,
        approval_access_terms: signupState.approval_access_terms,
        approval_marketing: signupState.approval_marketing || false,
      },
      4,
    );
  };
  return (
    <SignupRowBlock>
      <SignupForm>
        <Accordion
          type={'signup'}
          checkBox1={
            <SignupCheckBoxLayer state={!!signupState.approval_access_terms}>
              <SignupCheckBoxInputLabel htmlFor='1'>
                {!!signupState.approval_access_terms ? '동의' : '미동의'}
              </SignupCheckBoxInputLabel>
              <SignupCheckBoxInput
                type='checkbox'
                id='1'
                onChange={handleCheck01Change}
                defaultChecked={signupState?.approval_access_terms}
              />
            </SignupCheckBoxLayer>
          }
          checkBox2={
            <SignupCheckBoxLayer state={!!signupState.approval_marketing}>
              <SignupCheckBoxInputLabel
                htmlFor='2'
                state={!!signupState.approval_access_terms}
              >
                {!!signupState.approval_marketing ? '동의' : '미동의'}
              </SignupCheckBoxInputLabel>
              <SignupCheckBoxInput
                type='checkbox'
                id='2'
                onChange={handleCheck02Change}
                defaultChecked={signupState?.approval_marketing}
              />
            </SignupCheckBoxLayer>
          }
        />
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
            완료하기
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

const SignupCheckBoxLayer = styled.div`
  color: ${({ state }) =>
    state ? styles.palette.unifolioBlue : styles.palette.deactiveGrey};
  display: flex;
  align-items: center;
  font-size: 18px;
  input[type='checkbox']:checked + label {
    background-color: ${styles.palette.unifolioBlue};
  }
`;

const SignupCheckBoxInput = styled.input``;
const SignupCheckBoxInputLabel = styled.label`
  margin-right: 10px;
  word-break: keep-all;
  cursor: pointer;
  margin-bottom: -2px;
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

export default Signup04;
