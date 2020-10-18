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
  const { idx, openModal } = props;

  return (
    <CardLayout>
      <h3>{idx}</h3>
      이름<br />
      학력<br />
      학력1<br />
      학력2<br />
      경력<br />
      경력1<br />
      경력2<br />
      경력3<br />
      <button onClick={() => openModal(idx)}>문의하기</button>
    </CardLayout>
  );
}

export default Card;
