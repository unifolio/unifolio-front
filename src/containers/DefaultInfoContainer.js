import React, { useState, useEffect } from 'react';
import DefaultInfo from 'composition/Profile/DefaultInfo';
import API from '../lib/api';

const DefaultInfoContainer = () => {
	// const [user, setUser] = useState(JSON.parse(localStorage.getItem('unifolioUser')));
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
      const token = { token: localStorage.getItem('unifolioAccess'), user: localStorage.getItem('unifolioUser') };
      console.log("token:", token);
			if (token.token === null) {
				alert('로그인 기록이 없습니다 1');
				// localStorage.removeItem('unifolioUser');
				// window.location.href = '/signin';
			}
      
      const response = await API.post.tokenUser(token);
			console.log('DefaultInfoContainer', response.status);
			if (response.status === 403) {
				alert('로그인이 만료되었습니다. 다시 로그인 해주세요 2');
				localStorage.removeItem('unifolioAccess');
				localStorage.removeItem('unifolioUser');
				window.location.href = '/signin';
			} else {
				console.log(response.data);
				setUser(response.data.data);
			}
		};
		if (user === null) {
			fetchData();
		}
	}, [user]);

	const handleSubmit = async (data) => {
		const token = { token: localStorage.getItem('unifolioAccess') };
		const response = await API.post.tokenUser(token);
		const userId = response.data.data.id;
		console.log(data);
		API.patch.user(userId, data);
	};

	return <DefaultInfo user={user} handleSubmit={handleSubmit} />;
};

export default DefaultInfoContainer;
