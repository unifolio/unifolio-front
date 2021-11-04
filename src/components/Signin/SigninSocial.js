import React, { useState, useEffect } from 'react';

const SigninSocial = ({ children }) => {
  const [signinInstance, setSigninInstance] = useState(null)
  // const clientId = "aqhPGNC46YJwoCymHo_9";
  // const callbackUrl = "http://localhost:3000/users/signin/naver/callback/";

  useEffect(() => {  
    console.log(signinInstance);
    if (signinInstance) {
      signinInstance.init();
      return; 
    }
    const script = document.createElement('script');
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
    script.type = "text/javascript"
    script.onload = () => { 
      setSigninInstance(
        new window.naver.LoginWithNaverId({
          clientId: "aqhPGNC46YJwoCymHo_9",
          // callbackUrl: "http://localhost:3000/users/signin/naver/callback/", 
          callbackUrl: "https://unifolio.kr/users/signin/naver/callback/", 
          isPopup: false, // popup 형식으로 띄울것인지 설정
          state: "UNIFOLIO_NAVER_LOGIN"
        })
      );
      // console.log(naverLogin)
      // naverLogin.init();
    }
    document.body.appendChild(script);
  }, [signinInstance]);
  
  const ProviderLink = () => {
    return "https://unifolio.kr:8080/users/signin/naver/"
  }

  if (!signinInstance) return <></>
  return (
    // <a href={ProviderLink()}>
      <a id='naverIdLogin' href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${signinInstance.clientId}&state=${signinInstance.state}&redirect_uri=${signinInstance.callbackUrl}`}>
       {children}
      </a>    
    // </a>
  )
}

export default SigninSocial
