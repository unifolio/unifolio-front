import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import styles from 'lib/styles';

const Signup02 = (props) => {
  const { onClickNext, className } = props;
  const [corporate_name, SetCorporateName] = useState("");
  const [company_registration_number, SetCompanyRegistrationNumber] = useState("");
  const [corporate_registration, SetCorporateRegistration] = useState("");
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
  
  const handleChangeCorporateName = useCallback((e) => {
    SetCorporateName(e.target.value);
  });
  
  const handleChangeCompanyRegistrationNumber = useCallback((e) => {
    SetCompanyRegistrationNumber(e.target.value);
  });

  const handleCorporateRegistration = useCallback((e) => {
    SetCorporateRegistration(e.target.value);
  });

  const handleChangeAddressDetail = useCallback((e) => {
    SetAddressDetail(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({corporate_name, company_registration_number, corporate_registration, address_postcode: postcode, address, address_detail: addressDetail}, 2);
  });

  

  return (
    <SignupRowBlock className={className}>
      <SignupForm onSubmit={handleSubmit}>
        <SignupCorporationNameInput onChange={handleChangeCorporateName} /> <br />
        <SignupCompanyRegistrationNumberInput onChange={handleChangeCompanyRegistrationNumber} /> <br />
        <SignupCorporateRegistrationInput onChange={handleCorporateRegistration} /> <br />
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
const SignupCorporationNameInput = styled.input.attrs(
  props => ({ type: "text", name: "corporate_name", placeholder: "법인명" })
)`
  ${styles.layout.signInput}
`;

const SignupCompanyRegistrationNumberInput = styled.input.attrs(
  props => ({ type: "text", name: "company_registration_number", placeholder: "사업자등록번호" })
)`
  ${styles.layout.signInput}
`;

const SignupCorporateRegistrationInput = styled.input.attrs(
  props => ({type: "text", name:"corporate_registration", placeholder: "법인등록번호(13자리)"})
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
