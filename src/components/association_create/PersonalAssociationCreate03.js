import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import SchoolInput from './SchoolInput';
import CareerInput from './CareerInput';

const PersonalAssociationCreate03 = () => {
  const [schoolInputs, setSchoolInputs] = useState([]);
  const [careerInputs, setCareerInputs] = useState([]);
  const [schoolCount, setSchoolCount ] = useState(2);
  const [careerCount, setCareerCount ] = useState(1);
  // let count = 2;
  
  const clickPostAdress = (open = false) => {
    console.log("open", open);
    if (open === false ) {
      if (document.querySelector("input#postcode").value !== "") {
        return;
      }
    } else {
      
    }
    
    new window.daum.Postcode({
      oncomplete: function(data) {
        console.log(data);
        let postcode = data.zonecode;
        let address = data.address;
        document.querySelector("input#postcode").value = postcode;
        document.querySelector("input#address").value = address;
      }
    }).open();
  }
  
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      console.log("is onload ?")
    }
    document.body.appendChild(script);
    
  }, [])

  return (
    <div>
      <div className="container w-2/5 mx-auto">
        <div className="my-5">
            <div id="post-address" className="flex items-center">
                <h2> 조합 사무소 주소</h2> 
                <button onClick={(e) => {clickPostAdress(true)}}> 우편번호 찾기 </button> <br />
                <input type="text" id="postcode" name="name" placeholder="우편번호" readOnly={true} onClick={(e) => {clickPostAdress()}} className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required=""/> <br />
                <input type="text" id="address" placeholder="주소" readOnly={true}  onClick={(e) => {clickPostAdress()}} className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" /><br />
                <input type="text" id="detail_address"name="name" placeholder="상세주소" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" /><br />
            </div>

            <div className="mb-4"></div>
        
            <div className="flex items-center my-1 mb-3">
              <h2> 조합 사무소 연락처 </h2>
              <input type="text" name="num_of_recruit" placeholder="전화번호" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50"  required="" id="id_num_of_recruit" /> 명
              <input type="text" name="recruitment_start_date" placeholder="FAX" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_recruitment_start_date" />
              <input type="text" name="account_by_operator" placeholder="이메일" className="appearance-none bg-transparent border-b border-gray-700 w-full text-gray-700 py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:bg-opacity-50" required="" id="id_account_by_operator"/>
            </div>

            <div className="mb-4"></div>
            <br />
            <div className="flex">
              <Link to="/association-create/personal-2">이전 단계</Link><br />
              <Link to="/association-create/personal-4">다음 단계 진행하기</Link>
            </div>

        </div>
    </div>
    </div>
  );
}

export default PersonalAssociationCreate03;
