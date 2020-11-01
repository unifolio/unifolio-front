import React, {useState, useCallback} from 'react';

const Signup04 = (props) => {
  const { onClickNext } = props;
  const [check01, SetCheck01] = useState(false)
  const [check02, SetCheck02] = useState(false);

  const authCodeRequest = () => {
    alert(Math.floor(Math.random()*10000));
    document.querySelector("#authCodeInputField").style.display = "block";
  }

  const handleCheck01Change = useCallback((e) => {
    SetCheck01(e.target.checked)
  });

  const handleCheck02Change = useCallback((e) => {
    SetCheck02(e.target.checked)
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({check01, check02}, 4);
  });

  return (
    <>
      <h1> 회원가입 </h1>
      <form onSubmit={handleSubmit}>
      개인정보 수집 및 이용에 관한 동의 (필수) <input type="checkbox" name="check01" onChange={handleCheck01Change} /> <br />
      <div>
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
      </div>
      홍보 및 마케팅에 관한 동의 (선택) <input type="checkbox" name="check02" onChange={handleCheck02Change}/> <br />
      <div>
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
      </div>
      <button type="submit"> 완료하기 </button>
      </form>
    </>
  );
}

export default Signup04;
