import React from 'react'
import styled from "styled-components";
import KaKao from 'assets/images/kakao.png';

const KaKaoIcon = () => {
  return (
    <Img src={KaKao} />
  )
}

const Img = styled.img`
  width: 100%;
`
export default KaKaoIcon
