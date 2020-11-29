import React, {useState, useCallback} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { addPersonalInfo } from '../../modules/reducers/unionCreate';

import { Button, message, Tooltip, Form, Select } from 'antd';

import SchoolInput from './SchoolInput';
import CareerInput from './CareerInput';

const PersonalAssociationCreate01 = () => {
  const [schoolSelect, setSchoolSelect] = useState(null);
  const [schoolInputs, setSchoolInputs] = useState([]);
  const [schoolCount, setSchoolCount ] = useState(2);
  
  const [careerSelect, setCareerSelect] = useState(null);
  const [careerInputs, setCareerInputs] = useState([]);
  const [careerCount, setCareerCount ] = useState(1);
  
  const dispatch = useDispatch();
  
  const addSchoolInput = (count) => {
    let selected = schoolSelect
    let tmpSchoolInputs = schoolInputs
    tmpSchoolInputs.push( [count, selected, ""] );
    setSchoolInputs(tmpSchoolInputs);
    setSchoolCount(count + 1);
  }

  const addCareerInput = (count) => {
    let selected = careerSelect
    let tmpCareerInputs = careerInputs
    tmpCareerInputs.push( [count, selected, ""] );
    setCareerInputs(tmpCareerInputs);
    setCareerCount(count + 1);
  }

  const onChangeSchoolSelect = (val) => { setSchoolSelect(val); }
  const onChangeCareerSelect = (val) => { setCareerSelect(val); }

  const onSchoolChange = (schoolInfo) => {
    console.log(schoolInfo)
    let tmpSchoolInputs = schoolInputs;
    tmpSchoolInputs.map(schoolInput => {
      schoolInput[0] == schoolInfo.count ? schoolInput[2] = schoolInfo.value : schoolInput[2] = schoolInput[2];
    });
    setSchoolInputs(tmpSchoolInputs);
  }

  const handleNext = () => {
    dispatch(addPersonalInfo({schoolInputs}))
    window.location.href = "/association-create/personal-2"
  }

  return (
    <div>
      <div className="container w-2/5 mx-auto">
        <div className="my-40">
            <h2> 학력사항 </h2>
            <div className="flex items-center" style={{"display":"flex"}}>
              <Form layout="horizontal" size="large" style={{"width":"100%"}}>
                <Form.Item label="학력 사항" required tooltip="필수 기입 사항입니다" id="school-select">
                  <Select onChange={onChangeSchoolSelect} placeholder="입력하실 학력 사항을 선택해주세요">
                    <Select.Option value="high">고등학교</Select.Option>
                    <Select.Option value="univ">대학교(학사)</Select.Option>
                    <Select.Option value="grad">대학원(석사)</Select.Option>
                    <Select.Option value="doc">대학원(박사)</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
              <Button size="large" style={{"display":"flex"}} onClick={() => {addSchoolInput(schoolCount)}}>+</Button>
            </div> <br />
            <div className="school-inputs">
              { schoolInputs.map((each, index) => 
                <SchoolInput type={each[1]} count={each[0]} key={index} onSchoolChange={onSchoolChange}/>
              )}
            </div>

            <h2> 경력 사항 </h2>
            <div className="flex items-center" style={{"display":"flex" }}>
              <Form layout="horizontal" size="large" style={{"width":"100%"}}>
                <Form.Item label="경력 사항" required tooltip="필수 기입 사항입니다" id="school-select">
                  <Select onChange={onChangeCareerSelect} placeholder="입력하실 경력 사항을 선택해주세요">
                    <Select.Option value="general">일반 경력사항 (필수)</Select.Option>
                    <Select.Option value="financial">관련 경력사항(투자 및 컨설팅 분야)</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
              <Button size="large" style={{"display":"flex"}} onClick={() => { addCareerInput(careerCount) }}>+</Button>
            </div> 
            <br />
            <div className="career-inputs">
              { careerInputs.map((each, index) => 
                <>
                  <CareerInput type={each[1]} count={each[0]} key={index}/> <br />
                </>
              )}
            </div>
            <br />
            <Button onClick={handleNext} size="large"> 다음 단계 진행하기 </Button>
        </div>
      </div>
    </div>
  );
}

export default PersonalAssociationCreate01;
