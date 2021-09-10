import React from 'react';

import AdditionalInfo from 'composition/Profile/AdditionalInfo';
import API from 'lib/api';

const AdditionalInfoContainer = ({ user }) => {
  
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
