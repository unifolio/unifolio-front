import React from 'react'
import styled from 'styled-components';
import { Select } from 'antd';

import EducationInputWithSelect from 'components/Inputs/EducationInputWithSelect';

const ProfileEducationInput = ({educationInputs, changeEducationInput, onEducationDelete, onEducationSubmit, onEducationChange}) => {

  const handleClickEducationInputSubmit = () => {
    onEducationSubmit()
  }

  const handleChangeEducationInput = ({type, count}) => {
    changeEducationInput({type: type, count: count});
  }

  return (
    <EducationInputSection className="school-inputs-section">
      {educationInputs.map((educationInput, idx) => (
        <EducationInputLayer key={`education-${idx}`}>
          <Select name="education" size="large" onChange={(value) => { handleChangeEducationInput({type:value, count:educationInput.count}) }} placeholder="학력사항 선택">
            <Select.Option value="highschool">고등학교</Select.Option>
            <Select.Option value="university">대학교(전문학사/학사)</Select.Option>
            <Select.Option value="university_master">대학원(석사)</Select.Option>
            <Select.Option value="university_doctor">대학원(박사)</Select.Option>
          </Select>
          <EducationInputWithSelect type={educationInput.type} count={educationInput.count} value={educationInput.info} 
            onEducationDelete={onEducationDelete} onEducationChange={onEducationChange}
          />
        </EducationInputLayer>
      ))}
      <EducationInputSubmitLayer>
        <button onClick={handleClickEducationInputSubmit}>저장하기</button>
      </EducationInputSubmitLayer>
    </EducationInputSection>   
  )
}

const EducationInputSection = styled.section`
  width: 100%;
  
  .school-inputs {
    display: flex;
    flex-direction: column;
    align-items:flex-start;
  }
`;

const EducationInputSubmitLayer = styled.div`
  width: 100%;
`;

const EducationInputLayer = styled.div`
  width: 100%;

  display: flex;

  .ant-select { min-width: 195px; margin-right: 15px; }
`;

export default ProfileEducationInput;