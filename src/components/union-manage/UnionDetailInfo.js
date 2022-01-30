import React from 'react';
import styled from 'styled-components';
const UnionDetailInfo = ({ unionData }) => {
    console.log("unionData", unionData)
    
    const remainDate = () => {
        const remain = Math.ceil((new Date(unionData.recruitment_end_date).getTime() - Date.now()) / (1000*60*60*24));
        return remain >= 0 ? remain : "초과";
    }
    
    if (!unionData) return <>로딩중</>
    
    return (
            <UnionInfoSection>
                <Header>
                    <Title>조합 상세정보</Title>
                    {typeof remainDate() === 'number' 
                        ? <TimeLimit>모집기간 {remainDate()}일 남음 ({ new window.Date(unionData.recruitment_end_date).toLocaleDateString()} 자정 마감)</TimeLimit>
                        : <TimeLimit>모집기간 초과 ({ new window.Date(unionData.recruitment_end_date).toLocaleDateString()} 자정 마감)</TimeLimit>
                    }
                </Header>
                <InfoMain>
                    <InfoRow>
                        <Category>운용사</Category>
                        <InfoSummary > {unionData.owner.corporate_name} </InfoSummary>
                    </InfoRow>

                    <InfoRow>
                        <Category>투자 분야</Category>
                        <InfoSummary>
                            {unionData.invest_category.map(({category}, idx) => (
                                    <CategoryBG key={`${category}-${idx}`}>{category}</CategoryBG>
                                ))
                            }
                        </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>현재인원</Category>
                        <InfoSummary> {unionData.participants.length} 명 </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>모집 기간</Category>
                        <InfoSummary> {new window.Date(unionData.recruitment_end_date).toLocaleDateString()}까지 </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>현재 출자액 / 출자총액 </Category>
                        <InfoSummary> {(unionData.collected_amount * 1000000).toLocaleString()}원 / {(unionData.expected_amount*1000000).toLocaleString()}원 </InfoSummary>
                    </InfoRow>
                    <InfoRow>
                        <Category>최소출자액 / 최소구좌수</Category>
                        <InfoSummary> {(unionData.amount_per_account * 1000000).toLocaleString()} 원 / {unionData.min_of_account}구좌 </InfoSummary>
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
    line-height: 24px;
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

