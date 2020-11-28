import React, { useState } from 'react';
import * as API from '../lib/api';

import Signin from '../components/Signin/Signin';

const SigninContainer = () => {
  
  const onClickSignin = async (data) => {
    //  api
    const response = await API.postUserDataToGetToken(data)
    console.log(response)
    if (response.status === 401) {
      alert("ID, 패스워드를 확인해주세요")
    }
    if (response.status === 200) {
      localStorage.setItem("unifolioAccess", response.data.access);
      window.location.href = "/finding-association?mode=waiting-people";
    }
  }

  // dispatch(getSignupStateThunk()).then(async (data) => {
  //   const response = await API.postUserData(data);
  //   if (response.status != "ok"){
  //     alert("not ok");
  //   } else {
  //     alert("회원가입이 완료되었습니다");
  //     window.location.href = "/signin";
  //   }
  // })

  return <Signin onClickSignin={onClickSignin} />;
}

export default SigninContainer;
