import React, { useState, useEffect } from 'react';

import AdditionalInfo from 'composition/Profile/AdditionalInfo';

import API from 'lib/api';

const AdditionalInfoContainer = () => {
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
        console.log("user id", response.data.data.id);
        const userId = response.data.data.id;
        const userData = await API.get.userGeneral({ userId });
				setUser(userData.data.data);
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

	const handleSubmit = async ({formData}) => {
		const token = { token: localStorage.getItem('unifolioAccess') };
		const response = await API.post.tokenToGetUser(token);
		const userId = response.data.data.id;
		
    const result = await API.patch.usersGeneral(userId, formData);
    if (result.status === 200) {
      alert("업데이트가 완료되었습니다.");
      window.location.reload(); // for test
    }
    

	};

  if (!user) return <></>;
	return <AdditionalInfo user={user} handleSubmit={handleSubmit}/>;
};

export default AdditionalInfoContainer;
