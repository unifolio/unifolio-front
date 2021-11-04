import React from 'react';
import { useHistory } from "react-router-dom";
import API  from '../lib/api';

import SigninPresentational from '../components/Signin/SigninPresentational';

const SigninContainer = () => {
  const history = useHistory();
	const handleSignin = async (data) => {
		const response = await API.post.newToken(data);
    
		if (response.status === 401) {
			alert('ID, 패스워드를 확인해주세요');
		}
		if (response.status === 200) {
			localStorage.setItem('unifolioAccess', response.data.access);
			const token = { accessToken: response.data.access };
      const responseByToken = await API.post.tokenToGetUser(token);
      
			if (responseByToken.status === 200) {
        history.push('/finding');        
			}
		}
	};

	return <SigninPresentational handleSignin={handleSignin} />;
};

export default SigninContainer;
