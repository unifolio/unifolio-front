import Accordion from 'components/common/Accordion/Accordion';
import Responsive from 'components/common/Responsive';
import LandingCard from 'components/Landing/LandingCard';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LandingLogo } from "../assets/svgs/LandingLogo.svg";
import { ReactComponent as Person } from "../assets/svgs/Person.svg";
import { ReactComponent as Company } from "../assets/svgs/Company.svg";
import JokeImage from '../assets/images/ping.png';



const TopSection = styled.section`
  width:100%;
  height:500px;
  background-color: #49458B;
  display:flex;
  align-items: center;
  justify-content: flex-start;
`;
const SectionLayout = styled.div`
  width:100%;
  max-width: 1300px;
  margin: 0 auto;
  display:flex;
  flex-direction: column;
  padding:0 100px;
`;
const TopCardsSection = styled.section`
  display:grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin: 0 auto;
  max-width: 1440px;
  left: 50%; 
  margin-top: -75px;
  padding: 0 75px;

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
  font-weight: bold;
  font-size: 32px;  
  color: #ffffff;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 30px;
  word-break:keep-all;

`;
const Summary = styled.p`
  font-size: 24px;
  line-height: 40px;
  text-align: left;
  color: #ffffff;
  font-weight: 500;
  word-break:keep-all;
`;
const MiddleSection1 = styled.section`
  padding-top: 50px;
`;
const SectionTitle = styled.span`
  display:block;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const SectionSummary = styled(Summary)`
  font-size:24px;
  color: #494949;
`;
const ImageSectionOuterLayout = styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  margin-top:30px;
  margin-bottom: 50px;
  padding: 0 120px;
  gap:30px;
`;
const ImageSectionInnerLayout = styled.div`
  display:flex;
  flex-direction: column;
  gap:30px;
`;
const ImageItem = styled.article`
  width:150px;
  height:150px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #767676;
  border-radius: 4px;
`;
const ArticleTitle = styled.h4`
  font-weight: bold;
  font-size: 18px;
  color: #767676;
  line-height: 24px;
  margin-bottom:14px;
`;
const ImageItemBrown = styled(ImageItem)`
  background: #767676;
  border:0;
  border-radius: 4px;
`;
const ArticleTitleWhite = styled(ArticleTitle)`
  color:white;
  font-weight: 500;
`;
const ServiceImageLayout = styled.div`
  width:100%;
  height:322px;
  border: 1px solid #C4C4C4;
  display:flex;
  justify-content: center;
  align-items: center;
`;
const MiddleSection2 = styled.section`
  width:100%;
  padding-bottom: 95px;
`;

