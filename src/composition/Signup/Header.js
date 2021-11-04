import React from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';

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
      case "general":
        return (
          <HeaderTitle>개인 회원 가입</HeaderTitle>
        )
      case "business":
        return (
          <HeaderTitle>법인 회원 가입</HeaderTitle>
        )
      default:
        return <></>;
    }
  }
  
  return selectHeaderRender(current);
}

const HeaderTitle = styled.span`
  color: ${styles.palette.unifolioBlue};
  font-size: 33px;
`
const HeaderSubTitle = styled.span`
  color: ${styles.palette.deactiveGrey};
  font-size: 20px;
  margin-top: 15px;
`


export default Header
