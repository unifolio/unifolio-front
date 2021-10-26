import React, { useState, useEffect } from 'react';

const SigninSocial = ({ children }) => {
  
  useEffect(() => {  
    const script = document.createElement('script');
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
    script.type = "text/javascript"
    // script.char = "utf-8"
    script.onload = () => { 
      console.log("is onload ?"); 
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "aqhPGNC46YJwoCymHo_9",
        callbackUrl: "http://localhost:3000/users/signin/naver/callback/", 
        isPopup: false, // popup 형식으로 띄울것인지 설정
        loginButton: { color: 'white', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
      });
      naverLogin.init();
    }
    document.body.appendChild(script);
  }, []);
  
  const ProviderLink = () => {
    return "https://unifolio.kr:8080/users/signin/naver/"
  }

  return (
    // <a href={ProviderLink()}>
      <button id='naverIdLogin'>
       {children}
      </button>    
    // </a>
  )
}

export default SigninSocial
