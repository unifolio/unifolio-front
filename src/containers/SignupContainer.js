import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { addIDPW, addPersonalInfo, addPhone, addAgreement, getSignupStateThunk } from '../modules/reducers/signup';

import Signup01 from '../components/Signup/Signup01';
import Signup02 from '../components/Signup/Signup02';
import Signup03 from '../components/Signup/Signup03';
import Signup04 from '../components/Signup/Signup04';

import { API } from '../lib/api';

const SignupContainer = () => {
	const dispatch = useDispatch();

	const onClickNext = (formData, process, target) => {
		console.log(formData, target);
		switch (process) {
			case 1:
				target.classList.add('deactivate');
				target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addIDPW(formData));
				break;
			case 2:
				target.classList.add('deactivate');
				target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addPersonalInfo(formData));
				break;
			case 3:
				target.classList.add('deactivate');
				target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addPhone(formData));
				break;
			case 4:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addAgreement(formData));
				dispatch(getSignupStateThunk()).then(async (data) => {
					const response = await API.post().newUser(data);
					if (response.status != 'ok') {
						alert('not ok');
					} else {
						alert('회원가입이 완료되었습니다');
						window.location.href = '/signin';
					}
				});
				break;
			default:
				console.log('onClickNext error');
		}
	};
	return (
		<SignupBlock>
			<Signup01 onClickNext={onClickNext} />
			<Signup02 onClickNext={onClickNext} className={'deactivate'} />
			<Signup03 onClickNext={onClickNext} className={'deactivate'} />
			<Signup04 onClickNext={onClickNext} className={'deactivate'} />
		</SignupBlock>
	);
};

const SignupBlock = styled.div`
	width: 100%;

	.deactivate {
		display: none;
	}
`;

export default SignupContainer;
