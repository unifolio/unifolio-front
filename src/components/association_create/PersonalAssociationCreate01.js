import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import SchoolInput from './SchoolInput';
import CareerInput from './CareerInput';

const PersonalAssociationCreate01 = () => {
  const [schoolInputs, setSchoolInputs] = useState([]);
  const [careerInputs, setCareerInputs] = useState([]);
  const [schoolCount, setSchoolCount ] = useState(2);
  const [careerCount, setCareerCount ] = useState(1);
  // let count = 2;
  
  const addSchoolInput = (count) => {
    let selects = document.querySelector("select#school");
    let selected = selects.options[selects.selectedIndex].value;
    let tmpSchoolInputs = schoolInputs
    tmpSchoolInputs.push( [count, selected] );
    setSchoolInputs(tmpSchoolInputs);
    setSchoolCount(count + 1);
  }

  const addCareerInput = (count) => {
    let selects = document.querySelector("select#career");
    let selected = selects.options[selects.selectedIndex].value;
    let tmpCareerInputs = careerInputs
    tmpCareerInputs.push( [count, selected] );
    setCareerInputs(tmpCareerInputs);
    setCareerCount(count + 1);
  }

  return (
    <div>
      <div className="container w-2/5 mx-auto">
        <div className="my-40">
            <h2> 학력사항 </h2>
            <div className="flex items-center my-2 ">
                <select id="school">
                  <option value="high">고등학교(필수)</option>
                  <option value="univ">대학교(필수)</option>
                  <option value="grad">대학원(석사)</option>
                  <option value="doc">대학원(박사)</option>
                </select>
                <button type="button" onClick={() => {addSchoolInput(schoolCount)}}>+</button>
            </div> <br />
            <div className="school-inputs">
                { schoolInputs.map((each, index) => 
                  <SchoolInput type={each[1]} count={each[0]} key={index}/>
                )}
            </div>
            

            <div className="mb-8"></div>

            <h2> 경력사항 </h2>
            <div className="flex items-center my-2 ">
                <select id="career">
                  <option value="general">일반 경력사항(필수)</option>
                  <option value="financial">관련 경력사항(투자 및 컨설팅 분야)</option>
                </select>
                <button type="button" onClick={() => {addCareerInput(careerCount)}}>+</button>
            </div> <br />
            <div className="career-inputs">
                { careerInputs.map((each, index) => 
                  <>
                    <CareerInput type={each[1]} count={each[0]} key={index}/> <br />
                  </>
                )}
            </div>

            <div className="mb-8"></div>
            <br />
            <Link to="/association-create/personal-2">다음 단계 진행하기</Link>
            
        </div>
      </div>
    </div>
  );
}

export default PersonalAssociationCreate01;
