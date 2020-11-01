import React, {useState} from 'react';
import styled from 'styled-components';

const SigninPosition = styled.div`
  height:calc(100vh - 4rem);

  display:flex;
  justify-content: center;
  align-items: center;

`

const SigninBlock = styled.div`
  display:block;
  
`
const SigninPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleSignin = () => {
    if (email != "ryou9305@naver.com" || password != "123123"){
      alert("이메일과 비밀번호를 확인해주세요");
    } else {
      window.location.href = "/finding-association?mode=waiting-people"
    }
  }
  return (
    <SigninPosition>
      <SigninBlock>
        <h1> 로그인 </h1>
        이메일 <input type="text" name="email" onChange={handleEmailChange}/> <br />
        비밀번호 <input type="password" name="password" onChange={handlePasswordChange} /><br />
        <button onClick={handleSignin}> 로그인 </button>
      </SigninBlock>
    </SigninPosition>
  );
}

export default SigninPage;
