import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  max-width:100%;

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media(max-width: 768px){
    width: 100%;
  }
`;

const Responsive = (props) => {
  console.log(props);
  // console.log(props.children)
  const { children, ...rest } = props;
  console.log(rest);

  return (
    <ResponsiveBlock { ...rest }> { children } </ResponsiveBlock>
      
  );
}

export default Responsive;
