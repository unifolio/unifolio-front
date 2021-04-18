import React from 'react'
import styled from 'styled-components';

const ProcessIndicator = () => {
  return (
    <IndicatorArea>
      <IndicatorRow>
        <IndicatorBlock>
          <IndicatorObject />
          <IndicatorDescriptionBlock>
            <IndicatorDescription> 아이디 및 </IndicatorDescription>
            <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
          </IndicatorDescriptionBlock>
        </IndicatorBlock>
        <IndicatorBlock className="line">
          <IndicatorLine />
        </IndicatorBlock>
        <IndicatorBlock>
          <IndicatorObject />
          <IndicatorDescriptionBlock>
            <IndicatorDescription> 아이디 및 </IndicatorDescription>
            <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
          </IndicatorDescriptionBlock>
        </IndicatorBlock>
        <IndicatorBlock className="line">
          <IndicatorLine />
        </IndicatorBlock>
        <IndicatorBlock>
          <IndicatorObject />
          <IndicatorDescriptionBlock>
            <IndicatorDescription> 아이디 및 </IndicatorDescription>
            <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
          </IndicatorDescriptionBlock>
        </IndicatorBlock>
        <IndicatorBlock className="line">
          <IndicatorLine />
        </IndicatorBlock>
        <IndicatorBlock>
          <IndicatorObject />
          <IndicatorDescriptionBlock>
            <IndicatorDescription> 아이디 및 </IndicatorDescription>
            <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
          </IndicatorDescriptionBlock>
        </IndicatorBlock>
        
      </IndicatorRow>
      {/* <IndicatorRow>
        <IndicatorDescriptionBlock>
          <IndicatorDescription> 아이디 및 </IndicatorDescription>
          <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
        </IndicatorDescriptionBlock>
        <IndicatorDescriptionBlock></IndicatorDescriptionBlock>
        <IndicatorDescriptionBlock>
          <IndicatorDescription> 아이디 및 </IndicatorDescription>
          <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
        </IndicatorDescriptionBlock>
        <IndicatorDescriptionBlock></IndicatorDescriptionBlock>
        <IndicatorDescriptionBlock>
          <IndicatorDescription> 아이디 및 </IndicatorDescription>
          <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
        </IndicatorDescriptionBlock>
        <IndicatorDescriptionBlock></IndicatorDescriptionBlock>
        <IndicatorDescriptionBlock>
          <IndicatorDescription> 아이디 및 </IndicatorDescription>
          <IndicatorDescription> 비밀번호 설정 </IndicatorDescription>
        </IndicatorDescriptionBlock>
        {/* <IndicatorDescription> 개인정보 \n 입력 </IndicatorDescription>
        <IndicatorDescription> 핸드폰 \n 인증 </IndicatorDescription>
        <IndicatorDescription> 개인정보 \n 이용동의 </IndicatorDescription>
      </IndicatorRow> 
    */}
    </IndicatorArea>
  )
}

const IndicatorArea = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
`
const IndicatorRow = styled.div`
  width: 100%;
  height: 70px; 
  
  display: flex;
  justify-content: space-around;
`

const IndicatorLine = styled.div`
  width: 100%;
  border-top: 1px solid #BCB6B6;

`
const IndicatorBlock = styled.div`
  display: flex;
  flex-grow: 1;
  &.line {
    width: 100%;
    margin-top: 12.5px;
  }
`
const IndicatorDescriptionBlock = styled.div`
  position: absolute;
  margin-top: 30px;
  margin-left: -25px;
  
  display:flex;
  flex-direction: column;
  align-items: center;
`

const IndicatorObject = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #3C2FF2;
`
const IndicatorDescription = styled.div`
  font-color: ${(props) => {return props.type === "on" ? "#3C2FF2" : "#BCB6B6" }} }
`
export default ProcessIndicator
