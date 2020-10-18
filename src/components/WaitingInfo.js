import React from 'react';

const WaitingInfo = (props) => {
  const {idx} = props
  return (
    <>
      <h3>{idx}</h3>
      이름<br />
      학력<br />
      학력1<br />
      학력2<br />
      경력<br />
      경력1<br />
      경력2<br />
      경력3<br />
    </>
  );
}

export default WaitingInfo;
