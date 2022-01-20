import React from 'react';
import styled from 'styled-components';

import NoticeListItem from "./NoticeListItem"

const NoticeList = ({editor = null}) => {

    return(
        <ListSection>
            <SectionHeader>
                <Title>공지사항</Title>
            </SectionHeader>
            <ListMain>
                <NoticeListItem />
                <NoticeListItem />
                <NoticeListItem />
                <NoticeListItem />
                {!!editor && editor}
            </ListMain>
        </ListSection>
    );
}

export default NoticeList;

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

const ListMain = styled.ul`
    border-left: 1px solid #C8C5C5;
    border-right: 1px solid #C8C5C5;
`;