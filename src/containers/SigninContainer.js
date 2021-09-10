import React from 'react';
import API  from '../lib/api';

// import { addUserData } from '../modules/reducers/signin';
import SigninPresentational from '../components/Signin/SigninPresentational';

const SigninContainer = () => {

	// API
	// localStorage.removeItem('unifolioAccess');
	// localStorage.removeItem('unifolioUser');

	const onClickSignin = async (data) => {
		const response = await API.post.newToken(data);
    
		if (response.status === 401) {
			alert('ID, 패스워드를 확인해주세요');
		}
		if (response.status === 200) {
			localStorage.setItem('unifolioAccess', response.data.access);
			const token = { accessToken: response.data.access };
			
      const responseByToken = await API.post.tokenToGetUser(token);
      console.log(responseByToken)
			if (responseByToken.status === 200) {
				// localStorage.setItem('unifolioUser', JSON.stringify(responseByToken.data.data));
				// await dispatch(addUserData(responseTokenUser.data));
				window.location.href = '/profile';
			}
		}
	};

	return <SigninPresentational onClickSignin={onClickSignin} />;
};

export default SigninContainer;
