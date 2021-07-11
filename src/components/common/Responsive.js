import React from 'react';
import styled, { css } from 'styled-components';


const ResponsiveBlock = styled.div`

  max-width:100%;
  margin:0 auto;
  padding: 0 10px;
  @media(max-width: 788px){
    width: 100%;
  }
  ${(props)=>{
    switch (props.level){
      case 1:
        return css`
          max-width:1460px;
          @media(max-width: 1460px){
              width: 100%;
  }`
      case 2:
        return css`
          max-width:1030px;
          @media(max-width: 1030px){
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
