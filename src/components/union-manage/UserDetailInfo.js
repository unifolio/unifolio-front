import React from 'react';
import styled from 'styled-components';

const UserDetailInfo = () => {
    return(
    <UserInfoSection>
        <Header>                        
            <UserInfoLeft>
                <Title>개인 상세정보</Title>
                <UserInfoMoreButton>모두보기 &nbsp;	&gt;</UserInfoMoreButton>
            </UserInfoLeft>
            <UserInfoRight>
                <User>달리는 토끼바람</User>
                <UserBG>미참여자</UserBG>
            </UserInfoRight>
        </Header>
        <InfoMain>
            <InfoRow>
                <Category>학력사항</Category>
                <InfoList>
                    <InfoSummary > 경희대학교</InfoSummary>                            
                    <InfoPosition> 산업경영공학과</InfoPosition>
                    <InfoDate></InfoDate>
                </InfoList>
            </InfoRow>
            <UserInfoListRow>
                <Category>일반경력사항</Category>
                <InfoListWrapper>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06 ~ 2018.06</InfoDate>
                    </InfoList>
                </InfoListWrapper>
            </UserInfoListRow>
            <UserInfoListRow>
                <Category>투자 경력사항</Category>
                <InfoListWrapper>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                    <InfoList>
                        <InfoSummary > Hㅇㅇㅇㅇ사</InfoSummary>                            
                        <InfoPosition> 품질경영팀 책임연구원</InfoPosition>
                        <InfoDate>2018.06~</InfoDate>
                    </InfoList>
                </InfoListWrapper>
            </UserInfoListRow>
        </InfoMain>
    </UserInfoSection>
    )

}

export default UserDetailInfo;



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
const UserBG = styled.span`
    font-size: 12px;
    line-height: 14px;
    color: #3C2FF2;
    padding: 3px 8px;
    border: 1px solid #3C2FF2;
    border-radius: 30px;
`;

const UserInfoMoreButton = styled.button`
    border:0;
    background-color: #fff;
    font-weight: 500;
`;
const UserInfoListRow = styled(InfoRow)`
    align-items:flex-start;
`;
const InfoPosition = styled.span`
    flex:2;
    margin-left:10px;
    word-break: keep-all;
    text-align:center;
`;

const InfoDate = styled.span`
    flex:1;
    min-width:122px;
`;

const InfoListWrapper = styled.ul`
    flex:3;
`;

const InfoList = styled.li`
    display:flex;
    align-items: center;
    justify-content: space-between;
    flex:3;
`;
