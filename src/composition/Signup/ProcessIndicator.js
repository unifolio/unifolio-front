import React from 'react'
import styled from 'styled-components';

import styles from 'lib/styles';

const ProcessIndicator = ({ process, current }) => {
  const processDescriptions = {
    general: [
      ["아이디 및", "비밀번호 설정"], 
      ["개인정보", "입력"],
      ["핸드폰", "인증"],
      ["개인정보", "이용동의"],
    ],
    business: [
      ["아이디 및", "비밀번호 설정"], 
      ["법인정보", "입력"],
      ["법인정보", "이용동의"],
    ]
  }
  
  const renderIndicatorLine = () => {
    return (
      <IndicatorBlock className="line">
        <IndicatorLine />
      </IndicatorBlock>
    );
  }

  return (
    <IndicatorArea current={current}>
      <IndicatorRow>
        {processDescriptions[current].map((descriptions, i) => {
          if (i+1 <= process) { // active
            return ( 
              <React.Fragment key={`indicatorFragment-${i}`}>
                <IndicatorBlockActive>
                  <IndicatorObject className={"indicator-object"}/>
                  <IndicatorDescriptionBlock>
                    {descriptions.map((description, j) => {
                      return <IndicatorDescription key={`indicator-desc-${i}${j}`}>{description}</IndicatorDescription>
                    }) }
                  </IndicatorDescriptionBlock>
                </IndicatorBlockActive>
                {i+1 !== processDescriptions[current].length && renderIndicatorLine()}
              </React.Fragment>
            );
          } else {
            return ( 
              <React.Fragment key={`indicatorFragment-${i}`}>
                <IndicatorBlock>
                  <IndicatorObject />
                  <IndicatorDescriptionBlock>
                    {descriptions.map((description, j) => {
                      return <IndicatorDescription key={`indicator-desc-${i}${j}`}>{description}</IndicatorDescription>
                    }) }
                  </IndicatorDescriptionBlock>
                </IndicatorBlock>
                {i+1 !== processDescriptions[current].length && renderIndicatorLine()}
              </React.Fragment>
            );
          }
        })}
      </IndicatorRow>
    </IndicatorArea>
  )
}

const IndicatorArea = styled.div`
  width: ${props => props.current === "general" ? "100%" : "75%"};
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
  border-top: 1px solid ${styles.palette.deactiveGrey};

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
    color: ${styles.palette.unifolioBlue}
  }
  .indicator-object {
    background-color: ${styles.palette.unifolioBlue}
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
  background-color: ${styles.palette.deactiveGrey};
`
const IndicatorDescription = styled.span`
  color: ${styles.palette.deactiveGrey};
`
export default ProcessIndicator
