import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import * as Icons from 'components/common/Icons';
import UnsettedButton from 'components/common/UnsettedButton';
import ProfileEducationInput from 'composition/Profile/ProfileEducationInput';
import ProfileCareerInputGeneral from 'composition/Profile/ProfileCareerInputGeneral';
import ProfileCareerInputFinancial from 'composition/Profile/ProfileCareerInputFinancial';
import ProfileInvestmentHistoryInput from 'composition/Profile/ProfileInvestmentHistoryInput';

import useFetchUserToken from "hooks/useFetchUserToken";
import styles from 'lib/styles';
import API from 'lib/api';

const PersonalUnionCreate01 = ({ onClickNext }) => {
  const { user } = useFetchUserToken();
  
  const [owner, setOwner] = useState(null);

  const [educationInputs, setEducationInputs] = useState([]);
  const [careerInputs, setCareerInputs] = useState([]);
  const [investmentHistoryInputs, setInvestmentHistoryInputs] = useState([]);

  const counts = useRef({ education: 2, career: 2, investmentHistory: 1 });

  // helper
  const educationTypeSelector = (educationInput) => {
    if (educationInput.highschool !== "") return "highschool";
    else if (educationInput.university !== "") return "university";
    else if (educationInput.university_doctor !== "") return "university_doctor";
    else if (educationInput.university_master !== "") return "university_master";
  }

  useEffect(() => {
    
    const fetchUserData = async () => {
      if(user === null) return;
      const ownerAdditionalInfo = await API.get.userGeneral({ userId: user.id });
      console.log(ownerAdditionalInfo)
      setOwner({
        "name": user.name,
        "rrn": user.rrn,
        "address_postcode": user.address_postcode,
        "address": user.address,
        "address_detail": user.address_detail,
        "phone_number": user.phone_number,
        "education": ownerAdditionalInfo.data.education.length !== 0 ? ownerAdditionalInfo.data.education : [],
        "career": ownerAdditionalInfo.data.career.length !== 0 ? ownerAdditionalInfo.data.career : [],
        "invest_history": []
      })
      
    }
    if (owner === null) {
      fetchUserData();
    }
  }, [user, owner]);

  // 폼 자동완성
  useEffect(() => {
    if (owner === null) return;
    
    if (owner.education.length !== 0) {
      const changedEducationInputs = owner.education.map((educationInput, i) => {
        const type = educationTypeSelector(educationInput);
        return {
          count: i+1,
          type: type,
          info: {
            attend_status: educationInput.attend_status,
            [type]: educationInput[type],
            [`${type}_major`]: educationInput[`${type}_major`],
          }
        }
      });
      setEducationInputs(changedEducationInputs);
    } else {
      const educationData = [{
        count: 1,
        type: "highschool",
        info: { attend_status: null, highschool: "" }
      },
      {
        count: 2,
        type: "university",
        info: { attend_status: null, university:"", university_major:null }
      }];
      setEducationInputs(educationData);
    }

    if (owner.career.length !== 0) {
      const changedCareerData = owner.career.map((careerInput, i) => {
        return {
          count: i+1,
          type: careerInput.option_type,
          info: {
            ...careerInput
          }
        }
      });
      console.log("changedCareerData", changedCareerData)
      setCareerInputs(changedCareerData);
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
    
  }, [owner]);
  
  const addEducationInput = (selectedEducationInfo) => {
    let data = {
      count: counts.current.education + 1, // count,
      type: selectedEducationInfo, //selected,
      info: { attend_status: null, [selectedEducationInfo]:null }
    }

    if (selectedEducationInfo !== "highschool")
      data.info[`${selectedEducationInfo}_major`] = null;
    
    counts.current.education += 1;
    setEducationInputs([...educationInputs, data]);
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
  
  // const onChangeSelect = ({type, value}) => {
  //   console.log(type, value)
  //   switch(type) {
  //     case "education":
  //       educationSelect.current = value;
  //       break;
  //     case "career":
  //       careerSelect.current = value;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  const changeEducationInputType = (payload) => {
    const changedEducationInputs = educationInputs.map((inputData) => {
      if (inputData.count === payload.count) {
        let data = {
          count: payload.count,
          type: payload.type,
          info: { attend_status: null, [payload.type]: null }
        }
        if (payload.type !== "highschool") {
          data.info[`${payload.type}_major`] = null;
        }
        return data;
      }
      return inputData;
    });
    setEducationInputs(changedEducationInputs);
  }

  const onEducationChange = ({ count, name, value }) => {
    
    const changedEducationInputs = educationInputs.map((educationInput) => {
      if (educationInput.count === Number(count)) {
        if (name.includes("attend-status")) educationInput.info["attend_status"] = value
        else if (name.includes("name")) educationInput.info[educationInput.type] = value
        else if (name.includes("major")) educationInput.info[`${educationInput.type}_major`] = value;
      }
      return educationInput;
    });
    setEducationInputs(changedEducationInputs);
	};

  const handleCareerChange = ({ count, name, value }) => {

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
    
    setCareerInputs(changedCareerInputs);
	};

  const onEducationDelete = (count) => {
    const filteredEducationInputs = educationInputs.filter((education) => {
      return education.count !== count;
    });
    setEducationInputs([...filteredEducationInputs]);
  }

  const onCareerDelete = (count) => {

    // const filteredEducationInputs = educationInputs.filter((education) => {
    //   return education.count !== count;
    // });
    // setEducationInputs([...filteredEducationInputs]);

    let tmpCareerInputs = careerInputs;
		for (const [i, each] of tmpCareerInputs.entries()) {
			if (each[0] === count) tmpCareerInputs.splice(i, 1);
		}
		setCareerInputs(tmpCareerInputs);
  }

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

  const onInvestmentHistoryDelete = (count) => {
    const filteredInvestmentHistoryInputs = investmentHistoryInputs.filter((investment) => {
      return investment.count !== count;
    });
    setInvestmentHistoryInputs(filteredInvestmentHistoryInputs);
  }

	const layoutRef = useRef();
	const handleNext = () => {
    // owner {} 래핑 가공 데이터 넘김
    let educationData = [];
    educationInputs.forEach((education) => {
      educationData.push(education.info);
    })

    let investHistoryData = [];
    let careerData = [];
    careerInputs.forEach((career) => {
      if (career.type === "general") { careerData.push(career.info) }
      else if (career.type === "financial") { investHistoryData.push(career.info) }
    })

    const ownerData = {
      ...owner,
      education: educationData,
      career: careerData,
      invest_history: investHistoryData
    }
		onClickNext({ owner: ownerData }, 1);
	};

  const handleSubmitInformation = async () => {
    const userEducation = educationInputs.map((educationInput) => {
      if (Object.values(educationInput.info).includes(null)) return false;
      return {...educationInput.info}
    })
    // console.log("userEducation", userEducation)
    const userCareer = careerInputs.map((careerInput) => {
      if (Object.values(careerInput.info).includes(null)) return false;
      return {...careerInput.info, category: {category: careerInput.info.category}}
    })
    // console.log("userCareer", userCareer)
    
    console.log("==== update start ====")
    
    const targetData = {};
    if (!userEducation.includes(false)) targetData.education = userEducation;
    if (!userCareer.includes(false)) targetData.career = userCareer;
    if (Object.values(targetData).length === 0) {
      alert("정보를 올바르게 입력해주세요.");
      return;
    }
    // handleSubmit({formData: targetData});
    console.log("==== update end ====")
    console.log(investmentHistoryInputs);
  }

  if (!owner) return <></>;
	return (
		<PersonalUnionCreate01Layout>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 학력 사항 입력 </AdditionalInfoSubTitle>
            <AdditionalInfoButtons>
              <ActiveButton onClick={() => {addEducationInput("highschool")}}> 
                <Icons.ScrewIcon /> 추가하기
              </ActiveButton>
            </AdditionalInfoButtons>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileEducationInput 
            educationInputs={educationInputs} 
            changeEducationInputType={changeEducationInputType} 
            onEducationDelete={onEducationDelete}
            onEducationChange={onEducationChange}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 일반 경력사항 </AdditionalInfoSubTitle>
            <AdditionalInfoButtons>
              <ActiveButton onClick={() => {addCareerInput("general")}}> 
                <Icons.ScrewIcon /> 추가하기
              </ActiveButton>
            </AdditionalInfoButtons>              
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileCareerInputGeneral 
            careerInputs={careerInputs} 
            addCareerInput={addCareerInput}
            onCareerChange={handleCareerChange} 
            onCareerDelete={onCareerDelete}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <AdditionalInfoSubTitle> 관련 경력사항 (투자 및 컨설팅 분야) </AdditionalInfoSubTitle>
              <AdditionalInfoButtons>
                <ActiveButton onClick={() => {addCareerInput("financial")}}> 
                  <Icons.ScrewIcon /> 추가하기
                </ActiveButton>
              </AdditionalInfoButtons>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileCareerInputFinancial careerInputs={careerInputs} 
            addCareerInput={addCareerInput} 
            onCareerChange={handleCareerChange} onCareerDelete={onCareerDelete}
          />
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
      <NextButton onClick={handleNext}>임시 저장 후 다음 단계 진행하기</NextButton>
    </PersonalUnionCreate01Layout>
	);
};

const PersonalUnionCreate01Layout = styled.section`
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

const DescriptionLayer = styled.div`
`;

const NextButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
`

export default PersonalUnionCreate01;