const MiddleSection3 = styled(TopSection)`
  width:100%;
  height:auto;
  padding-top:50px;
  padding-bottom:50px;
`;
const Section3Title = styled(SectionTitle)`
  margin-top:0;
  color:#fff;
`;
const Section3Summary = styled(SectionSummary)`
  color: #fff;
  font-weight: 500;
`;
const ImageSectionOuterLayoutNoGap = styled(ImageSectionOuterLayout)`
  gap:0;
`;
const MiddleSection4 = styled(MiddleSection3)`
  background-color: #fff;
`;
const Section4Title = styled(Section3Title)`
  color: #49458B;
`;
const Section4Summary = styled(SectionSummary)`
  color: #49458B;  
  font-weight: 500;
  margin-bottom:70px;
`;
const CardContainer = styled.section`
  display:flex;
  align-items: stretch;
  justify-content: space-between;
  gap:20px;
`;
const SummaryCard = styled.section`
  background-color: #49458B;  
  width: 350px;
  min-height: 380px;
  padding-top: 40px;
  padding-bottom: 20px;
  word-break: keep-all;
`;
const CardTitle = styled.span`
  display:block;
  text-align:center;
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
  margin-bottom:50px;
`;
const CardSummary = styled.span`
  display:block;
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
  text-align: center;
  color: #FFFFFF;
  & > span{
    font-weight: 500;
  }
`;
const MiddleSection5 = styled(TopSection)`
  background: #F2F2F2;
  width:100%;
  height:auto;
  padding-top:50px;
  padding-bottom:50px;
  flex-direction: column;
`;
const QustionTitle = styled(SectionTitle)`
  margin-top:0;
  color: #49458B;
`;
const LandingPage = () => {
  return (
    <>
      <TopSection>
        <SectionLayout>
          <LandingLogo />
          <Title> 개인투자 조합 결성 관리 플랫폼 </Title>
          <Summary>
          UNIFOLIO는 출자자와 운용사의 개인 투자 조합 결성을 중개하고, <br/>
          결성된 조합의 관리를 돕는 플랫폼 서비스입니다.
          </Summary>
        </SectionLayout>
      </TopSection>
      <TopCardsSection>
          <LandingCard title="출자 대기중인 출자자" number="000"/>
          <LandingCard title="결성 대기중인 개인투자조합" number="000"/>
          <LandingCard title="결성 완료된 개인투자조합" number="000"/>
        </TopCardsSection>
        <MiddleSection1>
          <SectionLayout>
            <SectionTitle>
              서로를 알아보는 방법.
            </SectionTitle>
            <SectionSummary>
              출자자는 본인의 경력을 운용사는 투자 이력을 등록하고 공개하며,<br/>
              출자자와 운용사는 공개된 정보를 통해 서로에 대해 알 수 있습니다.
            </SectionSummary>
            <ImageSectionOuterLayout>
              <ImageSectionInnerLayout>
                <ImageItem>
                  <ArticleTitle>
                    출자자
                  </ArticleTitle>
                  <Person />
                </ImageItem>
                <ImageItemBrown>
                  <ArticleTitleWhite>
                    운용사
                  </ArticleTitleWhite>
                  <Company />
                </ImageItemBrown>
              </ImageSectionInnerLayout>
              <ServiceImageLayout>
                  <img src={JokeImage}/>
              </ServiceImageLayout>
            </ImageSectionOuterLayout>
          </SectionLayout>
        </MiddleSection1>
      <MiddleSection3>
        <SectionLayout>
          <Section3Title>
            쉽고 간편한 조합 결성.
          </Section3Title>
          <Section3Summary>
            많고 복잡한 서류 작성은 이제 그만.<br/> 
            운용사와 출자자가 전부 모이면 조합 결성에 필요한 서류를 시스템에서 자동으로 제공합니다.
          </Section3Summary>
          <ImageSectionOuterLayoutNoGap>
            <img src={JokeImage}/>
            <img src={JokeImage}/>
            <img src={JokeImage}/>
          </ImageSectionOuterLayoutNoGap>
        </SectionLayout>
      </MiddleSection3>
      <MiddleSection4>
        <SectionLayout>
          <Section4Title>
            새로운 가치 만들기.
          </Section4Title>
          <Section4Summary>
            개인투자조합에 출자하면 소득 공제를 받으며 초기 스타트업에 투자할 수 있습니다.
          </Section4Summary>
          <CardContainer>
            <SummaryCard>
              <CardTitle>개인투자 조합이란,</CardTitle>
              <CardSummary>
                개인투자조합이란 벤처기업육성에 관한 
                <br/>
                특별조치법에 의해 설립된 조합으로
                <br/>
                중소벤처기업부에 등록된 벤처기업과
                <br/>
                창업자에 투자할 목적으로
                <br/>
                개인이나 조합이 출자하여 결성하는
                <br/>
                조합을 의미합니다.
              </CardSummary>
            </SummaryCard>
            <SummaryCard>
              <CardTitle>개인투자 조합의 결성은,</CardTitle>
              <CardSummary>
                출자총액 1억원 이상
                <br/>
                조합원수 49인 이하
                <br/>
                업무집행조합원의 출자 지분 5% 이상
                <br/>
                등의 요건이 필요합니다.
              </CardSummary>
            </SummaryCard>
            <SummaryCard>
              <CardTitle> 개인투자 조합의 구성은,</CardTitle>
              <CardSummary>
                <span>출자자 (LP, Limited Partner)와</span>
                <br/>
                <span>
                  운용사(GP, General Partener)가
                </span> 있으며
                <br/>
                출자자는 조합에 자금을 출자해 운용사에
                <br/>
                맡기고 그 대가로 보수를 지급하며
                <br/>
                운용사는 조합의 자금을 운용해 투자를
                <br/>
                집행하고 그 대가로 보수를 획득합니다.
              </CardSummary>
            </SummaryCard>
          </CardContainer>
        </SectionLayout>
      </MiddleSection4>
        <MiddleSection5>
          <SectionLayout>
            <QustionTitle>Question</QustionTitle>
            <Accordion />
          </SectionLayout>
        </MiddleSection5>
    </>
  );
}

export default LandingPage;