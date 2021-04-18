import React from 'react'
import styled from 'styled-components';

const ProcessIndicator = ({ process }) => {
  
  const processDescriptions = [
    ["아이디 및", "비밀번호 설정"], 
    ["개인정보", "입력"],
    ["핸드폰", "인증"],
    ["개인정보", "이용동의"],
  ];
   
  return (
    <IndicatorArea>
      <IndicatorRow>
        {processDescriptions.map((descriptions, i) => {
          if (i+1 === process) {
            return ( 
              <>
                <IndicatorBlockActive>
                  <IndicatorObject className={"indicator-object"}/>
                  <IndicatorDescriptionBlock>
                    {descriptions.map(description => <IndicatorDescription>{description}</IndicatorDescription>)}
                  </IndicatorDescriptionBlock>
                </IndicatorBlockActive>
                {i+1 !== processDescriptions.length 
                  && 
                  <IndicatorBlock className="line">
                    <IndicatorLine />
                  </IndicatorBlock>
                }
              </>
            );
          } else {
            return ( 
              <>
                <IndicatorBlock>
                  <IndicatorObject />
                  <IndicatorDescriptionBlock>
                    {descriptions.map(description => <IndicatorDescription>{description}</IndicatorDescription>)}
                  </IndicatorDescriptionBlock>
                </IndicatorBlock>
                {i+1 !== processDescriptions.length 
                  && 
                  <IndicatorBlock className="line">
                    <IndicatorLine />
                  </IndicatorBlock>
                }
              </>
            );
          }
        })}
      </IndicatorRow>
    </IndicatorArea>
  )
}

const IndicatorArea = styled.div`
  width: 100%;
  margin-top: 85px;
  margin-bottom: 100px;

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
const IndicatorBlockActive = styled.div`
  display: flex;
  flex-grow: 1;

  span {
    color:#3C2FF2
  }
  .indicator-object {
    background-color:#3C2FF2
  }
`

const IndicatorDescriptionBlock = styled.div`
  position: absolute;
  margin-top: 30px;
  margin-left: -32px;
  
  display:flex;
  width: 90px;
  flex-basis: 80px;
  flex-direction: column;
  align-items: center;
`

const IndicatorObject = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #BCB6B6;
`
const IndicatorDescription = styled.span`
  color: #BCB6B6;
`
export default ProcessIndicator
