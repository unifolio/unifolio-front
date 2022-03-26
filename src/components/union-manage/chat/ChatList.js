import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ChatListItem from "./ChatListItem";
import MockChatListItem from "./MockChatListItem";

const ChatList = ({ title, postData = null }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [postData]);

  if (isLoading) return <></>;

  return (
    <ListSection>
      <SectionHeader>
        <Title>{title}</Title>
        <More>{postData.length}개 대화 모두 보기</More>
      </SectionHeader>
      <ListMain>
        {postData?.map((post) => {
          console.log("post", post);
          return <ChatListItem post={post} />;
        })}
        {!postData && <MockChatListItem />}
      </ListMain>
    </ListSection>
  );
};

export default ChatList;

const ListSection = styled.section`
  margin-top: 69px;
  padding-bottom: 69px;
`;

const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c8c5c5;
  padding-bottom: 18px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0;
`;

const More = styled.span`
  cursor: pointer;
  color: #1100ff;
  font-weight: bold;
`;

const ListMain = styled.ul`
  border-left: 1px solid #c8c5c5;
  border-right: 1px solid #c8c5c5;
`;
