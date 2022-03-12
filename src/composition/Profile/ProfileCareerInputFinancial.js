import React from "react";
import styled from "styled-components";

import CareerInput from "components/Inputs/CareerInput";

const ProfileCareerInputFinancial = ({
  addCareerInput,
  careerInputs,
  onCareerChange,
  onCareerDelete,
}) => {
  return (
    <CareerInputSection className="career-inputs-section">
      {careerInputs.map((careerInput, idx) => {
        console.log(" ==== 커리어 인풋 ==== ", careerInput);
        return (
          careerInput.type === "financial" && (
            <CareerInput
              key={`career-financial-${idx}`}
              type={careerInput.type}
              count={careerInput.count}
              value={careerInput.info}
              onCareerChange={onCareerChange}
              onCareerDelete={onCareerDelete}
            />
          )
        );
      })}
    </CareerInputSection>
  );
};

const CareerInputSection = styled.section``;

export default ProfileCareerInputFinancial;
