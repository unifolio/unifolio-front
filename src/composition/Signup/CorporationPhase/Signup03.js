import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import styles from 'lib/styles';

const Signup03 = (props) => {
	const { onClickNext, className } = props;
	const [phoneNumber, SetPhoneNumber] = useState('');
	const [authCode, SetAuthCode] = useState('');

	const authCodeRequest = () => {
		alert(Math.floor(Math.random() * 10000));
		document.querySelector('#authCodeInputField').style.display = 'block';
	};

	const handlePhoneNumberChange = useCallback((e) => {
		SetPhoneNumber(e.target.value);
	});

	const handleAuthCodeChange = useCallback((e) => {
		SetAuthCode(e.target.value);
	});

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		onClickNext({ phone_number: phoneNumber, auth_code: authCode }, 3, e.target.parentNode);
	});

	return (
		<SignupRowBlock className={className}>
			<h1> 회원가입 </h1>
			<SignupForm onSubmit={handleSubmit}>
				<SignupPhoneNumberInput onChange={handlePhoneNumberChange} /> <br />
				<button type="button" onClick={authCodeRequest}>
					인증번호 받기
				</button>
				<br />
				<SignupAuthCodeInput onChange={handleAuthCodeChange} /> <br />
				<button type="submit"> 다음으로 </button>
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
const SignupPhoneNumberInput = styled.input.attrs((props) => ({ type: 'text', name: 'phoneNumber', placeholder: '휴대폰번호' }))`
	${styles.layout.signInput}
`;

const SignupAuthCodeInput = styled.input.attrs((props) => ({ type: 'number', name: 'authCode', id: 'authCodeInputField', placeholder: '인증번호', required: true }))`
	display: none;
	${styles.layout.signInput}
`;

export default Signup03;
