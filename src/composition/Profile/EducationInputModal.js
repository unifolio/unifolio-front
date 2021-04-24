import React from 'react'
import styled from 'styled-components';
import { Button, Select } from 'antd';

import EducationInput from 'components/Inputs/EducationInput';

const EducationInputModal = ({addEducationInput, onChangeSelect, educationInputs, onEducationChange, onEducationDelete, onEducationSubmit}) => {

  const handleClickEducationInputSubmit = () => {
    onEducationSubmit()
  }

  return (
    <EducationInputSection className="school-inputs-section">
      <div className="row">
        <div className="title with-select-button">
          <h2> 학력 사항 입력 </h2>
          <div className="column contents">
            <Select name="education" size="large" onChange={(value) => { onChangeSelect({type:"education", value}) }} placeholder="입력하실 학력 사항을 선택해주세요">
              <Select.Option value="highschool">고등학교</Select.Option>
              <Select.Option value="university">대학교(전문학사/학사)</Select.Option>
              <Select.Option value="university_master">대학원(석사)</Select.Option>
              <Select.Option value="university_doctor">대학원(박사)</Select.Option>
            </Select>
            <Button size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addEducationInput}> 
              추가
            </Button>
          </div>
        </div>
      </div>
      <div className="row school-inputs-modal">
        <div className="school-inputs">
          {educationInputs.map((input, index) => (
              <EducationInput type={input.type} count={input.count} value={input.info} key={`education-${index}`} onEducationChange={onEducationChange} onEducationDelete={onEducationDelete} />
            )
          )}
        </div>
      </div>
      <section>
        <button onClick={handleClickEducationInputSubmit}> 전송 </button>
      </section>
    </EducationInputSection>   
  )
}

const EducationInputSection = styled.section`

`

export default EducationInputModal
