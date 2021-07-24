import React from 'react';
import styled from 'styled-components';

import ChatListItem from "./ChatListItem"

const ChatList = ({title}) => {


  
    return(
        <ListSection>
            <SectionHeader>
                <Title>{title}</Title>
                <More>이전 36개 대화 모두 보기</More>
            </SectionHeader>
            <ListMain>
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
            </ListMain>
        </ListSection>
    );
}

export default ChatList;

const ListSection = styled.section`
    margin-top: 69px;
    padding-bottom: 130px;
`;

const SectionHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #C8C5C5;    
    padding-bottom: 18px;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0;
`;

const More = styled.span`
    cursor: pointer;
    color: #1100FF;
    font-weight: bold;

`;

const ListMain = styled.ul`
    border-left: 1px solid #C8C5C5;
    border-right: 1px solid #C8C5C5;
`;