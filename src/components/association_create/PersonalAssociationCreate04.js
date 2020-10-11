import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import SchoolInput from './SchoolInput';
import CareerInput from './CareerInput';

const PersonalAssociationCreate02 = () => {
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
        <div className="my-5">
        
            <div className="flex items-center">
                <h2> 조합 이름 </h2> 
                <input type="text" name="name" placeholder="조합 이름" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" maxlength="50" required="" id="id_name" />
                
                <h2> 투자 종목 </h2> 
                <input type="text" name="invest_category_1" placeholder="투자 분야 1 (입력)" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_invest_category_1"/>
                <input type="text" name="invest_category_2" placeholder="투자 분야 2 (입력)" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_invest_category_2"/>
                <input type="text" name="invest_category_3" placeholder="투자 분야 3 (입력)" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_invest_category_3"/>
            </div>

            <div className="mb-4"></div>
        
            <div className="flex items-center my-1 mb-3">
              <h2> 목표 모집인원 </h2>
              <input type="text" name="num_of_recruit" placeholder="최대 49명 이하" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50"  required="" id="id_num_of_recruit" /> 명
              <input type="text" name="recruitment_start_date" placeholder="모집 시작 날짜" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_recruitment_start_date" />~<input type="text" name="recruitment_end_date" placeholder="모집 마감 날짜" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_recruitment_end_date" />
            </div>

            <div className="mb-4"></div>
        
            <div className="font-bold text-left text-xl py-1"></div>

            <div className="flex items-center mb-3 ">
              <h2> 출자 금액 </h2>
              <input type="text" name="expected_amount" placeholder="목표 출자금(최소 1억원 이상)" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_expected_amount"/> 만원
            </div>

            
            <div className="font-bold text-left text-xl"></div>

            <div className="flex items-center my-1 mb-3 ">
              <h2> 운용사 출자 금액 </h2>
              <input type="text" name="account_by_operator" placeholder="운용사 출자 예정 금액" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_account_by_operator"/> % 
              <input type="text" name="account_by_operator" placeholder="운용사 출자 예정 금액" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_account_by_operator"/> 만원
              <div className="text-xs text-gray-500">* 업무집행조합원의 경우 필수적으로 출자 총액의 5% 이상 출자해야합니다.</div>    
            </div>

            <div className="flex items-center mb-3 ">
              <h2>출자 1좌별 금액</h2>
                <input type="text" name="amount_per_account" placeholder="출자 1좌의 금액(최소 100만원 이상)" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_amount_per_account"/> 만원
                <input type="text" name="amount_per_account" placeholder="출자 1좌의 금액(최소 100만원 이상)" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_amount_per_account"/> 만원
            </div>

            <div className="flex items-center mb-3 ">
              <h2> 조합 존속기간 </h2>
              <input type="text" name="real_period" placeholder="조합 존속 기간" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_real_period"/> 년
              <input type="text" name="extend_year" placeholder="존속기간 만료시 최대 연장기간" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_extend_year"/> 년
            </div>
            
            <div className="mb-4"></div>
            <br />
            <div className="flex">
              <Link to="/association-create/personal-3">이전 단계</Link><br />
              <Link to="/association-create/personal-5">다음 단계 진행하기</Link>
            </div>

        </div>
    </div>
    </div>
  );
}

export default PersonalAssociationCreate02;
