import React from 'react';
import styled from 'styled-components';

import palette from '../lib/styles/palette';

const Spacer = styled.div`
  height: 8rem;
`;

const LandingPageBlock = styled.div`
  background-color: ${palette.blue[0]};
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:-1;
  display:grid;
  grid-template-rows: 8rem 1fr 1fr 1fr;
  padding-left:3rem;
  padding-right:3rem;
  
`;

const TopSection = styled.section`
  display:grid;
  place-items: center center;
  color:white;
  /* padding-bottom:2rem; */
  grid-template-rows: 1fr 3fr 0.5fr;
  height: calc(100vh - 8rem);
`
const TopCardsSection = styled.section`
  display:grid;
  width:100%;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  max-width: 1440px;
	margin: 0 auto;
	@media (max-width: 1440px) {
		width: 100%;
	}
`;

const Card = styled.div`
  width:100%;
  min-height:10rem;
  background-color:white;
  color:black;

`
const MiddleSection1 = styled.section`
  width:100%;
  display:grid;
  place-items: center center;
  color:black;
  /* padding-bottom:2rem; */
  height: calc(100vh - 4rem);
  max-width: 1440px;
	margin: 0 auto;
	@media (max-width: 1440px) {
		width: 100%;
	}
`;

const MiddleSection2 = styled.section`
  width:100%;
  display:grid;
  place-items: center center;
  grid-template-rows: 1fr 3fr 0.5fr;
  color:black;
  /* padding-bottom:2rem; */
  height: calc(100vh - 4rem);
  max-width: 1440px;
	margin: 0 auto;
	@media (max-width: 1440px) {
		width: 100%;
	}
`;

const MiddleSection3 = styled.section`
  width:100%;
  display:grid;
  place-items: center center;
  color:black;
  /* padding-bottom:2rem; */
  height: calc(100vh - 4rem);
  max-width: 1440px;
	margin: 0 auto;
	@media (max-width: 1440px) {
		width: 100%;
	}
`;

const LandingPage = () => {
  return (
    <LandingPageBlock>
      <Spacer></Spacer>
      <TopSection>
        <div>
          <h1> 당신의 첫 개인투자조합 </h1> <br />
          UNIFOLIO는 3,000억 개인투자조합 시장에서 <br />
          개인투자조합을 중개하고 조합의 관리를 돕는 최초의 플랫폼 서비스입니다.<br />
        </div>
        <TopCardsSection>
          <Card><h1>출자 대기중인 출자자</h1></Card>
          <Card><h1>결성 대기중인 개인투자조합</h1></Card>
          <Card><h1>결성 완료된 개인 투자조합</h1></Card>
          <div></div>
        </TopCardsSection>
      </TopSection>
      <MiddleSection1>
        서비스 디테일(사용방법 간단한 영상)
      </MiddleSection1>
      <MiddleSection2>
        <h1>Key benefit</h1>
        <TopCardsSection>
            <Card>
              <h1>개인</h1>
              <h1>신규 재태크 수단으로서 스타트업으로 투자 수익을 확보하고 소득공제를 받을 수 있습니다.</h1>
            </Card>
            <Card>
              <h1>운용사</h1>
              <h1>신규 운용 자산을 창출하고 조합운용으로 인한 수익을 확보할 수 있습니다.</h1>
            </Card>
            <Card>
              <h1>스타트업</h1>
              <h1>신규 사업 자금을 확보하고 회사를 알릴 수 있습니다.</h1>
            </Card>
        </TopCardsSection>
        <div></div>
      </MiddleSection2>
        <MiddleSection3>
        Questions
          개인투자조합이 무엇인가요?
          >
          사용되는 용어들에 대해 설명해주실 수 있나요?
          >
          UNIFOLIO의 이용 절차는 어떻게 되나요?
          >
          개인이 개인투자조합에 출자할 수 있는 조건이 있나요?
          >
          개인이 개인투자조합을 만들 수 있나요?
          >
          출자금에 대한 회수는 어떻게 할 수 있나요?
          >
        </MiddleSection3>
      
    </LandingPageBlock>
  );
}

export default LandingPage;