import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import UnsettedButton from 'components/common/UnsettedButton';

import ProfileEducationInput from 'composition/Profile/ProfileEducationInput';
import ProfileCareerInputGeneral from 'composition/Profile/ProfileCareerInputGeneral';
import ProfileCareerInputFinancial from 'composition/Profile/ProfileCareerInputFinancial';
import ProfileInvestmentHistoryInput from 'composition/Profile/ProfileInvestmentHistoryInput';

import InvestmentHistoryInput from 'components/InvestmentHistoryInput';

const AdditionalInfo = ({user, handleSubmit}) => {

  const [educationInputs, setEducationInputs] = useState([]);
  const [careerInputs, setCareerInputs] = useState([]);
  const [investmentHistoryInputs, setInvestmentHistoryInputs] = useState([]);
  
  const counts = useRef({ education: 2, career: 2, investmentHistory: 1 });
  
  useEffect(() => {
    // 학력사항
    const educationData = [{
      count: 1,
      type: "highschool",
      info: { attend_status: null, highschool: null }
    },
    {
      count: 2,
      type: "university",
      info: { attend_status: null, university:null, university_major:null }
    }];

    setEducationInputs([...educationData]);

    // 경력사항
    const careerData = [{
      count: 1,
      type: "general",
      info: { status: null, company: null, position: null, start_date: null, end_date: null }
    },
    {
      count: 2,
      type: "financial",
      info: { status: null, company: null, position: null, start_date: null, end_date: null }
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

  const changeEducationInput = (payload) => {
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

  const addCareerInput = (selectedCareerInfo) => {
    let data = {
      count: counts.current.career + 1, // count,
      type: selectedCareerInfo, //selected,
      info: { status: null, company: null, position: null, start_date: null, end_date: null }
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
        else if (name.includes("name")) educationInput.info[educationInput.type] = value
        else if (name.includes("major")) educationInput.info[`${educationInput.type}_major`] = value;
      }
      
      return educationInput;
    });

    setEducationInputs(changedEducationInputs);
    
	};

  const onCareerChange = ({ count, name, value }) => {

    const changedCareerInputs = careerInputs.map((careerInput) => {
      if (careerInput.count === Number(count)) {
        if (name.includes("status")) careerInput.info["status"] = value;
        else if (name.includes("company")) careerInput.info["company"] = value;
        else if (name.includes("position")) careerInput.info["position"] = value;
        else if (name.includes("start-date")) careerInput.info["start_date"] = value;
        else if (name.includes("end-date")) careerInput.info["end_date"] = value;
      }
      
      return careerInput;
    });
    
    setCareerInputs(changedCareerInputs);
	};

  const onInvestmentHistoryChange = ({ idx, name, value }) => {
    for (const investmentHistoryInput of investmentHistoryInputs) {
      if (investmentHistoryInput.idx === Number(idx)) {
        if (name.includes("category"))
          investmentHistoryInput.info["category"] = value;
        if (name.includes("firm"))
          investmentHistoryInput.info["firm"] = value;
        if (name.includes("description"))
          investmentHistoryInput.info["description"] = value;
      }
    }
    console.log(investmentHistoryInputs);
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
  

  const onEducationSubmit = () => {
    handleSubmit(educationInputs)
  }

	return (
    
    <AdditionalInfoLayout>
      <h1> 추가 정보 </h1>
      <HeadlineBottomBorder />
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <h2> 학력 사항 입력 </h2>
            <Button onClick={() => {addEducationInput("highschool")}}> 
              <ScrewIcon /> 추가하기
            </Button>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileEducationInput educationInputs={educationInputs} 
            changeEducationInput={changeEducationInput} 
            onEducationDelete={onEducationDelete}
            onEducationChange={onEducationChange}
            onEducationSubmit={onEducationSubmit}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <h2> 일반 경력사항 입력 </h2>
            <Button onClick={() => {addCareerInput("general")}}> 
              <ScrewIcon /> 추가하기
            </Button>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileCareerInputGeneral careerInputs={careerInputs} 
            addCareerInput={addCareerInput}
            onCareerChange={onCareerChange} onCareerDelete={onCareerDelete}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <h2> 관련 경력사항 (투자 및 컨설팅 분야) 입력 </h2>
            <Button onClick={() => {addCareerInput("financial")}}> 
              <ScrewIcon /> 추가하기
            </Button>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <ProfileCareerInputFinancial careerInputs={careerInputs} 
            addCareerInput={addCareerInput} 
            onCareerChange={onCareerChange} onCareerDelete={onCareerDelete}
          />
        </AdditionalInfoRow>
      </AdditionalInfoSection>
      <AdditionalInfoSection>
        <AdditionalInfoRow>
          <AdditionalInfoColumns>
            <h2> 투자 이력 입력 </h2>
            <Button onClick={addInvestmentHistoryInput}> 
              <ScrewIcon /> 추가하기
            </Button>
          </AdditionalInfoColumns>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          {/* <ProfileCareerInputFinancial careerInputs={careerInputs} 
            addCareerInput={addCareerInput} 
            onCareerChange={onCareerChange} onCareerDelete={onCareerDelete}
          /> */}
          {investmentHistoryInputs.map((input, index) => (
              <InvestmentHistoryInput type={input.type} count={input.idx} key={`investment-history-${index}`} onInvestmentHistoryChange={onInvestmentHistoryChange} onInvestmentHistoryDelete={onInvestmentHistoryDelete} />
            )
          )}
        </AdditionalInfoRow>
      </AdditionalInfoSection>
    </AdditionalInfoLayout>
	);
};

const AdditionalInfoModalPosition = styled.div`
  width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;

	background-color: rgba(0, 0, 0, 0.4);
	display: none;
	justify-content: center;
	align-items: center;
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
	margin-bottom: 2rem;
`;
const AdditionalInfoColumn = styled.section`
	display: flex;
`;

const Button = styled(UnsettedButton)`
  color:blue;
  font-size: 16px;
  
  display: flex;
`

const ScrewIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 50%;
  color: white;
  margin-right: 9px;
  
  ::after {
    content:"+";
    width: 100%;
    height: 100%;
    font-size: 20px;

    display:flex;
    justify-content: center;
    align-items: center;
  }
`

export default AdditionalInfo;
