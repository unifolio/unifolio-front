import React from 'react'
import styled from "styled-components";
import Naver from 'assets/images/naver.png';

const NaverIcon = () => {
  return (
    <Img src={Naver} />
  )
}

const Img = styled.img`
  width: 100%;
`
export default NaverIcon
