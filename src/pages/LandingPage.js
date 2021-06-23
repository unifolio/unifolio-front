import Accordion from 'components/common/Accordion/Accordion';
import Responsive from 'components/common/Responsive';
import LandingCard from 'components/Landing/LandingCard';
import React from 'react';
import styled from 'styled-components';

import palette from '../lib/styles/palette';


const TopSection = styled.section`
  width:100%;
  height:491px;
  background-color: ${palette.blue[0]};
  display:flex;
  justify-content: center;
  align-items: center;
`;
const TopCardsSection = styled.section`
  display:grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  max-width: 1440px;
  left: 50%; 
  margin-top: -100px;
  padding: 0 10px;
	/* @media (max-width: 1140px) {
    grid-template-columns: 1fr 1fr;
	} */
  @media (max-width: 1040px) {
    margin-top: -75px;

	}
  @media (max-width: 915px) {
    grid-template-columns: 1fr 1fr;

	}
  @media (max-width: 615px) {
    grid-template-columns: 1fr;

	}
`;
const Title = styled.span`
  display:block;
  font-size: 44px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  word-break:keep-all;

`;
const Summary = styled.p`
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  font-weight: 300;
  word-break:keep-all;

`;
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
const SectionTitle = styled.span`
  display:block;
  font-size: 36px;
  color:rgba(60, 47, 242, 1);
  font-weight: 700;
  margin-bottom: 16px;
`;

const MiddleSection2 = styled.section`
  width:100%;
  /* display:grid;
  place-items: center center;
  grid-template-rows: 1fr 3fr 0.5fr;
  color:black;
  /* padding-bottom:2rem; */
  /* height: calc(100vh - 4rem);
  max-width: 1440px;
	margin: 0 auto; */ 
  padding-bottom: 95px;
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
const MiddleCardsSection = styled.section`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  max-width: 1440px;
  left: 50%; 
  padding: 0 10px;

  @media (max-width: 915px) {
    grid-template-columns: 1fr 1fr;

	}
  @media (max-width: 615px) {
    grid-template-columns: 1fr;

	}
`;

const LandingPage = () => {
  return (
    <>
      <TopSection>
        <Responsive level={2}>
        <div>
          <Title> 개인투자 조합 결성 관리 플랫폼 </Title>
          <Summary>
          UNIFOLIO는 출자자와 운용사의 개인 투자 조합 결성을 중개하고, <br/>
          결성된 조합의 관리를 돕는 플랫폼 서비스입니다.
          </Summary>
        </div>
        </Responsive>
      </TopSection>
      <TopCardsSection>
          <LandingCard title="출자 대기중인 출자자" number="000"/>
          <LandingCard title="결성 대기중인 개인투자조합" number="000"/>
          <LandingCard title="결성 완료된 개인 투자조합" number="000"/>
        </TopCardsSection>
      <MiddleSection1>
        서비스 디테일(사용방법 간단한 영상)
      </MiddleSection1>

      <MiddleSection2>
      <Responsive level={2}>
        <SectionTitle>Key benefit</SectionTitle>
        <MiddleCardsSection>
            {/* <Card>
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
            </Card> */}
            <article>
              <img/>
              <div>
                <p>출자자</p>
                <p>유니콘 어쩌구 시부래</p>
              </div>
            </article>
            <article>
              <img/>
              <div>
                <p>출자자</p>
                <p>유니콘 어쩌구 시부래</p>
              </div>
            </article>
            <article>
              <img/>
              <div>
                <p>출자자</p>
                <p>유니콘 어쩌구 시부래</p>
              </div>
            </article>
        </MiddleCardsSection>
        </Responsive>
      </MiddleSection2>
        <MiddleSection2>
         <Responsive level={2}>
            <SectionTitle>Questions</SectionTitle>
            <Accordion />
          </Responsive>
        </MiddleSection2>
    </>
  );
}

export default LandingPage;