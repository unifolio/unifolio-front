import React from 'react';
import styled from 'styled-components';

const Header = ({ current = "default" }) => {
  
  const selectHeaderRender = (current) => {
    switch (current) {
      case "default":
        return (
          <>
            <HeaderTitle>회원 가입</HeaderTitle>
            <HeaderSubTitle>회원 가입 유형을 선택해주세요</HeaderSubTitle>
          </>
        )
      case "personal":
        return (
          <HeaderTitle>개인 회원 가입</HeaderTitle>
        )
      case "corporation":
        return (
          <HeaderTitle>법인 회원 가입</HeaderTitle>
        )
    }
  }
  
  return selectHeaderRender(current);
}

const HeaderTitle = styled.span`
  color: #3D31E4;
  font-size: 33px;
`
const HeaderSubTitle = styled.span`
  color: #847F7F;
  font-size: 20px;
  margin-top: 15px;
`


export default Header
