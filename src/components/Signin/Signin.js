import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import styles from '../../lib/styles';

const Signin = ( props ) => {
  const { onClickSignin } = props;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
    
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleRememberChange = (e) => {
    console.log(e.target.value)
  }

  const handleSignin = useCallback((e) => {
    e.preventDefault();
    onClickSignin({email, password});
  });
  
  return (
    <SigninPosition>
      <SigninBlock>
        <SigninBlockRow>
          <h1> Sign in </h1>
        </SigninBlockRow>
        <SigninIdInput onChange={handleEmailChange} /> <br />
        <SigninPasswordInput onChange={handlePasswordChange} /> <br />
        <button onClick={handleSignin}> 로그인 </button>
        <SigninBlockBottom>
          <div>
            <input type="checkbox" onClick={handleRememberChange} /> Remeber me
          </div>
          <div> Forgot Password? </div>
        </SigninBlockBottom>
        <SigninBlockRow> or you can join with </SigninBlockRow>
        <SigninBlockSocials>
          <button> 1 </button>
          <button> 2 </button>
          <button> 3 </button>
          <button> 4 </button>
        </SigninBlockSocials>
        <SigninBlockRow> 
          Don't have any account? 
          <Link to="/signup"> Sign-up </Link>
        </SigninBlockRow>
      </SigninBlock>
      
    </SigninPosition>
  );
}

const SigninPosition = styled.div`
  height:calc(100vh - 4rem);
  ${styles.layout.marginContainer}
  
  display:flex;
  justify-content: center;
`

const SigninBlock = styled.div`
  width: 60%;
  margin-top: 10%;
  
  display:flex;
  flex-direction:column; 
  
  h1 {
    display:flex;
    justify-content: center;
  }
  button {
    height: 3rem;
    border: none;
  }
`
const SigninBlockRow = styled.div`
  padding-top:1rem;
  display:flex;
  justify-content: space-evenly;
`
const SigninBlockBottom = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: row;
  justify-content: space-between;
`
const SigninBlockSocials = styled.div`
  padding-top:2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`
const SigninIdInput = styled.input.attrs(
  props => ({ type: "text", name: "email", placeholder: "User ID" })
)`
  height: 3rem;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0 1rem;
`;
const SigninPasswordInput = styled.input.attrs(
  props => ({type: "password", name:"password", placeholder: "Password"})
)`
  height: 3rem;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0 1rem;
`

export default Signin;
