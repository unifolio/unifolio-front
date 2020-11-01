import React from 'react';
import styled from 'styled-components';

const WaitingInfoPosition = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;

const WaitingInfoBlock = styled.div`
  display:block;
`;

const WaitingInfo = (props) => {
  const {idx, info} = props

  if(info === null){
    return(<></>);
  }

  return (
    <WaitingInfoPosition>
      <WaitingInfoBlock>
        <h3>{idx}</h3>
        {console.log("모달", info)}
        이름 : {info.username}<br />
        소개 : {info.introduction}<br />
        <h4>학력</h4>
        학력1<br />
        학력2<br />
        <h4>경력</h4>
        경력1 : {info.corporate_name}<br />
        경력2<br />
        경력3<br />
      </WaitingInfoBlock>
    </WaitingInfoPosition>
  );
}

export default WaitingInfo;
