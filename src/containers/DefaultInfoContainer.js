import React from 'react';

import DefaultInfoGeneral from 'composition/Profile/DefaultInfoGeneral.js';
import DefaultInfoBusiness from 'composition/Profile/DefaultInfoBusiness.js';

import API from 'lib/api';

const DefaultInfoContainer = ({ user }) => {
	
	const handleSubmit = async (data) => {
    try {
      if (user.role === "business") {
        API.patch.userBusiness(user.id, data);
      } else if (user.role === "general") {
        API.patch.userGeneral(user.id, data);
      } else {
        throw new Error("DefaultInfoContainer, handleSubmit is error")
      }
      alert("업데이트가 진행됩니다."); // 여기서부터 임시
      window.location.href = window.location.href; 
    } catch (e) {
      console.error(e);
    }
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
