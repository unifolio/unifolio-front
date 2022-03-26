import React, {useEffect} from 'react';
import styled from 'styled-components';

import useFetchUserToken from "hooks/useFetchUserToken";
import API from 'lib/api';

const ManagerDetailInfo = ({ unionData }) => {
    const { user } = useFetchUserToken();

    useEffect(() => {
        console.log("user", user)
    }, [user])
    
    if (!user) return <></>
    return (
        <UserInfoSection>
            <Header>                        
                <UserInfoLeft>
                    <Title>운용사 상세정보</Title>
                </UserInfoLeft>
                <UserInfoRight>
                    <User>{unionData.owner.corporate_name}</User>
                </UserInfoRight>
            </Header>
            <InfoMain>
                <InfoRow>
                    <Category>운용사 정보</Category>
                    <InfoList>
                        <InfoSummary>{user.introduction}</InfoSummary>
                    </InfoList>
                </InfoRow>
                <UserInfoListRow>
                    <Category>투자 이력</Category>
                    <InfoListWrapper>
                        {user.invest_history.map((history, idx) => (
                            <InfoList key={`${history.company}-${idx}`}>
                                <CatagoryBG > {history.category.category} </CatagoryBG>                            
                                <InfoPosition> {history.description} </InfoPosition>
                            </InfoList>    
                        ))}
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

