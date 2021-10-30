import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import styles from 'lib/styles';
import useDaumPostcode from 'hooks/useDaumPostcode';

const DefaultInfoBusiness = ({ user, handleSubmit }) => {
  const [isModifing, setIsModifing] = useState(false);
  const [formData, setFormData] = useState({...user});
  const { handleClickToChangeAddress } = useDaumPostcode(callbackCompleteSearchPostcodeProcess)
  const informations = [
    {labelKr: "법인 이름", labelEn: "corporate_name", value:user.corporate_name},
    {labelKr: "이메일", labelEn: "email", value:user.email},
    {labelKr: "사업자 등록번호", labelEn: "corporate_registration", value:user.corporate_registration},
    {labelKr: "법인 등록번호", labelEn: "company_registration_number", value:user.company_registration_number},
    // {labelKr: "연락처", labelEn: "phone_number", value:user.phone_number ?? "연락처 입력이 필요합니다"},
    {labelKr: "우편번호", labelEn: "address_postcode_business", value:user.address_postcode_business},
    {labelKr: "사무실 주소", labelEn: "address_business", value:user.address_business},
    {labelKr: "사무실 상세 주소", labelEn: "address_detail_business", value:user.address_detail_business},
    {labelKr: "법인 설명", labelEn: "introduction", value:user.introduction}
  ];
  
  function callbackCompleteSearchPostcodeProcess(data) {
    setFormData({...formData, address_business: data.address, address_postcode_business: data.zonecode });
  }

  const handleClickModifyButton = () => {
    setIsModifing(!isModifing);
    if (!isModifing) {
      setFormData({...user});
    } else {
      handleSubmit(formData);
    }
  }
  const handleInputChange = ({name, value}) => {
    const newFormData = {...formData, [name]: value }
    setFormData(newFormData);
  }

	return (
		<DefaultInfoLayout>
			<DefaultInfoHeader>
        <DefaultInfoTitle> 회원 정보 </DefaultInfoTitle>
        <DefaultInfoModifyButton isModifing={isModifing} onClick={handleClickModifyButton} />
        {isModifing && <DefaultInfoModifyCancelButton onClick={() => setIsModifing(false)} /> }
      </DefaultInfoHeader>
			<HeadlineBottomBorder />
      {!isModifing
      ? <InfoPresenter>
          {informations.map(({labelKr, labelEn, value}) => (
            <InfoRow key={`${labelEn}-modify`}>
              <InfoLabel>{labelKr}</InfoLabel>
              <InfoContents>{value ?? `${labelKr} 입력이 필요합니다.`}</InfoContents>
            </InfoRow>
          ))}
        </InfoPresenter>
      : <InfoModifier>
          {informations.map(({labelKr, labelEn}) => {
            if (labelEn === "address_business" || labelEn === "address_postcode_business") {
              return (
                <InfoRow key={`${labelEn}-modify`}>
                  <InfoLabel>{labelKr}</InfoLabel>
                  <DefaultInfoInput 
                    readonly={true} placeHolder={user[labelEn] ?? ""}
                    value={formData[labelEn] ?? ""}
                    onClick={handleClickToChangeAddress}
                  />
                </InfoRow>
              )
            } else {
              return (
                <InfoRow key={`${labelEn}-modify`}>
                  <InfoLabel>{labelKr}</InfoLabel>
                  <DefaultInfoInput 
                    placeHolder={user[labelEn]} 
                    value={formData[labelEn] ?? ""}
                    onChange={(e) => {handleInputChange({name:labelEn, value:e.target.value})}} 
                  />
                </InfoRow>
              )
            }
          })}
        </InfoModifier>
      }
		</DefaultInfoLayout>
	);
};

const DefaultInfoLayout = styled.section`
	margin-top: 3rem;
	
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
`;

const HeadlineBottomBorder = styled.div`
	border-bottom: 2px solid;
	margin-bottom: 2rem;
`;

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

export default DefaultInfoBusiness;