import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import UnsettedButton from 'components/common/UnsettedButton';
import BusinessGeneralInformationInput from 'components/Inputs/BusinessGeneralInformationInput'


import styles from 'lib/styles';

const BusinessUnionCreate04 = ({ user, unionCreateInputData, onClickNext, onClickBack }) => {
  
  const [formData, setFormData] = useState({
    address_postcode_union: user?.address_postcode_business ?? "",
    address_business_union: user?.address_business ?? "",
    address_detail_business_union: user?.address_detail_business ?? "",
    phone_union_1: user?.phone_union?.split("-")[0] ?? "",
    phone_union_2: user?.phone_union?.split("-")[1] ?? "",
    phone_union_3: user?.phone_union?.split("-")[2] ?? "",
    fax_union_1: user?.fax_union?.split("-")[0] ?? "",
    fax_union_2: user?.fax_union?.split("-")[1] ?? "",
    fax_union_3: user?.fax_union?.split("-")[2] ?? "",
    email_union: user?.email ?? "",
  });

  // user 값 불러온 후 재할당
  useEffect(() => {
    setFormData({
      ...formData, 
      phone_union_1: user?.phone_union?.split("-")[0] ?? "",
      phone_union_2: user?.phone_union?.split("-")[1] ?? "",
      phone_union_3: user?.phone_union?.split("-")[2] ?? "",
      fax_union_1: user?.fax_union?.split("-")[0] ?? "",
      fax_union_2: user?.fax_union?.split("-")[1] ?? "",
      fax_union_3: user?.fax_union?.split("-")[2] ?? "",
      email_union: user?.email ?? "",
    });
  }, [user])

  const generalInformations = [
    {labelKr: "우편번호", labelEn: "address_postcode_business", value:user?.address_postcode_business},
    {labelKr: "주소", labelEn: "address_business", value:user?.address_business},
    {labelKr: "상세 주소", labelEn: "address_detail_business", value:user?.address_detail_business},
  ];

  const handleInputChange = ({name, value}) => {
    setFormData({...formData, [name]: value })
  }

	const handleNext = () => {
    console.log(formData)
		onClickNext({ 
      ...formData, 
      phone_union: Number(`${formData.phone_union_1}${formData.phone_union_2}${formData.phone_union_3}`),
      fax_union: Number(`${formData.fax_union_1}${formData.fax_union_2}${formData.fax_union_3}`)
    }, 4);
	};
  
  const handlePrev = () => {
    onClickBack(3);
  }

  if (!user?.id) return <></>;
	return (
		<BusinessUnionCreate04Layout>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 조합 사무소 주소 </AdditionalInfoSubTitle>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {generalInformations.map(({labelKr, labelEn, value}) => {
            if (labelEn === "address_business" || labelEn === "address_postcode_business" || labelEn === "address_detail_business") {
              return (
                <InfoRow key={`${labelEn}-modify`}>
                  <InfoLabel>{labelKr}</InfoLabel>
                  <Input 
                    name={`${labelEn}`} value={value ?? ""} style={{ width: '30%' }} size="large" placeholder={labelKr} 
                    disabled={true}
                  />
                </InfoRow>
              )
            }
          })}
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection className={"phone_union"}>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 조합 사무소 전화번호 </AdditionalInfoSubTitle>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <InfoRow key={`phone_union-modify`}>
            <InfoLabel>전화번호</InfoLabel>
            <Input 
              name={`phone_union_1`} value={formData.phone_union_1 ?? ""} style={{ width: '30%' }} size="large" placeholder={""} 
              onChange={(e) => {handleInputChange({name:"phone_union_1", value:e.target.value})}} 
            />
            -
            <Input 
              name={`phone_union_2`} value={formData.phone_union_2 ?? ""} style={{ width: '30%' }} size="large" placeholder={""} 
              onChange={(e) => {handleInputChange({name:"phone_union_2", value:e.target.value})}} 
            />
            -
            <Input 
              name={`phone_union_3`} value={formData.phone_union_3 ?? ""} style={{ width: '30%' }} size="large" placeholder={""} 
              onChange={(e) => {handleInputChange({name:"phone_union_3", value:e.target.value})}} 
            />
          </InfoRow>
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection className={"fax_union"}>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 조합 사무소 Fax </AdditionalInfoSubTitle>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <InfoRow key={`fax_union-modify`}>
            <InfoLabel>팩스 주소</InfoLabel>
            <Input 
              name={`fax_union_1`} value={formData.fax_union_1 ?? ""} style={{ width: '30%' }} size="large" placeholder={""} 
              onChange={(e) => {handleInputChange({name:"fax_union_1", value:e.target.value})}} 
            />
            -
            <Input 
              name={`fax_union_2`} value={formData.fax_union_2 ?? ""} style={{ width: '30%' }} size="large" placeholder={""} 
              onChange={(e) => {handleInputChange({name:"fax_union_2", value:e.target.value})}} 
            />
            -
            <Input 
              name={`fax_union_3`} value={formData.fax_union_3 ?? ""} style={{ width: '30%' }} size="large" placeholder={""} 
              onChange={(e) => {handleInputChange({name:"fax_union_3", value:e.target.value})}} 
            />
          </InfoRow>
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection className={"email"}>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 조합 사무소 전자우편 </AdditionalInfoSubTitle>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <InfoRow key={`email_union-modify`}>
            <InfoLabel>이메일 주소</InfoLabel>
            <Input 
              name={`email_union`} value={formData.email_union} style={{ width: '30%' }} size="large" placeholder={""} 
              disabled={true}
            />
          </InfoRow>
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoRow style={{ alignItems: "center" }}>
        <NextButton onClick={handleNext}>임시 저장 후 다음 단계 진행하기</NextButton><br />
        <NextButton onClick={handlePrev}>이전 단계로 돌아가기</NextButton>
      </AdditionalInfoRow>
    </BusinessUnionCreate04Layout>
	);
};

