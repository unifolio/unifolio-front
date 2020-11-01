import React, {useState, useCallback} from 'react';

const Signup01 = (props) => {
  const { onClickNext } = props;
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordCheck, SetPasswordCheck] = useState("");

  const handleEmailChange = useCallback((e) => {
    SetEmail(e.target.value);
  });

  const handlePasswordChange = useCallback((e) => {
    SetPassword(e.target.value);
  });

  const handlePasswordCheckChange = useCallback((e) => {
    SetPasswordCheck(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({email, password, passwordCheck}, 1);
  });

  return (
    <>
      <h1> 회원가입 </h1>
      <form onSubmit={handleSubmit}>
        email : <input type="text" name="email" onChange={handleEmailChange} /> <br />
        pwd : <input type="password" name="password" onChange={handlePasswordChange}/> <br />
        pwd_chk : <input type="password" name="password_check" onChange={handlePasswordCheckChange}/> <br />
        <button type="submit"> 다음으로 </button>
      </form>
    </>
  );
}

export default Signup01;
