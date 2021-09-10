import React from 'react'
import styled from "styled-components";
import Facebook from 'assets/images/facebook.png';

const FacebookIcon = () => {
  return (
    <Img src={Facebook} />
  )
}

const Img = styled.img`
  width: 100%;
`
export default FacebookIcon
