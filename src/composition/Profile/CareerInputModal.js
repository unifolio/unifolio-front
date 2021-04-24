import React from 'react'
import styled from 'styled-components';
import { Select, Button } from 'antd';

import CareerInput from 'components/Inputs/CareerInput';

const CareerInputModal = ({addCareerInput, careerInputs, onCareerChange, onCareerDelete}) => {
  return (
    <CareerInputSection className="career-inputs-section">
      <div className="row">
        <div className="title with-select-button">
          <h2> 학력 사항 입력 </h2>
          <div className="column contents">
            <Button size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addCareerInput}> 
              추가
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="career-inputs">
          <div className="career-input-general career-inputs-general-modal"> 
            <h2>일반 경력사항 </h2>
            <div className="career-input-general-contents">
              {careerInputs.map((input, index) => {
                return input.type === "general" && (
                    <CareerInput type={input.type} count={input.idx} key={`career-${index}`} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </CareerInputSection>   
  )
}

const CareerInputSection = styled.section`

`

export default CareerInputModal;