import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UnsettedButton from 'components/common/UnsettedButton';
import BusinessGeneralInformationInput from 'components/Inputs/BusinessGeneralInformationInput'

import useEducationInputs from 'hooks/useEducationInputs';

import styles from 'lib/styles';

const BusinessUnionCreate01 = ({ user, onClickNext }) => {
  const {
    educationInputs, EducationInput
  } = useEducationInputs({ user, at: window.location.href });
  
	const handleNext = () => {
		onClickNext({ owner: user.id }, 1);
	};

  const handleSubmitInformation = async () => {
    const userEducation = educationInputs.map((educationInput) => {
      if (Object.values(educationInput.info).includes(null)) return false;
      return {...educationInput.info}
    })
  
    console.log("==== update start ====")
    
    const targetData = {};
    if (!userEducation.includes(false)) targetData.education = userEducation;
    
    if (Object.values(targetData).length === 0) {
      alert("정보를 올바르게 입력해주세요.");
      return;
    }
    // handleSubmit({formData: targetData});
    console.log("==== update end ====")
    
  }

  if (!user.id) return <></>;
	return (
		<BusinessUnionCreate01Layout>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 법인 대표자에 관한 일반 사항 </AdditionalInfoSubTitle>
            <AdditionalInfoButtons>
              <Link to={'/profile'}>전체 수정하기</Link>
            </AdditionalInfoButtons>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <BusinessGeneralInformationInput user={user} isReadonly={true} />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 법인 대표자에 관한 학력 사항 </AdditionalInfoSubTitle>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <EducationInput 
            educationInputs={educationInputs} 
            type={"readonly"}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoRow style={{ alignItems: "center" }}>
        {
          (!user.name || !user.rrn || !user.address_postcode || !user.address || !user.address_detail) 
          ? alert("유저정보를 프로필에서 완성해주세요.")
          : (<NextButton onClick={handleNext}>임시 저장 후 다음 단계 진행하기</NextButton>)
        }
      </AdditionalInfoRow>
    </BusinessUnionCreate01Layout>
	);
};

const BusinessUnionCreate01Layout = styled.section`
		display: flex;
	flex-direction: column;

  section + section {
    margin-top: 50px;
  }

  section > .row + .row, .career-input-general > .row + .row, .career-input-financial > .row + .row {
    margin-top: 25px;
  }
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

export default BusinessUnionCreate01;