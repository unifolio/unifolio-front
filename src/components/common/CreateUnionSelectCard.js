import React from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';

const CreateUnionSelectCard = ({ type }) => {

  const selectCardTitle = (type) => {
    return type === "general" ? "개인 운용" : "법인 운용";
  }

  return (
    <CardLayout>
      <CardRow className={"top"}>
        <CardTitle> {selectCardTitle(type)} </CardTitle>
      </CardRow>
      <CardRow className={"description"}>
        <CardDescriptionLayer>
          <CardDescription> 다음과 같은 정보가 필요합니다. </CardDescription>
        </CardDescriptionLayer>
        {
          type === "general" 
          && <CardDescriptionDetail> 업무집행조합원 정보 (학력 및 경력사항 포함), 신규 조합 정보 (출자 금액, 모집 기간, 모집 인원 등), 조합 사무소 정보, 조합 상세 모집 계획</CardDescriptionDetail>
        }
        {
          type === "business" 
          && <CardDescriptionDetail> 법인 대표자 및 투자 심사역 정보 (학력 및 경력사항 포함), 신규 조합 정보 (출자 금액, 모집 기간, 모집 인원 등), 조합 사무소 정보, 조합 상세 모집 계획 </CardDescriptionDetail>
        }
        
      </CardRow>
      <CardRow className={"button"}>
        {
          type === "general" 
          && <CardButton onClick={() => { window.location.href="/union-create/personal" }}> 개인이 운용할 신규 개인투자조합 만들기 </CardButton>
        }
          {
          type === "business" 
          && <CardButton onClick={() => { window.location.href="/union-create/business" }}> 법인이 운용할 신규 개인투자조합 만들기 </CardButton>
        }
      </CardRow>

    </CardLayout>
  )
}

const CardLayout = styled.div`
  padding: 18px 56px;
  
  box-sizing: border-box;
  border: solid 2px rgba(255, 255, 255, 0); // 흔들림 없는 편안함

  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  cursor: pointer;
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  flex-grow: 1;
  
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
    margin-left: 1rem;
  }
`

const CardRow = styled.div`
  width: 100%;

  display:flex;
  flex-direction: column;
  /* align-items: center; */
  
  &.top {
    margin-top: 3rem;
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

const CardDescription = styled.span`
  color: ${styles.palette.descriptionGrey}
`;
const CardDescriptionDetail = styled(CardDescription)`
  font-size: 14px;
`
const CardDescriptionLayer = styled.div`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${styles.palette.descriptionGrey};
`
export default CreateUnionSelectCard