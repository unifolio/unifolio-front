import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import UnsettedButton from 'components/common/UnsettedButton';
import * as Icons from 'components/common/Icons';

import ProfileEducationInput from 'composition/Profile/ProfileEducationInput';
import ProfileCareerInputGeneral from 'composition/Profile/ProfileCareerInputGeneral';
import ProfileCareerInputFinancial from 'composition/Profile/ProfileCareerInputFinancial';
import ProfileInvestmentHistoryInput from 'composition/Profile/ProfileInvestmentHistoryInput';

import palette from 'lib/styles/palette';

const AdditionalInfo = ({ user, handleSubmit }) => {
  
  const [educationInputs, setEducationInputs] = useState([]);
  const [careerInputs, setCareerInputs] = useState([]);
  const [investmentHistoryInputs, setInvestmentHistoryInputs] = useState([]);

  const [inputStatus, setInputStatus] = useState({ 
    education: user.education.length !== 0 ? false : true, 
    career: {
      general: user.career.length !== 0 ? false : true, 
      financial: user.career.length !== 0 ? false : true, 
    },
    investmentHistory: user.investmentHistory?.length !== 0 ? false : true
  });
  
  const counts = useRef({ education: 2, career: 2, investmentHistory: 1 });

  // helper 
  const selectEducationType = (educationType) => {
    switch(educationType){
      case "highschool":
        return "고등학교";
      case "undergraduate":
        return "대학교";
      case "master":
        return "대학원 (석사)";
      case "doctor":
        return "대학원 (박사)";
      default:
        return "에러입니다. 관리자에게 문의하세요."
    }
  }
  useEffect(() => {
  
    // 경력사항
    const careerData = [{
      count: 1,
      type: "general",
      info: { status: null, company: null, job: null, start_date: null, end_date: null }
    },
    {
      count: 2,
      type: "financial",
      info: { status: null, company: null, job: null, start_date: null, end_date: null }
    }];

    setCareerInputs([...careerData]);

    // 투자이력
    const investmentHistoryData = [{
      count: 1,
      info: {
        category: null, firm: null, description: null
      }
    }]
    setInvestmentHistoryInputs([...investmentHistoryData]);
  }, [])

  // 폼 자동완성
  useEffect(() => {
    if (user === null) return;
    
    // 학력사항
    if (user.education.length !== 0) {
      const changedEducationInputs = user.education.map((educationInput, i) => {
        return {
          count: i+1,
          type: educationInput.education_type,
          info: {
            school_name: educationInput.school_name,
            major: educationInput.major,
            education_type: educationInput.education_type,
            attend_status: educationInput.attend_status,
          }
        }
      });
      setEducationInputs(changedEducationInputs);
    } else {
      const educationData = [{
        count: 1,
        type: "highschool",
        info: { school_name: "", major: "", education_type: "highschool", attend_status: null  }
      },
      {
        count: 2,
        type: "undergraduate",
        info: { school_name: "", major: "", education_type: "undergraduate", attend_status: null  }
      }];
      setEducationInputs(educationData);
    }
    // 커리어
    if (user.career.length !== 0) {
      const changedCareerInputs = user.career.map((careerInput, i) => {
        console.log(careerInput) // 임시
        return {
          count: i+1,
          type: ["reviewer", "general", null].includes(careerInput.option_type) ? "general" : careerInput.type,
          info: {
            ...careerInput
          }
        }
      });
      setCareerInputs(changedCareerInputs);
    } else {
      const careerData = [{
        count: 1,
        type: "general",
        info: { status: null, company: null, job: null, start_date: null, end_date: null }
      },
      {
        count: 2,
        type: "financial",
        info: { status: null, company: null, job: null, start_date: null, end_date: null }
      }];
      setCareerInputs(careerData);
    }
    
  }, [user])

  const addEducationInput = (selectedEducationInfo) => {
    let data = {
      count: counts.current.education + 1, // count,
      type: selectedEducationInfo, //selected,
      info: { school_name: "", major: "", education_type: selectedEducationInfo, attend_status: null }
    }

    counts.current.education += 1;
    setEducationInputs([...educationInputs, data]);
  }

  const changeEducationInputType = (payload) => {
    const changedEducationInputs = educationInputs.map((inputData) => {
      if (inputData.count === payload.count) {
        return {
          count: payload.count,
          type: payload.type,
          info: { attend_status: null, education_type: payload.type, major: "", school_name: ""}
        }
      }
      return inputData;
    });
    setEducationInputs(changedEducationInputs);
  }

  const addCareerInput = (selectedCareerInfo) => {
    let data = {
      count: counts.current.career + 1, // count,
      type: selectedCareerInfo, //selected,
      info: { status: null, company: null, job: null, start_date: null, end_date: null }
    }
    counts.current.career += 1;
    setCareerInputs([...careerInputs, data]);
  }

  const addInvestmentHistoryInput = () => {
    let data = {
      count: counts.current.investmentHistory + 1,
      info: {
        category: null, firm: null, description: null
      }
    }
    counts.current.investmentHistory += 1;
    setInvestmentHistoryInputs([...investmentHistoryInputs, data]);
  }

  const onEducationChange = ({ count, name, value }) => {
    
    const changedEducationInputs = educationInputs.map((educationInput) => {
      if (educationInput.count === Number(count)) {
        if (name.includes("attend-status")) educationInput.info["attend_status"] = value
        else if (name.includes("school-name")) educationInput.info["school_name"] = value
        else if (name.includes("major")) educationInput.info["major"] = value;
        else if (name.includes("education_type")) educationInput.info["education_type"] = value;
      }
      return educationInput;
    });
    setEducationInputs(changedEducationInputs);
	};

  const handleCareerChange = ({ count, name, value }) => {
    console.log("변화@", count, name, value)
    const changedCareerInputs = careerInputs.map((careerInput) => {
      if (careerInput.count === Number(count)) {
        if (name.includes("status")) careerInput.info["status"] = value;
        else if (name.includes("category")) careerInput.info["category"] = value;
        else if (name.includes("company")) careerInput.info["company"] = value;
        else if (name.includes("job")) careerInput.info["job"] = value;
        else if (name.includes("start-date")) careerInput.info["start_date"] = value;
        else if (name.includes("end-date")) careerInput.info["end_date"] = value;
        careerInput.info["option_type"] = careerInput.type;
      }
      return careerInput;
    });
    console.log(changedCareerInputs)
    
    setCareerInputs(changedCareerInputs);
	};

  const onInvestmentHistoryChange = ({ count, name, value }) => {
    console.log(count, name, value)
    const changedInvestmentHistoryInputs = investmentHistoryInputs.map((investmentHistoryInput) => {
      if (investmentHistoryInput.count === Number(count)) {
        if (name.includes("category")) investmentHistoryInput.info["category"] = value;
        else if (name.includes("firm")) investmentHistoryInput.info["firm"] = value;
        else if (name.includes("description")) investmentHistoryInput.info["description"] = value;
      }
      return investmentHistoryInput;
    })
    console.log("changedInvestmentHistoryInputs", changedInvestmentHistoryInputs)
    setInvestmentHistoryInputs(changedInvestmentHistoryInputs)
  }

  const onEducationDelete = (count) => {
    const filteredEducationInputs = educationInputs.filter((education) => {
      return education.count !== count;
    });
    setEducationInputs(filteredEducationInputs);
  }

  const onCareerDelete = (count) => {
    const filteredCareerInputs = careerInputs.filter((career) => {
      return career.count !== count;
    });
    setCareerInputs(filteredCareerInputs);
  }

  
  const onInvestmentHistoryDelete = (count) => {
    const filteredInvestmentHistoryInputs = investmentHistoryInputs.filter((investment) => {
      return investment.count !== count;
    });
    setInvestmentHistoryInputs(filteredInvestmentHistoryInputs);
  }
  
  const handleSubmitInformation = async () => {
    const userEducation = educationInputs.map((educationInput) => {
      if (Object.values(educationInput.info).includes(null)) return false;
      return {...educationInput.info}
    })
    // console.log("userEducation", userEducation)
    const userCareer = careerInputs.map((careerInput) => {
      if (Object.values(careerInput.info).includes(null)) return false;
      return {...careerInput.info, category: {category: careerInput.info.category} }
    })
    console.log("userCareer", userCareer)
    
    console.log("==== update start ====")
    
    const targetData = {};
    if (!userEducation.includes(false)) targetData.education = userEducation;
    if (!userCareer.includes(false)) targetData.career = userCareer;
    if (Object.values(targetData).length === 0) {
      alert("정보를 올바르게 입력해주세요.");
      return;
    }
    
    handleSubmit({formData: targetData});
    console.log("==== update end ====")
    console.log(investmentHistoryInputs);
  }

  // const onEducationSubmit = () => {
  //   handleSubmit(educationInputs);
  // }
  // const onInvestmentHistorySubmit = () => {
  //   handleSubmit()
  // }

	return (
    
    <AdditionalInfoLayout>
      <AdditionalInfoHeader>
        <AdditionalInfoTitle> 추가 정보 </AdditionalInfoTitle>
        <AdditionalInfoSubmitButton onClick={handleSubmitInformation}> 저장 </AdditionalInfoSubmitButton>
      </AdditionalInfoHeader>
      
      <HeadlineBottomBorder />

      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
          {inputStatus.education
            ? (<>
              <AdditionalInfoSubTitle> 학력 사항 입력 </AdditionalInfoSubTitle>
              <AdditionalInfoButtons>
                <CancelButton onClick={ () => {setInputStatus( {...inputStatus, education: !inputStatus.education} )} }> 
                  <Icons.CancelIcon /> 수정 취소
                </CancelButton>
                <ActiveButton onClick={() => {addEducationInput("highschool")}}> 
                  <Icons.ScrewIcon /> 추가하기
                </ActiveButton>
              </AdditionalInfoButtons>
            </>) : (<>
              <AdditionalInfoSubTitle> 학력 사항 </AdditionalInfoSubTitle>
              <ActiveButton onClick={ () => {setInputStatus( {...inputStatus, education: !inputStatus.education} )} }> 
                <Icons.ScrewIcon /> 수정하기
              </ActiveButton>
            </>)
          } 
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {!inputStatus.education
            ? user.education.map((educationData, i) => {
              return (<DescriptionLayer key={`education-${i}`}>
                <DescriptionColumnLeft>
                  {selectEducationType(educationData.education_type)}
                </DescriptionColumnLeft>
                <DescriptionColumnRight>
                  {educationData.school_name} {!educationData.major ? "" : educationData.major} {educationData.attend_status}
                </DescriptionColumnRight>
              </DescriptionLayer>) 
            })
            : <ProfileEducationInput 
              educationInputs={educationInputs} 
              changeEducationInputType={changeEducationInputType} 
              onEducationDelete={onEducationDelete}
              onEducationChange={onEducationChange}
            />
          }
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            {inputStatus.career.general
              ? (<>
                <AdditionalInfoSubTitle> 일반 경력사항 입력 </AdditionalInfoSubTitle>
                <AdditionalInfoButtons>
                  <CancelButton onClick={ () => {setInputStatus( 
                    {...inputStatus, career: {...inputStatus.career, general: !inputStatus.career.general }  } 
                  )} }> 
                    <Icons.CancelIcon /> 수정 취소
                  </CancelButton>
                  <ActiveButton onClick={() => {addCareerInput("general")}}> 
                    <Icons.ScrewIcon /> 추가하기
                  </ActiveButton>
                </AdditionalInfoButtons>
              </>) : (<>
                <AdditionalInfoSubTitle> 일반 경력사항 </AdditionalInfoSubTitle>
                <ActiveButton onClick={ () => {setInputStatus( 
                  {...inputStatus, career: {...inputStatus.career, general: !inputStatus.career.general }  } 
                )}}> 
                  <Icons.ScrewIcon /> 수정하기
                </ActiveButton>
              </>)
            }
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {!inputStatus.career.general
            ? user.career.map((careerData, i) => {
              return <DescriptionLayer key={`career-${i}`}>{careerData.company}</DescriptionLayer> 
            })
            : <ProfileCareerInputGeneral careerInputs={careerInputs} 
                addCareerInput={addCareerInput}
                onCareerChange={handleCareerChange} onCareerDelete={onCareerDelete}
              />
          }
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            {inputStatus.career.financial
              ? (<>
                <AdditionalInfoSubTitle> 관련 경력사항 (투자 및 컨설팅 분야) 입력 </AdditionalInfoSubTitle>
                <AdditionalInfoButtons>
                  <CancelButton onClick={ () => {setInputStatus( 
                    {...inputStatus, career: {...inputStatus.career, financial: !inputStatus.career.financial }  } 
                  )} }> 
                    <Icons.CancelIcon /> 수정 취소
                  </CancelButton>
                  <ActiveButton onClick={() => {addCareerInput("financial")}}> 
                    <Icons.ScrewIcon /> 추가하기
                  </ActiveButton>
                </AdditionalInfoButtons>
              </>) : (<>
                <AdditionalInfoSubTitle> 관련 경력사항 (투자 및 컨설팅 분야) </AdditionalInfoSubTitle>
                <ActiveButton onClick={ () => {setInputStatus( 
                  {...inputStatus, career: {...inputStatus.career, financial: !inputStatus.career.financial }  } 
                )} }> 
                  <Icons.ScrewIcon /> 수정하기
                </ActiveButton>
              </>)
            }
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {!inputStatus.career.financial
            ? user.career.map((careerData, i) => {
              return <DescriptionLayer key={`career-${i}`}>{careerData.company}</DescriptionLayer> 
            })
            : <ProfileCareerInputFinancial careerInputs={careerInputs} 
              addCareerInput={addCareerInput} 
              onCareerChange={handleCareerChange} onCareerDelete={onCareerDelete}
            />
          }
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 투자 이력 입력 </AdditionalInfoSubTitle>
            <ActiveButton onClick={addInvestmentHistoryInput}> 
              <Icons.ScrewIcon /> 추가하기
            </ActiveButton>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileInvestmentHistoryInput investmentHistoryInputs={investmentHistoryInputs} 
            // addInvestmentHistoryInput={addCareerInput}
            onInvestmentHistoryDelete={onInvestmentHistoryDelete}
            onInvestmentHistoryChange={onInvestmentHistoryChange}
            // onInvestmentHistorySubmit={onInvestmentHistorySubmit}
          />
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

const AdditionalInfoSubTitle = styled.span`
  font-size: var(--fontSize20);
  font-weight: bold;
`

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
  color: ${palette.unifolioBlue};
`
const CancelButton = styled(Button)`
  color: ${palette.deactiveGrey};
`

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
`
export default AdditionalInfo;