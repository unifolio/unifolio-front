import React from 'react'
import styled from "styled-components";
import { Input } from "antd";

const ProfileMaximumInvestableAmount = ({maximumInvestableAmount, handleMaximumInvestableAmountChange}) => {
  return (
    <ProfileMaximumInvestableAmountLayout>
      <Input 
        name="maximum_investable_amount" placeholder="숫자만 입력" 
        value={maximumInvestableAmount} 
        onChange={handleMaximumInvestableAmountChange}
      />
      <span>  원</span>
    </ProfileMaximumInvestableAmountLayout>
  )
}

const ProfileMaximumInvestableAmountLayout = styled.div`
  display: flex;
  width: 30%;
  font-size: 16px;

  input + span {
    margin-left: 15px;
  }
`;

export default ProfileMaximumInvestableAmount;