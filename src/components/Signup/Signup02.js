import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import styles from '../../lib/styles';

const Signup02 = (props) => {
  const { onClickNext, className } = props;
  const [name, SetName] = useState("");
  const [nickname, SetNickName] = useState("");
  const [rrn, SetRRN] = useState("");
  const [postcode, SetPostCode] = useState("");
  const [address, SetAddress] = useState("");
  const [addressDetail, SetAddressDetail] = useState("");
  
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => { console.log("is onload ?"); }
    document.body.appendChild(script);
  }, []);
  
  const clickPostAdress = (open = false) => {
    console.log("open", open);
    if (open === false ) {
      if (document.querySelector("input#postcode").value !== "") {
        return;
      }
    }
    
    new window.daum.Postcode({
      oncomplete: function(data) {
        console.log(data);
        let postcode = data.zonecode;
        let address = data.address;
        document.querySelector("input#postcode").value = postcode;
        document.querySelector("input#address").value = address;
        SetPostCode(postcode);
        SetAddress(address);
      }
    }).open();
  }
  
  const handleChangeName = useCallback((e) => {
    SetName(e.target.value);
  });
  
  const handleChangeNickName = useCallback((e) => {
    SetNickName(e.target.value);
  });

  const handleChangeRRN = useCallback((e) => {
    SetRRN(e.target.value);
  });

  const handleChangeAddressDetail = useCallback((e) => {
    SetAddressDetail(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({nickname, name, rrn, address_postcode: postcode, address, address_detail: addressDetail}, 2, e.target.parentNode);
  });

  

  return (
    <SignupRowBlock className={className}>
      <h1> 회원가입 </h1>
      <SignupForm onSubmit={handleSubmit}>
        <SignupNameInput onChange={handleChangeName}/> <br />
        <SignupNickNameInput onChange={handleChangeNickName}/> <br />
        <SignupRRNInput onChange={handleChangeRRN} /> <br />
        <button onClick={(e) => {clickPostAdress(true)}}> 우편번호 찾기 </button> <br />
        <SignupPostCodeInput onClick={clickPostAdress}/> <br />
        <SignupAddressInput onClick={clickPostAdress}/> <br />
        <SignupDetailAddressInput onChange={handleChangeAddressDetail} /> <br />
        <button type="submit"> 다음으로 </button>
      </SignupForm>  
    </SignupRowBlock>
  );
}

const SignupRowBlock = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: column;
`
const SignupForm = styled.form`
  display:flex;
  flex-direction:column;
`
const SignupNameInput = styled.input.attrs(
  props => ({ type: "text", name: "name", placeholder: "이름" })
)`
  ${styles.layout.signInput}
`;

const SignupNickNameInput = styled.input.attrs(
  props => ({ type: "text", name: "name", placeholder: "닉네임" })
)`
  ${styles.layout.signInput}
`;

const SignupRRNInput = styled.input.attrs(
  props => ({type: "text", name:"rrn", placeholder: "주민등록번호"})
)`
  ${styles.layout.signInput}
`

const SignupPostCodeInput = styled.input.attrs(
  props => ({type: "text", name:"postcode", id:"postcode", placeholder: "우편번호", readOnly: true, required:true})
)`
  ${styles.layout.signInput}
`;

const SignupAddressInput = styled.input.attrs(
  props => ({type: "text", name:"address", id:"address", placeholder: "주소", readOnly: true, required:true})
)`
  ${styles.layout.signInput}
`;
const SignupDetailAddressInput = styled.input.attrs(
  props => ({type: "text", name:"detail_address", id:"detail_address", placeholder: "상세 주소", required:true})
)`
  ${styles.layout.signInput}
`;


export default Signup02;
