import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const PersonalAssociationCreate05 = () => {

  return (
    <div>
      <div className="container w-2/5 mx-auto">
        <div className="my-5">
        
            <div className="flex items-center">
                <h2> 신규 개인투자조합 동의 </h2> 
                <input type="checkbox" name="name" value="1" /> 모집 계획에 대한 심사 결과 및 피드백은 영업일을 기준으로 최대 2일이 소요됩니다. <br />
                <input type="checkbox" name="name" value="2" /> 심사 결과 및 피드백이 완료되면 계정에 등록된 이메일 주소 및 연락처로 관련 내용을 받아볼 수 있습니다. <br />
                <input type="checkbox" name="name" value="3" /> 심사 후 조합 결성 완료 시, 조합 관리 메뉴 내의 결성 대기 중인 개인투자조합에서 현황을 확인하실 수 있습니다. <br />
                <input type="checkbox" name="name" value="4" /> 모두 확인했습니다. <br />
            </div>

            <div className="mb-4"></div>
            <br />
            <div className="flex">
              <Link to="/association-create/personal-4">이전 단계</Link><br />
              <Link to="/association-create/personal-complete">완료</Link>
            </div>

        </div>
    </div>
    </div>
  );
}

export default PersonalAssociationCreate05;
