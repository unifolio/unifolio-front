import React from 'react'
import styled from "styled-components";
import Google from 'assets/images/google.png';

const GoogleIcon = () => {
  return (
    <Img src={Google} />
  )
}

const Img = styled.img`
  width: 100%;
`
export default GoogleIcon
