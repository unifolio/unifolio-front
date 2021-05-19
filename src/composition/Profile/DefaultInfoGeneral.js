import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import styles from 'lib/styles';

const DefaultInfoGeneral = ({ user, handleSubmit }) => {
  const [isModifing, setIsModifing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {  
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => { console.log("is onload ?"); }
    document.body.appendChild(script);
  }, []);

	// useEffect(() => {
	// }, [user, isModifing]);

  const handleClickModifyButton = () => {
    setIsModifing(!isModifing);
    if (!isModifing) {
      setFormData({});
    } else {
      handleSubmit(formData);
    }
  }
  const handleInputChange = ({name, value}) => {
    const newFormData = {...formData, [name]: value }
    setFormData(newFormData);
  }

	const clickPostAdress = (open = false) => {
    if (open === false && document.querySelector("input#address_postcode").value !== "") {
      return;
    }
    
    new window.daum.Postcode({
      oncomplete: function(data) {
        document.querySelector("input#address_postcode").value = data.zonecode;
        document.querySelector("input#address").value = data.address;
        setFormData({...formData, address: data.address, address_postcode: data.zonecode });
      }
    }).open();
  }

  if (!user) return <></>;
	
  return (
		<DefaultInfoLayout>
      <DefaultInfoHeader>
        <DefaultInfoTitle> 회원 정보 </DefaultInfoTitle>
        <DefaultInfoModifyButton isModifing={isModifing} onClick={handleClickModifyButton} />
        {isModifing && <DefaultInfoModifyCancelButton onClick={() => setIsModifing(false)} /> }
      </DefaultInfoHeader>
			
			<BottomBorder />
      {!isModifing /* 컴포넌트로 분리 예정 */
      ? <InfoPresenter>
          <InfoRow>
            <InfoLabel>개인회원</InfoLabel>
            <InfoContents>{user.name} 님</InfoContents>
          </InfoRow>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <InfoContents>{user.nickname}</InfoContents>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이메일</InfoLabel>
            <InfoContents>{user.email}</InfoContents>
          </InfoRow>
          <InfoRow>
            <InfoLabel>연락처</InfoLabel>
            <InfoContents>{user.phone_number}</InfoContents>
          </InfoRow>
          <InfoRow>
            <InfoLabel>우편번호</InfoLabel>
            <InfoContents>{user.address_postcode}</InfoContents>
          </InfoRow>
          <InfoRow>
            <InfoLabel>등록 주소</InfoLabel>
            <InfoContents>{user.address}, {user.address_detail}</InfoContents>
          </InfoRow>
        </InfoPresenter>
      : <InfoModifier>
          <InfoRow>
            <InfoLabel>개인회원</InfoLabel>
            <DefaultInfoInput placeHolder={user.name} onChange={(e) => {handleInputChange({name:'name', value:e.target.value})}} />
          </InfoRow>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <DefaultInfoInput placeHolder={user.nickname} onChange={(e) => {handleInputChange({name:'nickname', value:e.target.value})}} />
          </InfoRow>
          <InfoRow>
            <InfoLabel>이메일</InfoLabel>
            <DefaultInfoInput placeHolder={user.email} onChange={(e) => {handleInputChange({name:'email', value:e.target.value})}} />
          </InfoRow>
          <InfoRow>
            <InfoLabel>연락처</InfoLabel>
            <DefaultInfoInput placeHolder={user.phone_number} onChange={(e) => {handleInputChange({name:'phone_number', value:e.target.value})}} />
          </InfoRow>
          <InfoRow>
            <InfoLabel>우편번호</InfoLabel>
            <DefaultInfoInput id={"address_postcode"} placeHolder={user.address_postcode} readonly={true} onClick={clickPostAdress} 
              onChange={(e) => {handleInputChange({name:'address_postcode', value:e.target.value})}} 
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>주소</InfoLabel>
            <DefaultInfoInput id={"address"} placeHolder={user.address} readonly={true} onClick={clickPostAdress}
              onChange={(e) => {handleInputChange({name:'address', value:e.target.value})}}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>상세 주소</InfoLabel>
            <DefaultInfoInput id={"address_detail"} placeHolder={user.address_detail}
              onChange={(e) => {handleInputChange({name:'address_detail', value:e.target.value})}}
            />
          </InfoRow>
          
        </InfoModifier>
      }
      
			
		</DefaultInfoLayout>
	);
};

const DefaultInfoLayout = styled.section`
  margin-top: 7rem;
	
  display: flex;
	flex-direction: column;
	
	& + section {
		margin-top: 5rem;
	}
`;

const DefaultInfoHeader = styled.header`
  
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DefaultInfoTitle = styled.span`
  font-size: var(--fontSize24);
  font-weight: bold;
`
const DefaultInfoModifyButton = styled.button`
  width: 65px;
  height: 80%;
  margin-left: 20px;
  border: 1px solid;
  border-radius: 30px;
  cursor: pointer;
  
  ${(props) => !props.isModifing
    ? css`
        color: ${styles.palette.unifolioBlue};
        background-color: white;
        ::after {
          content: "수정"
        }
      `
    : css`
        color: white;
        background-color: ${styles.palette.unifolioBlue};
        ::after {
          content: "저장"
        }
      `
  }
`;
const DefaultInfoModifyCancelButton = styled.button`
  width: 65px;
  height: 80%;
  margin-left: 15px;
  
  background-color: white;
  border: 1px solid black;
  border-radius: 30px;
  cursor: pointer;

  ::after {
    content: "취소"
  }
`

const InfoPresenter = styled.div``;
const InfoModifier = styled.div``;

const InfoRow = styled.div`
  display: flex;
  align-items:center;

  & + & {
    margin-top: 22px;
  }
`;

const InfoLabel = styled.div`
  color: grey;
  
  display: flex;
  flex-basis: 195px;
`

const InfoContents = styled.div`
  font-size: var(--fontSize20);
`;

const DefaultInfoInput = styled.input.attrs((props) => ({
  type: "text", placeholder: props.placeHolder, id: props.id, readOnly: props.readonly
}))`
  padding: 0;
  border: none;
  border-bottom: 1px solid grey;
  box-sizing: border-box;
  font-size: var(--fontSize20);

  flex-basis: 250px;
`;

const BottomBorder = styled.div`
	border-bottom: 1px solid;
	margin: 2rem 0;
`;


export default DefaultInfoGeneral;