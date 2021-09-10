import React from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';

const Card = ({ type, onChangeCurrent }) => {

  const selectCardTitle = (type) => {
    return type === "general" ? "개인" : "법인";
  }

  return (
    <CardLayout>
      <CardRow className={"top"}>
        <CardTitle> {selectCardTitle(type)} </CardTitle>
      </CardRow>
      <CardRow className={"description"}>
        {
          type === "general" 
          && <>
            <CardDescription> 개인투자조합 <CardDescriptionApprove>참여 가능</CardDescriptionApprove> </CardDescription>
            <CardDescription> 개인투자조합 <CardDescriptionReject>결성 불가능</CardDescriptionReject> </CardDescription>
          </>
        }
        {
          type === "business" && <>
            <CardDescription> 개인투자조합 <CardDescriptionApprove>참여 가능</CardDescriptionApprove> </CardDescription>
            <CardDescription> 개인투자조합 <CardDescriptionApprove>결성 가능</CardDescriptionApprove> </CardDescription>
          </>
        }
        
      </CardRow>
      <CardRow className={"button"}>
        <CardButton onClick={() => {onChangeCurrent(type) }}> 가입 시작하기 </CardButton>
      </CardRow>

    </CardLayout>
  )
}

const CardLayout = styled.div`
  width: 260px; 
  padding: 0px 18px;
  
  box-sizing: border-box;
  border: solid 2px rgba(255, 255, 255, 0); // 흔들림 없는 편안함

  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  cursor: pointer;
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  :hover {
    border: solid 2px ${styles.palette.unifolioBlue};
    button {
      border: 1px solid ${styles.palette.unifolioBlue};
      background-color: ${styles.palette.unifolioBlue};
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
  }

  & + & {
    margin-left: 59px;
  }
`

const CardRow = styled.div`
  width: 100%;

  display:flex;
  flex-direction: column;
  align-items: center;
  
  &.top {
    margin-top: 75px;
  }
  &.description {
    margin-top: 27px;
  }
  &.button {
    margin-top: 49px;
    margin-bottom: 27px;
  }

`
const CardButton = styled.button`
  width:100%;
  font-size: 20px;
  line-height: 14px;
  padding: 19px 30px;
  
  border: 1px solid #C4C4C4;
  border-radius: 10px;
  
  background-color: white;
  color: #C4C4C4;
`

const CardTitle = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: ${styles.palette.unifolioBlue};
`

const CardDescription = styled.span``;
const CardDescriptionApprove = styled.span`
  color: ${styles.palette.unifolioBlue};
`;
const CardDescriptionReject = styled.span`
  color: red;
`;

export default Card
