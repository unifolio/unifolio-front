import React from 'react'
import styled from 'styled-components';

import { Input } from 'antd';

const BusinessGeneralInformationInput = ({ user = null, isReadonly, handleInputChange }) => {
  
  return (
    <BusinessGeneralInformationInputLayout>
      <InfoRow>
        <InfoColumns>
          <Input type={"text"} size="large" placeholder="이름" style={{width: "195px"}} disabled={isReadonly ? true : false} 
            value={user?.name ?? ""} onChange={(e) => {handleInputChange({name:"name", value:e.target.value})}} 
          />
          <Input type={"text"} size="large" placeholder="주민번호 앞 6자리" style={{width: "195px"}} disabled={isReadonly ? true : false} 
            value={user["rrn-front"] ?? ""} onChange={(e) => {handleInputChange({name:"rrn-front", value:e.target.value})}} 
          /> -
          <Input type={"text"} size="large" placeholder="주민번호 뒷자리" style={{width: "195px", marginLeft:"10px"}} disabled={isReadonly ? true : false} 
            value={user["rrn-back"] ?? ""} onChange={(e) => {handleInputChange({name:"rrn-back", value:e.target.value})}} 
          />
        </InfoColumns>
      </InfoRow>
      <InfoRow>
        <InfoColumns>
          <Input type={"text"} size="large" placeholder="우편번호" style={{width: "195px"}} disabled={isReadonly ? true : false}  
            value={user?.address_postcode ?? ""} onChange={(e) => {handleInputChange({name:"address_postcode", value:e.target.value})}} 
          />
          <Input type={"text"} size="large" placeholder="주소" style={{width: "415px"}} disabled={isReadonly ? true : false}  
            value={user?.address ?? ""} onChange={(e) => {handleInputChange({name:"address", value:e.target.value})}} 
          />
          <Input type={"text"} size="large" placeholder="상세 주소 입력" style={{width: "195px"}} disabled={isReadonly ? true : false}  
            value={user?.address_detail ?? ""} onChange={(e) => {handleInputChange({name:"address_detail", value:e.target.value})}} 
          />
        </InfoColumns>
      </InfoRow>
    </BusinessGeneralInformationInputLayout>
  )
}

const BusinessGeneralInformationInputLayout = styled.div`
	width:100%;
  margin-bottom: 10px;

	/* display: flex; */
`;

const InfoSection = styled.section``;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  
  & + & {
    margin-top: 24px;
  } 
`;
const InfoColumns = styled.div`
  display: flex;
  /* justify-content: space-between; */

  input {
    /* width: 100%; */
    margin-right: 10px;
  }
`;

export default BusinessGeneralInformationInput;
