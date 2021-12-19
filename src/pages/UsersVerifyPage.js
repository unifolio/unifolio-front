import React, { useEffect } from "react";
import API from 'lib/api';

const UsersVerifyPage = () => {
  
  useEffect(() => {
    if (window.location.pathname.includes('/users/verify/')) {
      const key = window.location.pathname.split("/").slice(-1)[0];
      const result = API.get.userVerify({ key });
      console.log("result", result);
    } 
  }, [])

  return (
    <div>
      메일을 인증하고 있습니다.
    </div>
  )
}

export default UsersVerifyPage;