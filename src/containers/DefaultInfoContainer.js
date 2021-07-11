import React, { useState, useEffect } from 'react';

import DefaultInfoGeneral from 'composition/Profile/DefaultInfoGeneral.js';
import DefaultInfoBusiness from 'composition/Profile/DefaultInfoBusiness.js';

import API from 'lib/api';

const DefaultInfoContainer = () => {
	// const [user, setUser] = useState(JSON.parse(localStorage.getItem('unifolioUser')));
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
      const token = { 
        token: localStorage.getItem('unifolioAccess'), 
        user: localStorage.getItem('unifolioUser') 
      };
      console.log("token:", token);
			if (token.token === null) {
				// alert('로그인 기록이 없습니다 1');
				// localStorage.removeItem('unifolioUser');
				window.location.href = '/signin';
			}
      
      const response = await API.post.tokenToGetUser(token);
			if (response.status === 200 || response.status === 201) {
        console.log(response.data);
				setUser(response.data.data);
			} 
      else {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요');
				localStorage.removeItem('unifolioAccess');
				localStorage.removeItem('unifolioUser');
				window.location.href = '/signin';
			}
		};
		if (user === null) {
			fetchData();
		}
	}, [user]);

	const handleSubmit = async (data) => {
		const token = { token: localStorage.getItem('unifolioAccess') };
		const response = await API.post.tokenToGetUser(token);
		const userId = response.data.data.id;
		console.log(":handleSubmit", data);
		API.patch.usersGeneral(userId, data);
	};

  if (!user) return <></>;
	return (
    <>
      {user.role === "general" && <DefaultInfoGeneral user={user} handleSubmit={handleSubmit} />}
      {user.role === "business" && <DefaultInfoBusiness user={user} handleSubmit={handleSubmit} />}
    </>
  );
};

export default DefaultInfoContainer;
