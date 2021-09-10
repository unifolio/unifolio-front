import React from 'react'
import styled from 'styled-components';

import CareerInput from 'components/Inputs/CareerInput';

const ProfileCareerInputGeneral = ({addCareerInput, careerInputs, onCareerChange, onCareerDelete}) => {
  return (
    <CareerInputSection className="career-inputs-section">
      {careerInputs.map((careerInput, idx) => {
        console.log(careerInput)
        return careerInput.type === "general" && (
            <CareerInput 
              key={`career-${idx}`} 
              type={careerInput.type} count={careerInput.count} value={careerInput.info}
              onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} 
            />
          )
        })
      }
    </CareerInputSection>
  )
}

const CareerInputSection = styled.section``;

export default ProfileCareerInputGeneral;