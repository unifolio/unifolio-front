import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Select } from 'antd';

import EducationInput from 'components/Inputs/EducationInput';
import CareerInput from 'components/Inputs/CareerInput';
import InvestmentHistoryInput from 'components/InvestmentHistoryInput';

const AdditionalInfo = (props) => {
	const {} = props;

  const [educationInputs, setEducationInputs] = useState([]);
  const educationSelect = useRef();

  const [careerInputs, setCareerInputs] = useState([]);
  const careerSelect = useRef();
  
  const [investmentHistoryInputs, setInvestmentHistoryInputs] = useState([]);
  
  useEffect(() => {
    // 학력사항
    const educationData = [{
      idx: 0,
      type: "highschool",
      info: { attend_status: null, highschool: null }
    },
    {
      idx: 1,
      type: "university",
      info: { attend_status: null, university:null, university_major:null }
    }];

    setEducationInputs([...educationData]);

    // 경력사항
    const careerData = [{
      idx: 0,
      type: "general",
      info: { attend_status: null, firm: null, position: null, period_start: null, period_end: null }
    },
    {
      idx: 1,
      type: "financial",
      info: { attend_status: null, firm: null, position: null, period_start: null, period_end: null }
    }];

    setCareerInputs([...careerData]);

    // 투자이력
    const investmentHistoryData = [{
      idx: 0,
      info: {
        category: null, firm: null, description: null
      }
    }]
    setInvestmentHistoryInputs([...investmentHistoryData]);
  }, [])

  const addEducationInput = () => {

    if (educationSelect.current === undefined) {
      alert("학력 정보를 선택해주세요.");
      return;
    }

    let data = {
      idx: educationInputs.length, // count,
      type: educationSelect.current, //selected,
      info: {
        attend_status: null
      }
    }

    data.info[educationSelect.current] = null;
    if (educationSelect.current !== "highschool")
      data.info[`${educationSelect.current}_major`] = null;
    
    setEducationInputs([...educationInputs, data]);
  }

  const addCareerInput = () => {

    if (careerSelect.current === undefined) {
      alert("경력 정보를 선택해주세요.");
      return;
    }

    let data = {
      idx: careerInputs.length, // count,
      type: careerSelect.current, //selected,
      info: {
        attend_status: null
      }
    }

    data.info[careerSelect.current] = null;
    setCareerInputs([...careerInputs, data]);
  }

  const addInvestmentHistoryInput = () => {
    let data = {
      idx: investmentHistoryInputs.length,
      info: {
        category: null, firm: null, description: null
      }
    }
    setInvestmentHistoryInputs([...investmentHistoryInputs, data]);
  }

  const onEducationChange = ({ idx, name, value }) => {
    for (const educationInput of educationInputs) {
      if (educationInput.idx === Number(idx)) {
        if (name.includes("attend-status"))
          educationInput.info["attend_status"] = value
        if (name.includes("name"))
          educationInput.info[educationInput.type] = value
        if (name.includes("major"))
          educationInput.info[`${educationInput.type}_major`] = value;
      }
    }

    console.log(educationInputs);
    // setEducationInputs([...educationInputs]); // 이게 없어도 되네...?
	};

  const onCareerChange = ({ idx, name, value }) => {

    for (const careerInput of careerInputs) {
      if (careerInput.idx === Number(idx)) {
        if (name.includes("attend-status"))
          careerInput.info["attend_status"] = value;
        if (name.includes("firm"))
          careerInput.info["firm"] = value;
        if (name.includes("position"))
          careerInput.info["position"] = value;
        if (name.includes("period-start"))
          careerInput.info["period_start"] = value;
        if (name.includes("period-end"))
          careerInput.info["period_end"] = value;
      }
    }
    console.log(careerInputs);
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


	const onChangeSelect = ({type, value}) => {
    console.log(type, value)
    switch(type) {
      case "education":
        educationSelect.current = value;
        break;
      case "career":
        careerSelect.current = value;
        break;
      default:
        break;
    }
  }

  const onEducationDelete = (index) => {
    const filteredEducationInputs = educationInputs.filter((_, educationIdx) => {
      return educationIdx !== index;
    });
    setEducationInputs(filteredEducationInputs);
  }
  // legacy //
  const onSchoolDelete = (count) => {
		// let tmpEducationInputs = EducationInputs;
		// for (const [i, each] of tmpEducationInputs.entries()) {
		// 	console.log(each);
		// 	if (each[0] == count) tmpEducationInputs.splice(i, 1);
		// }
		// setEducationInputs(tmpEducationInputs);
		// console.log(EducationInputs);
	};
  
  const onCareerDelete = (count) => {
		// let tmpCareerInputs = careerInputs;
		// for (const [i, each] of tmpCareerInputs.entries()) {
		// 	if (each[0] == count) tmpCareerInputs.splice(i, 1);
		// }
		// setCareerInputs(tmpCareerInputs);
	};

  const onInvestmentHistoryDelete = (idx) => {

  }
  // legacy //

	return (
		<AdditionalInfoLayout>
			<h1> 추가 정보 </h1>
			<HeadlineBottomBorder />
			<section>
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
              <Button 
                size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addEducationInput}
              > 
                추가
              </Button>
            </div>
            
          </div>
        </div>
        <div className="row">
          <div className="school-inputs">
            {educationInputs.map((input, index) => (
                <EducationInput type={input.type} count={input.count} value={input.info} key={`education-${index}`} onEducationChange={onEducationChange} onEducationDelete={onEducationDelete} />
              )
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title with-select-button">
            <h2> 경력 사항 입력 </h2>
            <div className="column contents">
              <Select name="career" size="large" onChange={(value) => { onChangeSelect({type:"career", value}) }} placeholder="입력하실 경력 사항을 선택해주세요">
                <Select.Option value="general">일반 경력사항 (필수)</Select.Option>
                <Select.Option value="financial">관련 경력사항(투자 및 컨설팅 분야)</Select.Option>
              </Select>
              <Button
                size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addCareerInput}>
                추가
              </Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="career-inputs">
            <div className="career-input-general"> 
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
            <div className="career-input-financial"> 
              <h2>관련 경력사항 (투자 및 컨설팅 분야)</h2> 
              <div className="career-input-financial-contents">
                {careerInputs.map((input, index) => {
                  return input.type === "financial" && (
                      <CareerInput type={input.type} count={input.idx} key={`career-${index}`} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title with-select-button">
            <h2> 투자 이력 입력 </h2>
            <div className="column contents">
              <Button 
                size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addInvestmentHistoryInput}
              > 
                추가
              </Button>
            </div>
            
          </div>
          <div className="row">
            <div className="investment-history-inputs">  
              {investmentHistoryInputs.map((input, index) => (
                  <InvestmentHistoryInput type={input.type} count={input.idx} key={`investment-history-${index}`} onInvestmentHistoryChange={onInvestmentHistoryChange} onInvestmentHistoryDelete={onInvestmentHistoryDelete} />
                )
              )}
            </div>
          </div>
        </div>
      </section>
		</AdditionalInfoLayout>
	);
};

const AdditionalInfoLayout = styled.section`
	display: flex;
	flex-direction: column;

	.row {
		display: flex;
    flex-direction: column;
		
    .title, .contents {
      display: flex; 
    }
    .investment-history-inputs {
      width: 100%;
    }
    
    .left-column {
			color: blue;
			flex: 1 1 0;
		}
		.right-column {
			color: blue;
			flex: 3 1 0;
		}
	}
  
  .with-select-button {
    justify-content: space-between;
  }

  section + section {
    margin-top: 50px;
  }

  section > .row + .row {
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

export default AdditionalInfo;
