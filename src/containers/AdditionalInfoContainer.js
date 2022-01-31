import React from "react";

import AdditionalInfo from "composition/Profile/AdditionalInfo";
import AdditionalInfoBusiness from "composition/Profile/AdditionalInfoBusiness";

import API from "lib/api";

const AdditionalInfoContainer = ({ user }) => {
  const handleSubmit = async ({ formData }) => {
    if (user.role === "business") {
      const result = await API.patch.userBusiness(user.id, formData);
      if (result.data.status === 200) {
        alert("업데이트가 완료되었습니다.");
        window.location.reload(); // for test
      } else {
        alert("업데이트 오류입니다. 주어진 필드를 모두 채워주세요.");
      }
    }
    if (user.role === "general") {
      const result = await API.patch.userGeneral(user.id, formData);
      if (result.status === 200) {
        alert("업데이트가 완료되었습니다.");
        window.location.reload(); // for test
      } else {
        alert("업데이트 오류입니다. 주어진 필드를 모두 채워주세요.");
      }
    }
  };

  if (!user) return <></>;
  return (
    <>
      {user.role === "general" && (
        <AdditionalInfo user={user} handleSubmit={handleSubmit} />
      )}
      {user.role === "business" && (
        <AdditionalInfoBusiness user={user} handleSubmit={handleSubmit} />
      )}
    </>
  );
};

export default AdditionalInfoContainer;
