import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import useFetchUserToken from "hooks/useFetchUserToken";

const ParticipationListItem = ({ participantConversationData }) => {
  const { id } = useParams();
  const { user } = useFetchUserToken();
  
  const calculateDate = (recruitment_end_date, recruitment_start_date) => {
    console.log(recruitment_end_date, recruitment_start_date)
    const remainDateInteger = (recruitment_end_date - recruitment_start_date) / 1000 / 60 / 60 / 24;
    if (remainDateInteger >= 1) {
      return `${Math.floor(remainDateInteger)}일 전`;
    }
    return `${Math.floor(remainDateInteger* 24)}시간 전`;
  };
  if (!user) return <></>
  return (
    participantConversationData.map((conversationData) => (
      <ListItem key={conversationData.post_id}>
        <Link to={`/union/manage/${id}/userchat/${user.id === conversationData?.writer_id ? conversationData?.receiver_id : conversationData?.writer_id}`}>
          <UserNickName>{conversationData?.name}</UserNickName>
          <Contents>{conversationData.title}</Contents>
          <Date>
            <span>
              {new window.Date(conversationData.created).toLocaleDateString()}
            </span>
            <div>
              <span>
                {new window.Date(conversationData.created).toLocaleTimeString()} (
                  {calculateDate(new window.Date(), new window.Date(conversationData.created))}
                  )
              </span>
            </div>
          </Date>
        </Link>
      </ListItem>
    ))
  );
};

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
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  word-break: keep-all;
  line-height: 18px;
  margin: 0;
`;

const Date = styled.div`
  font-size: 14px;
  color: #767676;
`;
