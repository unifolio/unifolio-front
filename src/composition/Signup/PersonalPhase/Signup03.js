import React, { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import styles from 'lib/styles';

const Signup03 = ({ onClickNext }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [isAuthActive, setIsAuthActive] = useState(false);

  useEffect(() => {
    for (const key of ["phoneNumber", "authCode"]) {
      if (!signupState[key]) {
        setIsComplete(false);
        return;
      }
    }
    setIsComplete(true);
  }, [signupState]);

	const authCodeRequest = () => {
		alert(Math.floor(Math.random() * 10000));
		setIsAuthActive(true);
	};

	const handlePhoneNumberChange = ({target}) => {
    setSignupState((state) => ({...state, phoneNumber: target.value}));
  }

	const handleAuthCodeChange = ({target}) => {
    setSignupState((state) => ({...state, authCode: target.value}));
  }

  const handlePrev = () => {}
  const handleNext = () => {
    onClickNext({...signupState, phone_number: signupState.phoneNumber, auth_code: signupState.authCode }, 3);
  }

	return (
		<SignupRowBlock>
			<SignupForm>
        <SignupPhoneNumberLayer>
          <SignupAuthCodeRequestButton>
            SKT (임시)
          </SignupAuthCodeRequestButton>  
          <SignupPhoneNumberInput onChange={handlePhoneNumberChange} />
          <SignupAuthCodeRequestButton onClick={authCodeRequest}>
            인증번호 받기
          </SignupAuthCodeRequestButton>
        </SignupPhoneNumberLayer>
				<br />
				{isAuthActive && <>
            <SignupAuthCodeInput onChange={handleAuthCodeChange} /> <br />
          </>
        } 
				<SignupButtonsLayer>
          <SignupPrevButton type="button" onClick={handlePrev}> 뒤로가기 </SignupPrevButton>
          <SignupNextButton type="button" onClick={handleNext} isComplete={isComplete} disabled={!isComplete}> 다음으로 </SignupNextButton>
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
const SignupForm = styled.form`
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
`
const SignupPhoneNumberInput = styled.input.attrs((props) => ({ type: 'text', name: 'phoneNumber', placeholder: '휴대폰번호' }))`
	${styles.layout.signInput}
  flex-grow: 1;
`;

const SignupAuthCodeInput = styled.input.attrs((props) => ({ type: 'number', name: 'authCode', id: 'authCodeInputField', placeholder: '인증번호', required: true }))`
	${styles.layout.signInput}
`;

const SignupAuthCodeRequestButton = styled.button`
  color: ${styles.palette.unifolioBlue};
  background: none;
  border: none;
`

const SignupButtonsLayer = styled.div`
  display: flex;

  button + button {
    margin-left: 15px;
  }
`

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

export default Signup03;
