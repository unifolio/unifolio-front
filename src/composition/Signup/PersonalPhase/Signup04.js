import React, { useState, useCallback, useEffect } from 'react';
import styled, {css} from 'styled-components';
import styles from 'lib/styles';

import Accordion from 'components/common/Accordion/Accordion';

const Signup04 = ({ onClickNext }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    for (const key of ["approval_access_terms", "approval_marketing"]) {
      if (!signupState[key]) {
        setIsComplete(false);
        return;
      }
    }
    setIsComplete(true);
  }, [signupState]);

  const handleCheck01Change = ({target}) => {
    setSignupState((state) => ({...state, approval_access_terms: target.value}));
  }
  
  const handleCheck02Change = ({target}) => {
    setSignupState((state) => ({...state, approval_marketing: target.value}));
  }

  const handlePrev = () => {}
  const handleNext = () => {
    onClickNext({...signupState}, 4);
    // onClickNext({...signupState, phone_number: signupState.phoneNumber, auth_code: signupState.authCode }, 3);
  }

  return (
    <SignupRowBlock>
      <h1>해당 필드 퍼블리싱 미완</h1>
      <SignupForm>
        <Accordion type={"signup"}/>
        <SignupCheckBoxLayer>
          <SignupCheckBoxInput type="checkbox" id="check01" />
          <SignupCheckBoxInputLabel htmlFor="check01" onClick={handleCheck01Change} />
        </SignupCheckBoxLayer>
        <SignupCheckBoxLayer>
          <SignupCheckBoxInput type="checkbox" id="check02" />
          <SignupCheckBoxInputLabel htmlFor="check02" onClick={handleCheck02Change} />
        </SignupCheckBoxLayer>
        <SignupButtonsLayer>
          <SignupPrevButton type="button" onClick={handlePrev}> 뒤로가기 </SignupPrevButton>
          <SignupNextButton type="button" onClick={handleNext} isComplete={isComplete} disabled={!isComplete}> 완료하기 </SignupNextButton>
        </SignupButtonsLayer>
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

const SignupCheckBoxLayer = styled.div`
  color: ${styles.palette.unifolioBlue};
  display: flex;
  align-items: center;
  
  ::before {
    content: "동의하기";
    margin-left: 10px;
  }
  
  input[type='checkbox']:checked + label {
    background-color: ${styles.palette.unifolioBlue};
  }
`;

const SignupCheckBoxInput = styled.input`
  display: none;
`;
const SignupCheckBoxInputLabel = styled.label`
  width: 1.2rem;
  height: 1.2rem;
  
  border: 1px solid ${styles.palette.unifolioBlue};
  cursor: pointer;
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

const SignupPrevButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
`

export default Signup04;
