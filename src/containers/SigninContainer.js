import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../lib/api';

import { addUserData } from '../modules/reducers/signin';
import Signin from '../components/Signin/Signin';

const SigninContainer = () => {
	const dispatch = useDispatch();
	// API
	const onClickSignin = async (data) => {
		//  api
		const response = await API.post().newToken(data);
		if (response.status === 401) {
			alert('ID, 패스워드를 확인해주세요');
		}
		if (response.status === 200) {
			localStorage.setItem('unifolioAccess', response.data.access);
			const token = { token: response.data.access };
			const responseTokenUser = await API.post().tokenUser(token);
			console.log('responseTokenUser', responseTokenUser.status);
			if (responseTokenUser.status == 200) {
				localStorage.setItem('unifolioUser', JSON.stringify(responseTokenUser.data.data));
				// await dispatch(addUserData(responseTokenUser.data));
				window.location.href = '/profile';
			}
		}
	};

	// const onClickSignin = async (data) => {
	// 	//  api
	// 	const response = await API.postUserDataToGetToken(data);
	// 	console.log(response);
	// 	if (response.status === 401) {
	// 		alert('ID, 패스워드를 확인해주세요');
	// 	}
	// 	if (response.status === 200) {
	// 		localStorage.setItem('unifolioAccess', response.data.access);
	// 		window.location.href = '/finding-association?mode=waiting-people';
	// 	}
	// };

	// dispatch(getSignupStateThunk()).then(async (data) => {
	//   const response = await API.postUserData(data);
	//   if (response.status != "ok"){
	//     alert("not ok");
	//   } else {
	//     alert("회원가입이 완료되었습니다");
	//     window.location.href = "/signin";
	//   }
	// })

	return <Signin onClickSignin={onClickSignin} />;
};

export default SigninContainer;
