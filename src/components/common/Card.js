import React from 'react';
import styled from 'styled-components';

const CardLayout = styled.div`
  width:100%;
  height:100%;
  box-shadow: 0 5px 7px -1px gray;
  padding:1rem;
  display:grid;
`;

const Card = (props) => {
  const { idx, info, openModal } = props;
  console.log(info);
  return (
    <CardLayout>
      <h3>{idx}</h3>
      이름 : {info.username}<br />
      소개 : {info.introduction}<br />
      <h4>학력</h4>
      학력1<br />
      학력2<br />
      <h4>경력</h4>
      경력1 : {info.corporate_name}<br />
      경력2<br />
      경력3<br />
      <button onClick={() => openModal({idx, info})}>문의하기</button>
    </CardLayout>
  );
}

export default Card;
