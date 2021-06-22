import React from 'react';
import styled, { css } from 'styled-components';


const ResponsiveBlock = styled.div`

  max-width:100%;
  margin:0 auto;
  @media(max-width: 768px){
    width: 100%;
  }
  ${(props)=>{
    switch (props.level){
      case 1:
        return css`
          max-width:1440px;
          @media(max-width: 1440px){
              width: 100%;
  }`
      case 2:
        return css`
          max-width:1010px;
          @media(max-width: 1010px){
              width: 100%;

  }`
      default:
        return css`
          width:100%;
        `
    }
  }

  }


`;

const Responsive = ({ level ,children, ...rest }) => {
  return <ResponsiveBlock level={level} { ...rest }> { children } </ResponsiveBlock>;
}

export default Responsive;
