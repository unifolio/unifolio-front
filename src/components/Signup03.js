import React, {useState, useCallback} from 'react';

const Signup03 = (props) => {
  const { onClickNext } = props;
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [authCode, SetAuthCode] = useState("");

  const authCodeRequest = () => {
    alert(Math.floor(Math.random()*10000));
    document.querySelector("#authCodeInputField").style.display = "block";
  }

  const handlePhoneNumberChange = useCallback((e) => {
    SetPhoneNumber(e.target.value);
  });

  const handleAuthCodeChange = useCallback((e) => {
    SetAuthCode(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({phoneNumber, authCode}, 3);
  });

  return (
    <>
      <h1> 회원가입 </h1>
      <form onSubmit={handleSubmit}>
        휴대폰번호 : <input type="text" name="phoneNumber" onChange={handlePhoneNumberChange} /> <br />
        <button type="button" onClick={authCodeRequest}> 인증번호 받기 </button> <br />
        인증번호 : <input type="number" id="authCodeInputField" name="authCode" style={{"display":"none"}} onChange={handleAuthCodeChange}/> <br />
        <button type="submit"> 다음으로 </button>
      </form>
    </>
  );
}

export default Signup03;
