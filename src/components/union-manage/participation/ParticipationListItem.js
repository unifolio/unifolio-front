import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ParticipationListItem = ({data, participantConversationData}) => {
    console.log("participantConversationData", participantConversationData)
    return (
        <Link to={`/union/manage/userchat/${data.id}`}>
            <ListItem>
                <UserNickName>{data.name}</UserNickName>
                {participantConversationData.length !== 0 
                    ? (
                        participantConversationData.map((data) => (
                            <React.Fragment key={data.id}>
                                <Contents>{data.title}</Contents>
                                <Date>
                                    <span>{new window.Date(data.created).toLocaleDateString()}</span>
                                    <div>
                                        <span>{new window.Date(data.created).toLocaleTimeString()} (0분전)</span>
                                    </div>
                                </Date>
                            </React.Fragment>
                        ))
                    )
                    : (
                        <>
                            <Contents>목업 데이터 입니다</Contents>
                            <Date>
                                <span>0000년 00월 00일</span>
                                <div>
                                    <span>00:00:00 (0분전)</span>
                                </div>
                            </Date>
                        </>
                    )
                }
            </ListItem>
        </Link>
    );
}

export default ParticipationListItem;

const ListItem = styled.li`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #000;
`;

const UserNickName = styled.span`
    font-size: 14px;
    line-height: 17px;
    color: #767676;
    display: block;
    width: 140px;
    margin-right: 10px;
`;

const Contents = styled.p`
    flex:1;
    display:flex;
    align-items: center;
    font-size: 16px;
    word-break: keep-all;
    line-height: 18px;
    margin:0;
`;

const Date = styled.div`
    font-size: 14px;
    color: #767676;
`;