import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import UnsettedButton from "components/common/UnsettedButton";
import InputAddHeader from "components/Inputs/InputAddHeader";
import BusinessGeneralInformationInput from "components/Inputs/BusinessGeneralInformationInput";

import useEducationInputs from "hooks/useEducationInputs";
import useCareerInputs from "hooks/useCareerInputs";
import useDaumPostcode from "hooks/useDaumPostcode";
// import useInvestHistoryInputs from "hooks/useInvestHistoryInputs";

import styles from "lib/styles";

const BusinessUnionCreate02 = ({
  user,
  unionCreateInputData,
  onClickNext,
  onClickBack,
}) => {
  const counts = useRef({ education: 2, career: 2, investHistory: 1 });
  const [formData, setFormData] = useState({
    name: unionCreateInputData.reviewer?.name ?? "",
    rrn: unionCreateInputData.reviewer?.rrn ?? "",
    address_postcode: unionCreateInputData.reviewer?.address_postcode ?? "",
    address: unionCreateInputData.reviewer?.address ?? "",
    address_detail: unionCreateInputData.reviewer?.address_detail ?? "",
    "rrn-front": unionCreateInputData.reviewer?.["rrn-front"] ?? "",
    "rrn-back": unionCreateInputData.reviewer?.["rrn-back"] ?? "",
    phone_number: unionCreateInputData.reviewer?.phone_number ?? "01011112222",
  });

  const { handleClickToChangeAddress } = useDaumPostcode(
    callbackCompleteSearchPostcodeProcess
  );
  // const generalInformations = [
  //   {labelKr: "이름", labelEn: "name", value:user.name},
  //   {labelKr: "주민번호", labelEn: "rrn", value:user.rrn},
  //   {labelKr: "우편번호", labelEn: "address_postcode", value:user.address_postcode},
  //   {labelKr: "주소", labelEn: "address", value:user.address},
  //   {labelKr: "상세 주소", labelEn: "address_detail", value:user.address_detail},
  // ];

  const { educationInputs, handleEducationInput, EducationInput } =
    useEducationInputs({
      user: user.reviewer ?? unionCreateInputData.reviewer,
      counts,
      at: window.location.href,
      isModifiable: true,
    });

  const { careerInputs, handleCareerInput, CareerInput } = useCareerInputs({
    user: user.reviewer ?? unionCreateInputData.reviewer,
    counts,
    at: window.location.href,
    isModifiable: true,
  });

  // 투자 심사역의 투자내역은 피그마에 없음
  // const {
  //   investHistoryInputs,
  //   handleInvestHistoryInput,
  //   ProfileInvestHistoryInput,
  // } = useInvestHistoryInputs({
  //   counts,
  //   user: user.reviewer ?? unionCreateInputData.reviewer,
  // });

  function callbackCompleteSearchPostcodeProcess(data) {
    setFormData({
      ...formData,
      address: data.address,
      address_postcode: data.zonecode,
    });
  }

  const handleInputChange = ({ name, value }) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handlePrev = () => {
    onClickBack(1);
  };

  const handleNext = () => {
    onClickNext(
      {
        reviewer: {
          ...formData,
          rrn: `${formData["rrn-front"]}${formData["rrn-back"]}`,
          education: educationInputs.map((each) => each.info),
          career: careerInputs.map((each) => ({
            ...each.info,
            option_type: "reviewer",
          })),
        },
      },
      2
    );
  };

  if (!user.id) return <></>;
  return (
    <BusinessUnionCreate02Layout>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle>
              {" "}
              투자 심사역에 관한 일반 사항{" "}
            </AdditionalInfoSubTitle>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <BusinessGeneralInformationInput
            user={formData}
            handleInputChange={handleInputChange}
            options={{ handleClickToChangeAddress }}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <InputAddHeader
              target={"투자 심사역에 관한 학력 사항"}
              handleClickActive={() => handleEducationInput.create()}
            />
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <EducationInput
            educationInputs={educationInputs}
            counts={counts}
            changeEducationInputType={handleEducationInput.changeType}
            onEducationDelete={handleEducationInput.delete}
            onEducationChange={handleEducationInput.update}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <InputAddHeader
              target={"투자 심사역에 관한 경력 사항"}
              handleClickActive={() => handleCareerInput.create()}
            />
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <CareerInput
            careerInputs={careerInputs}
            // addCareerInput={() => handleCareerInput.create}
            onCareerChange={handleCareerInput.update}
            onCareerDelete={handleCareerInput.delete}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoRow style={{ alignItems: "center" }}>
        <NextButton onClick={handleNext}>
          임시 저장 후 다음 단계 진행하기
        </NextButton>
        <br />
        <NextButton onClick={handlePrev}>이전 단계로 돌아가기</NextButton>
      </AdditionalInfoRow>
    </BusinessUnionCreate02Layout>
  );
};

const BusinessUnionCreate02Layout = styled.section`
  display: flex;
  flex-direction: column;

  section + section {
    margin-top: 50px;
  }

  section > .row + .row,
  .career-input-general > .row + .row,
  .career-input-financial > .row + .row {
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
`;

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

  display: flex;
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

  section > .row + .row,
  .career-input-general > .row + .row,
  .career-input-financial > .row + .row {
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
`;
const CancelButton = styled(Button)`
  color: ${styles.palette.deactiveGrey};
`;

const NextButton = styled.button`
  width: 50%;
  height: 3rem;
  border: none;
  padding: 0 1rem;
`;

export default BusinessUnionCreate02;
