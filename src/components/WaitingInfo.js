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
  const {idx} = props
  return (
    <WaitingInfoPosition>
      <WaitingInfoBlock>
        <h3>{idx}</h3><br/>
        이름<br />
        학력<br />
        학력1<br />
        학력2<br />
        경력<br />
        경력1<br />
        경력2<br />
        경력3<br />
      </WaitingInfoBlock>
    </WaitingInfoPosition>
  );
}

export default WaitingInfo;
