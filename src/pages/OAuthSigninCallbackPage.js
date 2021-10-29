import React, { useEffect } from 'react'
import API from 'lib/api';

const OAuthSigninCallbackPage = () => {

  useEffect(() => {
    switch (window.location.pathname) {
      case '/users/signin/naver/callback/': {
        const query = new URLSearchParams(window.location.search)
        const state = query.get("state");
        const code = query.get("code");
        console.log(state, code);
        console.log(API.get)
        const result = API.get.naverCallback({code});
        console.log("result", result);
        
      }
        
        break;
      default:
        break;
    }
  }, [])
  
  return (
    <div>
      <h1>로그인 중입니다</h1>
    </div>
  )
}

export default OAuthSigninCallbackPage;
