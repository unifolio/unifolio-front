import React from 'react';

import DefaultInfoGeneral from 'composition/Profile/DefaultInfoGeneral.js';
import DefaultInfoBusiness from 'composition/Profile/DefaultInfoBusiness.js';

import API from 'lib/api';

const DefaultInfoContainer = ({ user }) => {
	// const [user, setUser] = useState(JSON.parse(localStorage.getItem('unifolioUser')));
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