const BusinessUnionCreate04Layout = styled.section`
		display: flex;
	flex-direction: column;

  section + section {
    margin-top: 50px;
  }

  section > .row + .row, .career-input-general > .row + .row, .career-input-financial > .row + .row {
    margin-top: 25px;
  }
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

const AdditionalInfoHeader = styled.div`
  display: flex;  
`;

const AdditionalInfoTitle = styled.span`
  font-size: var(--fontSize24);
  font-weight: bold;
`;

const AdditionalInfoSubTitle = styled.span`
  font-size: var(--fontSize20);
  font-weight: bold;
`

const AdditionalInfoSubmitButton = styled.button`
  width: 65px;

  margin-left: 20px;
  
  color: white;
  background-color: ${styles.palette.unifolioBlue};
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 30px;
  cursor: pointer;


`;

const AdditionalInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  
  & + & {
    margin-top: 24px;
  } 
`;

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
`;

const AdditionalInfoColumns = styled.div`
  width: 100%;
  
  display:flex;
  justify-content: space-between;
`;
const AdditionalInfoButtons = styled.div`
  display: flex;

  button + button {
    margin-left: 15px;
  }
`;

const AdditionalInfoSection = styled.section``;

const AdditionalInfoLayout = styled.section`
	display: flex;
	flex-direction: column;

  section + section {
    margin-top: 50px;
  }

  section > .row + .row, .career-input-general > .row + .row, .career-input-financial > .row + .row {
    margin-top: 25px;
  }

`;

const HeadlineBottomBorder = styled.div`
	border-bottom: 2px solid;
	margin: 1rem 0;
`;
const AdditionalInfoColumn = styled.section`
	display: flex;
`;

const Button = styled(UnsettedButton)`
  font-size: 16px;
  
  display: flex;
`;
const ActiveButton = styled(Button)`
  color: ${styles.palette.unifolioBlue};
`
const CancelButton = styled(Button)`
  color: ${styles.palette.deactiveGrey};
`

const NextButton = styled.button`
  width: 50%;
  height: 3rem;
  border: none;
  padding: 0 1rem;
`

export default BusinessUnionCreate04;