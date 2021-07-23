import React from 'react';
import styled from 'styled-components';

const ManagerDetailInfo = () => {
    return(
    <UserInfoSection>
        <Header>                        
            <UserInfoLeft>
                <Title>운용사 상세정보</Title>
            </UserInfoLeft>
            <UserInfoRight>
                <User>A 액셀러레이터</User>
            </UserInfoRight>
        </Header>
        <InfoMain>
            <InfoRow>
                <Category>운용사 정보</Category>
                <InfoList>
                    <InfoSummary >A 엑셀러레이터는 인공지능 전문가들을 필두로 하여 가능성이 높은 스타트업에 투자를 해왔습니다. 총 N 년간의 노하우로 보다 높은 수익률을 보장합니다.</InfoSummary>                            
                </InfoList>
            </InfoRow>
            <UserInfoListRow>
                <Category>투자 이력</Category>
                <InfoListWrapper>
                    <InfoList>
                        <CatagoryBG > 커머스</CatagoryBG>                            
                        <InfoPosition> 투자대비 500% 수익</InfoPosition>
                    </InfoList>
                    <InfoList>
                        <CatagoryBG > 커머스</CatagoryBG>                            
                        <InfoPosition> 투자대비 500% 수익</InfoPosition>
                    </InfoList>
                    <InfoList>
                        <CatagoryBG > 커머스</CatagoryBG>                            
                        <InfoPosition> 투자대비 500% 수익</InfoPosition>
                    </InfoList>
                </InfoListWrapper>
            </UserInfoListRow>
        </InfoMain>
    </UserInfoSection>
    )

}

export default ManagerDetailInfo;



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
`;

const Category = styled.span`
    color: rgba(132, 127, 127, 1);
    flex:0.6;
    height: auto;
    font-size: 12px;
    color: #3C2FF2;
    text-align: left;
    font-weight: bold;
    line-height: 20px;
`;

const InfoSummary = styled.p`
    flex:1;
    word-break: keep-all;
    font-weight: ${props=>props.name && 700};
    display:flex;
    margin-bottom : 0;
`;

const UserInfoSection = styled.section`
    margin-top: 80px;
    flex:5;
    margin-right: 30px;
`;
const UserInfoLeft = styled.div`
    display: flex;
`;
const UserInfoRight = styled.div`
    display: flex;
    align-items: center;
    line-height: 26px;
`;
const User = styled.span`
    font-size: 20px;
    line-height: 26px;
    margin-right: 8px;
`;
const CatagoryBG = styled.span`
    font-size: 12px;
    line-height: 14px;
    color: black;
    padding: 3px 8px;
    border: 1px solid black;
    border-radius: 30px;
`;


const UserInfoListRow = styled(InfoRow)`
    align-items:flex-start;
`;
const InfoPosition = styled.span`
    flex:2;
    margin-left:10px;
    word-break: keep-all;
    text-align:left;
`;


const InfoListWrapper = styled.ul`
    flex:3;
    margin-bottom: 0;
`;

const InfoList = styled.li`
    display:flex;
    align-items: center;
    justify-content: space-between;
    flex:3;
    margin-bottom:8px;
`;

