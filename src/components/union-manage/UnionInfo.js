import React from 'react';
import styled from 'styled-components';
const UnionInfo = () => {
    return(
        <InfoSection>
            <Header>
                <Title>0000조합 정보</Title>
                <Button>현재 상태에서 조합 결성하기</Button>
            </Header>
            <InfoMain>
                <InfoRow>
                    <Category>운용사</Category>
                    <InfoSummary > A 엑셀레이터 </InfoSummary>
                </InfoRow>
                <InfoRow>
                    <Category>조합설명</Category>
                    <InfoSummary> A엑셀러레이터가 모집하는 개인투자조합에 대한 설명이 들어가는 곳입니다. 최대 글자수 및 하나의 행에 대해 최대로 표시되는 글자 수 지정이 필요합니다. </InfoSummary>
                </InfoRow>
                <InfoRow>
                    <Category>투자 분야</Category>
                    <InfoSummary>
                        <CategoryBG>IT 분야</CategoryBG>
                        <CategoryBG>기술 분야</CategoryBG>
                    </InfoSummary>
                </InfoRow>
                <InfoRow>
                    <Category>모집 기간</Category>
                    <InfoSummary> 2021년 00월 00일 오후 00시 </InfoSummary>
                </InfoRow>
                <InfoRow>
                    <Category>출자총액 / 현재 출자액</Category>
                    <InfoSummary> 4억원 / 2억원 (목표금액의 50%) </InfoSummary>
                </InfoRow>
                <InfoRow>
                    <Category>최소출자액 / 최소구좌수</Category>
                    <InfoSummary> 1천만원 / 2구좌 </InfoSummary>
                </InfoRow>
            </InfoMain>
        </InfoSection>
    )
}

export default UnionInfo;

const InfoSection = styled.section`
    margin-top: 80px;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h2`
    font-size:24px;
    line-height: 24px;
    font-weight: 700;
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
    padding-top: 40px;
    padding-bottom: 18px;
    margin-top: 18px;
`;

const InfoRow = styled.div`
    display:flex;
    margin-left:10px;
    margin-right: 10px;
    margin-bottom: 16px;
`;

const Category = styled.span`
    display: block;
    color: rgba(132, 127, 127, 1);
    width: 200px;
    height: auto;
`;

const InfoSummary = styled.p`
    flex:1;
    word-break: keep-all;
    font-weight: ${props=>props.name && 700};
    display:flex;
`;

const CategoryBG = styled.span`
    padding: 6px 15px;
    border: 1px solid black;
    border-radius: 30px;
    font-size: 12px;
    margin-right:10px;
    &:last-child{
        margin-right: 0px;
    }
`;