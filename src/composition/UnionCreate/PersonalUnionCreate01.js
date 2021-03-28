import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Form, Select } from 'antd';

import EducationInput from 'components/Inputs/EducationInput';
import CareerInput from 'components/Inputs/CareerInput';
import API from 'lib/api';

const PersonalUnionCreate01 = (props) => {
  const { onClickNext, className } = props;
  
  const [owner, setOwner] = useState(null);
  const [educationInputs, setEducationInputs] = useState([]);
  const educationSelect = useRef();

  const [careerInputs, setCareerInputs] = useState([]);
  const careerSelect = useRef();

  const counts = useRef({ education: 2, career: 2 });

  useEffect(() => {

    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('unifolioAccess');
      if (!accessToken) {
        alert("로그인 정보가 없습니다 로그인 페이지로 이동합니다.");
      }
      const response = await API.post.getUserByToken({
        token: localStorage.unifolioAccess
      })
      if (response.status !== 200 ) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요');
        // localStorage.removeItem('unifolioAccess');
        // localStorage.removeItem('unifolioUser');
      } else {
        console.log(response.data.data)
        setOwner({
          "name": response.data.data.name,
          "rrn": response.data.data.rrn,
          "address_postcode": response.data.data.address_postcode,
          "address": response.data.data.address,
          "address_detail": response.data.data.address_detail,
          "phone_number": response.data.data.phone_number,
          "education": [],
          "career": [],
          "invest_history": []
        })
      }
    }
    if (owner === null) {
      fetchUserData()
    }

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

    setEducationInputs([...educationData]);

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
  }, [owner])
  
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

  const addCareerInput = () => {

    if (careerSelect.current === undefined) {
      alert("경력 정보를 선택해주세요.");
      return;
    }

    let data = {
      count: counts.current.career + 1, // count,
      type: careerSelect.current, //selected,
      info: {
        status: null
      }
    }

    data.info[careerSelect.current] = null;
    counts.current.career += 1;
    setCareerInputs([...careerInputs, data]);
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

  const onEducationChange = ({ count, name, value }) => {
    
    const changedEducationInputs = educationInputs.map((educationInput) => {
      if (educationInput.count === Number(count)) {
        if (name.includes("attend-status"))
          educationInput.info["attend_status"] = value
        if (name.includes("name"))
          educationInput.info[educationInput.type] = value
        if (name.includes("major"))
          educationInput.info[`${educationInput.type}_major`] = value;
      }
      
      return educationInput;
    });

    setEducationInputs([...changedEducationInputs]);
    console.log(educationInputs)
	};

  const onCareerChange = ({ count, name, value }) => {
    const changedCareerInputs = careerInputs.map((careerInput) => {
      if (careerInput.count === Number(count)) {
        if (name.includes("status"))
          careerInput.info["status"] = value;
        if (name.includes("company"))
          careerInput.info["company"] = value;
        if (name.includes("position"))
          careerInput.info["position"] = value;
        if (name.includes("start-date"))
          careerInput.info["start_date"] = value;
        if (name.includes("end-date"))
          careerInput.info["end_date"] = value;
      }
      return careerInput;
    })
    
    setCareerInputs([...changedCareerInputs]);
    console.log(careerInputs)
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
			if (each[0] == count) tmpCareerInputs.splice(i, 1);
		}
		setCareerInputs(tmpCareerInputs);
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
		onClickNext({ owner: ownerData }, 1, layoutRef.current);
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
            <EducationInput type={input.type} count={input.count} value={input.info} key={`education-${index}`} onEducationChange={onEducationChange} onEducationDelete={onEducationDelete} />
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
          size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addCareerInput}>
					추가
				</Button>
			</div>
			<div className="career-inputs">
        <div className="career-input-general"> 
          <h2>일반 경력사항 </h2>
          <div className="career-input-general-contents">
            {careerInputs.map((input, index) => {
              return input.type === "general" && (
                  <CareerInput type={input.type} count={input.count} key={`career-${index}`} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} />
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
                  <CareerInput type={input.type} count={input.count} key={`career-${index}`} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} />
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
