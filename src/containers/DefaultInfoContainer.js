import React, { useState, useEffect } from 'react';
import DefaultInfo from '../composition/Profile/DefaultInfo';
import { API } from '../lib/api';

const DefaultInfoContainer = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	useEffect(() => {
		const fetchData = async () => {
			const token = { token: localStorage.getItem('unifolioAccess') };
			const response = await API.post().tokenUser(token);
			if (response.status === 403) {
				alert('로그인이 만료되었습니다. 다시 로그인 해주세요');
				localStorage.removeItem('unifolioAccess');
				localStorage.removeItem('unifolioUser');
				window.location.href = '/signin';
			} else {
				setUser(response.data);
			}
		};
		if (user === undefined) {
			fetchData();
		}
	}, []);

	return <DefaultInfo user={user} />;
};

export default DefaultInfoContainer;
