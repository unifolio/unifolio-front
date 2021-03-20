import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Form, Select } from 'antd';

import EducationInput from 'components/Inputs/EducationInput';
import CareerInput from 'components/Inputs/CareerInput';

const PersonalUnionCreate01 = (props) => {
  const { onClickNext, className } = props;
  
  const [educationInputs, setEducationInputs] = useState([]);
  const educationSelect = useRef();

  const [careerInputs1, setCareerInputs1] = useState([]);
  const careerSelect1 = useRef();

  const counts = useRef({
    education: 2,
    career: 2
  });
  
  /// legacy
	const [careerInputs, setCareerInputs] = useState([]);

  useEffect(() => {
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

    const careerData = [{
      count: 1,
      type: "general",
      info: { attend_status: null, firm: null, position: null, period_start: null, period_end: null }
    },
    {
      count: 2,
      type: "financial",
      info: { attend_status: null, firm: null, position: null, period_start: null, period_end: null }
    }];

    setCareerInputs1([...careerData]);
  }, [])
  
  const addEducationInput = () => {

    if (educationSelect.current === undefined) {
      alert("학력 정보를 선택해주세요.");
      return;
    }

    let data = {
      count: counts.current.education + 1, // count,
      type: educationSelect.current, //selected,
      info: {
        attend_status: null
      }
    }

    data.info[educationSelect.current] = null;
    if (educationSelect.current !== "highschool")
      data.info[`${educationSelect.current}_major`] = null;
    
    counts.current.education += 1;
    setEducationInputs([...educationInputs, data]);
  }

  const addCareerInput1 = () => {

    if (careerSelect1.current === undefined) {
      alert("경력 정보를 선택해주세요.");
      return;
    }

    let data = {
      count: counts.current.career + 1, // count,
      type: careerSelect1.current, //selected,
      info: {
        attend_status: null
      }
    }

    data.info[careerSelect1.current] = null;
    counts.current.career += 1;
    setCareerInputs1([...careerInputs1, data]);
  }

  
  const onChangeSelect = ({type, value}) => {
    console.log(type, value)
    switch(type) {
      case "education":
        educationSelect.current = value;
        break;
      case "career":
        careerSelect1.current = value;
        break;
      default:
        break;
    }
  }

  const onEducationChange = ({ count, name, value }) => {
    for (const educationInput of educationInputs) {
      if (educationInput.count === Number(count)) {
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

  const onCareerChange1 = ({ count, name, value }) => {

    for (const careerInput of careerInputs1) {
      if (careerInput.count === Number(count)) {
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
    console.log(count, name, value)
    console.log(careerInputs1);
    // setEducationInputs([...educationInputs]); // 이게 없어도 되네...?
	};

  const onEducationDelete = (count) => {
    const filteredEducationInputs = educationInputs.filter((education) => {
      return education.count !== count;
    });
    setEducationInputs(filteredEducationInputs);
  }

  // legacy start // 
  
  const onCareerDelete = (count) => {
		let tmpCareerInputs = careerInputs;
		for (const [i, each] of tmpCareerInputs.entries()) {
			if (each[0] == count) tmpCareerInputs.splice(i, 1);
		}
		setCareerInputs(tmpCareerInputs);
	};

  // legacy start // 

	const layoutRef = useRef();
	const handleNext = (e) => {
		// 데이터 넘김
		// console.log('handleNext', layoutRef.current);
		onClickNext({ educationInputs, careerInputs1 }, 1, layoutRef.current);
		// window.location.href = '/association-create/personal-2';
	};

	return (
		<PersonalUnionCreate01Layout className={className} ref={layoutRef}>
			<h2> 학력 사항 선택 </h2>
			<div className="flex items-center" style={{ display: 'flex' }}>
				<Form layout="horizontal" size="large" style={{ width: '100%' }}>
					<Form.Item id="school-select">
            <Select name="education" onChange={(value) => { onChangeSelect({type:"education", value}) }} placeholder="입력하실 학력 사항을 선택해주세요">
							<Select.Option value="highschool">고등학교</Select.Option>
							<Select.Option value="university">대학교(전문학사/학사)</Select.Option>
							<Select.Option value="university_master">대학원(석사)</Select.Option>
							<Select.Option value="university_doctor">대학원(박사)</Select.Option>
						</Select>
					</Form.Item>
				</Form>
        <Button 
          size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addEducationInput}
        > 
          추가
        </Button>
			</div>
			<div className="school-inputs">
        {educationInputs.map((input, index) => (
            <EducationInput type={input.type} count={input.count} key={`education-${index}`} onEducationChange={onEducationChange} onEducationDelete={onEducationDelete} />
          )
				)}
			</div>
      <br />
			<h2> 경력 사항 선택 </h2>
			<div className="flex items-center" style={{ display: 'flex' }}>
				<Form layout="horizontal" size="large" style={{ width: '100%' }}>
					<Form.Item id="school-select">
            <Select onChange={(value) => { onChangeSelect({type:"career", value}) }} placeholder="입력하실 경력 사항을 선택해주세요">
							<Select.Option value="general">일반 경력사항 (필수)</Select.Option>
							<Select.Option value="financial">관련 경력사항(투자 및 컨설팅 분야)</Select.Option>
						</Select>
					</Form.Item>
				</Form>
				<Button
          size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addCareerInput1}>
					추가
				</Button>
			</div>
			<div className="career-inputs">
        <div className="career-input-general"> 
          <h2>일반 경력사항 </h2>
          <div className="career-input-general-contents">
            {careerInputs1.map((input, index) => {
              return input.type === "general" && (
                  <CareerInput type={input.type} count={input.count} key={`career-${index}`} onCareerChange1={onCareerChange1} onCareerDelete={onCareerDelete} />
                )
              })
            }
          </div>
        </div>
        <div className="career-input-financial"> 
          <h2>관련 경력사항 (투자 및 컨설팅 분야)</h2> 
          <div className="career-input-financial-contents">
          {careerInputs1.map((input, index) => {
              return input.type === "financial" && (
                  <CareerInput type={input.type} count={input.count} key={`career-${index}`} onCareerChange1={onCareerChange1} onCareerDelete={onCareerDelete} />
                )
              })
            }
          </div>
        </div>
			</div>
			<br />
			<Button onClick={handleNext} size="large"> 다음 단계 진행하기 </Button>
		</PersonalUnionCreate01Layout>
	);
};

const PersonalUnionCreate01Layout = styled.section`
	width: 100%;
`;

export default PersonalUnionCreate01;
