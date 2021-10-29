import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import UnsettedButton from 'components/common/UnsettedButton.js';

import * as Icons from "components/common/Icons";

const Signup02 = ({ onClickNext, onClickBack, signupInputData }) => {
  const [corporate_name, setCorporateName] = useState(signupInputData.corporate_name ?? "");
  const [company_registration_number, setCompanyRegistrationNumber] = useState(signupInputData.company_registration_number ?? "");
  const [corporate_registration, setCorporateRegistration] = useState(signupInputData.corporate_registration ?? "");
  const [postcode, setPostCode] = useState(signupInputData.address_postcode_business ?? "");
  const [address, setAddress] = useState(signupInputData.address_business ?? "");
  const [addressDetail, setAddressDetail] = useState(signupInputData.address_detail_business ?? "");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => { console.log("is onload ?"); }
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isActivatable([corporate_name, company_registration_number, corporate_registration, postcode, address, addressDetail])) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })
  
  const isActivatable = (dependentData) => {
    return dependentData.includes("") ? false : true;
  }
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
        setPostCode(postcode);
        setAddress(address);
      }
    }).open();
  }
  
  const handleChangeCorporateName = (e) => { setCorporateName(e.target.value); }
  
  const handleChangeCompanyRegistrationNumber = (e) => {
    if (e.target.value.length > 10) {
      alert("사업자등록번호는 10자를 초과할 수 없습니다."); 
      e.target.value = e.target.value.slice(0, e.target.value.length-1);
      return;
    }   
    setCompanyRegistrationNumber(e.target.value);
  }

  const handleCorporateRegistration = (e) => {
    if (e.target.value.length > 13) {
      alert("법인등록번호는 13자를 초과할 수 없습니다."); 
      e.target.value = e.target.value.slice(0, e.target.value.length-1);
      return;
    }
    setCorporateRegistration(e.target.value);
  }

  const handleChangeAddressDetail = (e) => { setAddressDetail(e.target.value); }

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickNext({
      corporate_name, company_registration_number, corporate_registration, 
      address_postcode_business: postcode, address_business: address, address_detail_business: addressDetail
    }, 2);
  }

  const handleClickBackward = () => {
    onClickBack(1);
  }

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupCorporationNameInput value={corporate_name} onChange={handleChangeCorporateName} /> <br />
        <div style={{width: "100%"}}>
          <SignupCompanyRegistrationNumberInput value={company_registration_number} onChange={handleChangeCompanyRegistrationNumber} />
          <Icons.SearchIcon 
            onClick={() => {}}
            style={{ position: "absolute", transform: "translateX(-25px)", cursor: "pointer" }}
          />
        </div> <br />
        <SignupCorporateRegistrationInput value={corporate_registration} onChange={handleCorporateRegistration} /> <br />
        {/* <SignupButton onClick={(e) => {e.preventDefault(); clickPostAdress(true)}}> 우편번호 찾기 </SignupButton> <br /> */}
        <div style={{width: "100%"}}>
          <SignupPostCodeInput value={postcode} onClick={clickPostAdress} />
          <Icons.SearchIcon 
            onClick={clickPostAdress}
            style={{ position: "absolute", transform: "translateX(-25px)", cursor: "pointer" }}
          />
        </div> <br />
        <SignupAddressInput value={address} onClick={clickPostAdress}/> <br />
        <SignupDetailAddressInput value={addressDetail} onChange={handleChangeAddressDetail} /> <br />
      </SignupForm>  
      <Buttons>
        <BackwardButton onClick={handleClickBackward}> 뒤로가기 </BackwardButton>
        <SubmitButton onClick={handleSubmit} active={isActive}> 다음으로 </SubmitButton>
      </Buttons>
    </SignupRowBlock>
  );
}

const Buttons = styled.div`
  display: flex;
`;

const SignupButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  border-radius: 5px;
  background-color: #F4F4F4;
  
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;

const SubmitButton = styled(SignupButton)`
  color: ${props => props.active ? "white" : "#BCB6B6"};
  background-color: ${props => props.active ? styles.palette.unifolioBlue : "#F4F4F4"}; 
  pointer-events: ${props => props.active ? "" : "none"}; 
`;

const BackwardButton = styled(SignupButton)`
  width: 40%;
  margin-right: 15px;
  background-color: ${styles.palette.unifolioBlue}; 
  color: white;
`

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
  width: 100%;
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
  width: 100%;
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
