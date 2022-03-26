import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import UnsettedButton from 'components/common/UnsettedButton.js';
import Accordion from 'components/common/Accordion/Accordion';

const Signup03 = ({ signupInputData, onClickNext, onClickBack }) => {
  const [approval_access_terms, setCheck01] = useState(false);
  const [approval_marketing, setCheck02] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (approval_access_terms) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  const handleCheck01Change = (e) => {
    setCheck01(e.target.checked);
  };

  const handleCheck02Change = (e) => {
    setCheck02(e.target.checked);
  };

  const handleClickBackward = () => {
    console.log('handleClickBackward');
    onClickBack(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickNext({ approval_access_terms, approval_marketing }, 3);
  };

  return (
    <SignupRowBlock>
      <SignupForm>
        <Accordion
          type={'signup'}
          checkBox1={
            <SignupCheckBoxLayer state={!!approval_access_terms}>
              <SignupCheckBoxInputLabel htmlFor='1'>
                {!!approval_access_terms ? '동의' : '미동의'}
              </SignupCheckBoxInputLabel>
              <SignupCheckBoxInput
                type='checkbox'
                id='1'
                onChange={handleCheck01Change}
              />
            </SignupCheckBoxLayer>
          }
          checkBox2={
            <SignupCheckBoxLayer state={!!approval_marketing}>
              <SignupCheckBoxInputLabel
                htmlFor='2'
                state={!!approval_access_terms}
              >
                {!!approval_marketing ? '동의' : '미동의'}
              </SignupCheckBoxInputLabel>
              <SignupCheckBoxInput
                type='checkbox'
                id='2'
                onChange={handleCheck02Change}
              />
            </SignupCheckBoxLayer>
          }
        />
      </SignupForm>
      <Buttons>
        <BackwardButton onClick={handleClickBackward}>뒤로가기</BackwardButton>
        <SubmitButton onClick={handleSubmit} active={isActive}>
          회원 가입하기
        </SubmitButton>
      </Buttons>
    </SignupRowBlock>
  );
};

const Buttons = styled.div`
  display: flex;
`;

const SignupButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  color: ${(props) => (props.active ? 'white' : '#BCB6B6')};
  background-color: ${(props) =>
    props.active ? styles.palette.unifolioBlue : '#F4F4F4'};
  border-radius: 5px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;

const SubmitButton = styled(SignupButton)`
  color: ${(props) => (props.active ? 'white' : '#BCB6B6')};
  background-color: ${(props) =>
    props.active ? styles.palette.unifolioBlue : '#F4F4F4'};
  pointer-events: ${(props) => (props.active ? '' : 'none')};
`;

const BackwardButton = styled(SignupButton)`
  width: 40%;
  margin-right: 15px;
  background-color: ${styles.palette.unifolioBlue};
  color: white;
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

export default Signup03;
