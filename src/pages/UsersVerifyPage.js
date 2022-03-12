import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "lib/api";

const UsersVerifyPage = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes("/users/verify/")) {
      const fetchVerifyEmail = async () => {
        const [key] = window.location.pathname.split("/").slice(-1);
        const result = await API.get.userVerify({ key });
        if (result.status === 200 || result.status === 202) {
          alert(result.data.message);
          setIsVerified(true);
        } else {
          alert(result.data.message);
        }
      };
      fetchVerifyEmail();
    }
  }, []);

  return (
    <div>
      메일을 인증하고 있습니다.
      {isVerified && <Redirect to={"/signin"} />}
    </div>
  );
};

export default UsersVerifyPage;
