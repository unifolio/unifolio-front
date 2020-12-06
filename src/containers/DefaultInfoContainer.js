import React, { useState, useEffect } from 'react';
import DefaultInfo from '../composition/Profile/DefaultInfo';
import { API } from '../lib/api';

const DefaultInfoContainer = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const token = { token: localStorage.getItem('unifolioAccess') };
			const response = await API.post().tokenUser(token);
			console.log(response);
			setUser(response.data);
		};
		fetchData();
	}, []);

	return <DefaultInfo user={user} />;
};

export default DefaultInfoContainer;
