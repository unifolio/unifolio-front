import React from 'react';
import styled from 'styled-components';
const UnionDetailInfo = () => {
    return(
            <UnionInfoSection>
                <Header>
                    <Title>조합 상세정보</Title>
                    <TimeLimit>모집기간 3일 남음 (2020년 8월 6일 자정 마감)</TimeLimit>
                </Header>
                <InfoMain>
                    <InfoRow>
                        <Category>운용사</Category>
                        <InfoSummary > A 엑셀레이터 </InfoSummary>
                    </InfoRow>

                    <InfoRow>
                        <Category>투자 분야</Category>
                        <InfoSummary>
                            <CategoryBG>IT 분야</CategoryBG>
                            <CategoryBG>기술 분야</CategoryBG>
                        </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>현재인원</Category>
                        <InfoSummary>00명</InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>모집 기간</Category>
                        <InfoSummary> 2021년 00월 00일 오후 00시 </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>출자총액 / 현재 출자액</Category>
                        <InfoSummary> 4억원 / 2억원 (50%) </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>최소출자액 / 최소구좌수</Category>
                        <InfoSummary> 1천만원 / 2구좌 </InfoSummary>
                    </InfoRow>
                </InfoMain>
            </UnionInfoSection>
    )
}

export default UnionDetailInfo;


const UnionInfoSection = styled.section`
    margin-top: 80px;
    flex:4;
    margin-right: 30px;
    @media screen and (max-width:902px){
        margin-right: 0;
    }
`;

const Header = styled.header`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const Title = styled.h2`
    font-size:24px;
    margin-bottom: 0;
    font-weight: 700;
    margin-right: 16px;
`;
const TimeLimit = styled.span`
    color: #FF0000;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
`;
const Button = styled.button`
    border-radius: 4px;
    color:#fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    background-color: #3D31E4;
    border:0;
    padding: 10px 20px;
    cursor: pointer;
`;
const InfoMain = styled.main`
    border-top: 1px solid  #847F7F;
    border-bottom: 1px solid  #847F7F;
    padding-top: 18px;
    padding-bottom: 18px;
    margin-top: 18px;
`;

const InfoRow = styled.div`
    display:flex;
    margin-left:10px;
    margin-right: 10px;
    margin-bottom: 6px;
    justify-content: center;
    align-items: center;
`;

const Category = styled.span`
    color: rgba(132, 127, 127, 1);
    flex:1;
    height: auto;
    font-size: 12px;
    color: #3C2FF2;
    text-align: right;
    font-weight: bold;
    margin-right: 27px;
    line-height: 20px;
`;

const InfoSummary = styled.p`
    flex:1;
    word-break: keep-all;
    font-weight: ${props=>props.name && 700};
    display:flex;
    margin-bottom : 0;
    font-weight: bold;
`;

const CategoryBG = styled.span`
    padding: 3px 8px;
    border: 1px solid black;
    border-radius: 30px;
    font-size: 12px;
    margin-right:10px;
    &:last-child{
        margin-right: 0px;
    }
`;

