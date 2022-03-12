import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import AdditionalInfoEditHeader from "composition/Profile/AdditionalInfoEditHeader";

import useEducationInputs from "hooks/useEducationInputs";
import useInvestHistoryInputs from "hooks/useInvestHistoryInputs";
import useDaumPostcode from "hooks/useDaumPostcode";

import palette from "lib/styles/palette";

const AdditionalInfoBusiness = ({ user, handleSubmit }) => {
  const counts = useRef({ education: 2, investHistory: 1 });
  const [formData, setFormData] = useState({
    ...user,
    rrn: user.rrn ? `${user.rrn.slice(0, 6)}-${user.rrn.slice(6)}` : "",
  });

  const [isModifiable, setIsModifiable] = useState({
    education: user.education.length !== 0 ? false : true,
    general:
      user.name ||
      user.rrn ||
      user.address ||
      user.address_postcode ||
      user.address_detail
        ? false
        : true,
    investHistory: user.invest_history?.length !== 0 ? false : true,
  });
  const { handleClickToChangeAddress } = useDaumPostcode(
    callbackCompleteSearchPostcodeProcess
  );
  const generalInformations = [
    { labelKr: "이름", labelEn: "name", value: user.name },
    {
      labelKr: "주민번호",
      labelEn: "rrn",
      value: `${user.rrn?.slice(0, 6)}-${user.rrn?.slice(6)}`,
    },
    {
      labelKr: "우편번호",
      labelEn: "address_postcode",
      value: user.address_postcode,
    },
    { labelKr: "주소", labelEn: "address", value: user.address },
    {
      labelKr: "상세 주소",
      labelEn: "address_detail",
      value: user.address_detail,
    },
  ];

  const {
    educationInputs,
    handleEducationInput,
    educationUtil,
    EducationInput,
  } = useEducationInputs({ counts, user, at: window.location.href });

  const {
    investHistoryInputs,
    handleInvestHistoryInput,
    ProfileInvestHistoryInput,
  } = useInvestHistoryInputs({ counts, user });

  function callbackCompleteSearchPostcodeProcess(data) {
    setFormData({
      ...formData,
      address: data.address,
      address_postcode: data.zonecode,
    });
  }

  const handleInputChange = ({ name, value }) => {
    // console.log(name, value, name === "rnn" && value.length === 7);
    let newFormData;
    if (name === "rrn" && value.length === 6 && value.slice(-1) !== "-") {
      newFormData = { ...formData, [name]: `${value}-` };
    } else if (
      name === "rrn" &&
      value.length === 7 &&
      value.slice(-1) === "-"
    ) {
      newFormData = { ...formData, [name]: value.substring(0, 6) };
    } else {
      newFormData = { ...formData, [name]: value };
    }
    // console.log(newFormData);
    setFormData(newFormData);
  };

  const handleSubmitInformation = async () => {
    const userEducation = educationInputs.map((educationInput) => {
      if (Object.values(educationInput.info).includes(null)) return false;
      return { ...educationInput.info };
    });

    const userInvestHistory = investHistoryInputs.map((investHistoryInput) => {
      if (Object.values(investHistoryInput.info).includes(null)) return false;
      // if (investHistoryInput.info.category.id) return {...investHistoryInput.info, category: {category: investHistoryInput.info.category.id} }
      return { ...investHistoryInput.info };
    });

    console.log("==== update start ====");

    const targetData = { ...formData };
    if (!userEducation.includes(false)) targetData.education = userEducation;
    if (!userInvestHistory.includes(false))
      targetData.invest_history = userInvestHistory;
    if (Object.values(targetData).length === 0) {
      alert("정보를 올바르게 입력해주세요.");
      return;
    }
    targetData.rrn = targetData.rrn.split("-").join("");
    handleSubmit({ formData: targetData });
    console.log("==== update end ====");
  };

  return (
    <AdditionalInfoLayout>
      <AdditionalInfoHeader>
        <AdditionalInfoTitle> 추가 정보 </AdditionalInfoTitle>
        <AdditionalInfoSubmitButton onClick={handleSubmitInformation}>
          저장
        </AdditionalInfoSubmitButton>
      </AdditionalInfoHeader>

      <HeadlineBottomBorder />

      <AdditionalInfoSection className={"investHistory"}>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoEditHeader
              target={"법인 투자 이력"}
              isModifiable={isModifiable.investHistory}
              handleToggleModify={() => {
                setIsModifiable({
                  ...isModifiable,
                  investHistory: !isModifiable.investHistory,
                });
              }}
              handleClickActive={handleInvestHistoryInput.create}
            />
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {!isModifiable.investHistory ? (
            user.invest_history.map((investHistoryData, i) => {
              return (
                <DescriptionLayer key={`investHistory-${i}`}>
                  <DescriptionColumnLeft>
                    {investHistoryData.company}
                  </DescriptionColumnLeft>
                  <DescriptionColumnRight>
                    {investHistoryData.description}
                  </DescriptionColumnRight>
                </DescriptionLayer>
              );
            })
          ) : (
            <ProfileInvestHistoryInput
              investmentHistoryInputs={investHistoryInputs}
              onInvestmentHistoryChange={handleInvestHistoryInput.update}
              onInvestmentHistoryDelete={handleInvestHistoryInput.delete}
            />
          )}
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection className={"general"}>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoEditHeader
              target={"법인 대표자에 관한 일반사항"}
              isModifiable={isModifiable.general}
              handleToggleModify={() => {
                setIsModifiable({
                  ...isModifiable,
                  general: !isModifiable.general,
                });
              }}
              // handleClickActive= {handleEducationInput.create}
            />
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {!isModifiable.general ? (
            generalInformations.map((generalData, i) => {
              return (
                <DescriptionLayer key={`general-${i}`}>
                  <DescriptionColumnLeft>
                    {generalData.labelKr}
                  </DescriptionColumnLeft>
                  <DescriptionColumnRight>
                    {generalData.value ??
                      `${generalData.labelKr} 입력이 필요합니다.`}
                  </DescriptionColumnRight>
                </DescriptionLayer>
              );
            })
          ) : (
            <InfoModifier>
              {generalInformations.map(({ labelKr, labelEn }) => {
                if (labelEn === "address" || labelEn === "address_postcode") {
                  return (
                    <InfoRow key={`${labelEn}-modify`}>
                      <InfoLabel>{labelKr}</InfoLabel>
                      <DefaultInfoInput
                        readonly={true}
                        placeHolder={user[labelEn] ?? ""}
                        value={formData[labelEn] ?? ""}
                        onClick={handleClickToChangeAddress}
                      />
                    </InfoRow>
                  );
                } else {
                  return (
                    <InfoRow key={`${labelEn}-modify`}>
                      <InfoLabel>{labelKr}</InfoLabel>
                      <DefaultInfoInput
                        placeHolder={user[labelEn]}
                        value={formData[labelEn] ?? ""}
                        onChange={(e) => {
                          handleInputChange({
                            name: labelEn,
                            value: e.target.value,
                          });
                        }}
                      />
                    </InfoRow>
                  );
                }
              })}
            </InfoModifier>
          )}
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection className={"education"}>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoEditHeader
              target={"법인 대표자에 관한 학력 사항"}
              isModifiable={isModifiable.education}
              handleToggleModify={() => {
                setIsModifiable({
                  ...isModifiable,
                  education: !isModifiable.education,
                });
              }}
              handleClickActive={() => handleEducationInput.create()}
            />
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {!isModifiable.education ? (
            user.education.map((educationData, i) => {
              return (
                <DescriptionLayer key={`education-${i}`}>
                  <DescriptionColumnLeft>
                    {educationUtil.selectEducationType(
                      educationData.education_type
                    )}
                  </DescriptionColumnLeft>
                  <DescriptionColumnRight>
                    {educationData.school_name}{" "}
                    {!educationData.major ? "" : educationData.major}{" "}
                    {educationUtil.selectAttendStatus(
                      educationData.attend_status
                    )}
                  </DescriptionColumnRight>
                </DescriptionLayer>
              );
            })
          ) : (
            <EducationInput
              educationInputs={educationInputs}
              changeEducationInputType={handleEducationInput.changeType}
              onEducationDelete={handleEducationInput.delete}
              onEducationChange={handleEducationInput.update}
            />
          )}
        </AdditionalInfoRow>
      </AdditionalInfoSection>
    </AdditionalInfoLayout>
  );
};

const AdditionalInfoHeader = styled.div`
  display: flex;
`;

const AdditionalInfoTitle = styled.span`
  font-size: var(--fontSize24);
  font-weight: bold;
`;

const AdditionalInfoSubmitButton = styled.button`
  width: 65px;

  margin-left: 20px;

  color: white;
  background-color: ${palette.unifolioBlue};
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

const InfoModifier = styled.div``;

const InfoRow = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 22px;
  }
`;

const InfoLabel = styled.div`
  color: grey;

  display: flex;
  flex-basis: 195px;
`;

const DefaultInfoInput = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeHolder,
  id: props.id,
  readOnly: props.readonly,
}))`
  padding: 0;
  border: none;
  border-bottom: 1px solid grey;
  box-sizing: border-box;
  font-size: var(--fontSize20);

  flex-basis: 250px;
`;

const DescriptionLayer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const DescriptionColumnLeft = styled.div`
  width: 180px;
  font-size: 14px;
  color: ${palette.deactiveGrey};
`;

const DescriptionColumnRight = styled.div`
  font-size: 20px;
`;

export default AdditionalInfoBusiness;
