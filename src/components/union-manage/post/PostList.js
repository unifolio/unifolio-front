import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PostListItem from "./PostListItem";
import MockPostListItem from "./MockPostListItem";

const PostList = ({ postData, editor = null }) => {
  console.log("==== postList", postData);
  // console.log("***", postData.unconfirmed_p);
  const [isLoading, setIsLoading] = useState(true);

  const mergePosts = () => {
    console.log([...postData.unconfirmed_p, ...postData.confirmed_p])
    return [...postData.unconfirmed_p, ...postData.confirmed_p].sort((prev, next) => prev.post_id - next.post_id)
  }

  useEffect(() => {
    setIsLoading(false);
  }, [postData.unconfirmed_p, postData.confirmed_p]);

  if (isLoading || !postData) return <></>;
  
  return (
    <ListSection>
      <SectionHeader>
        <Title>운용사에게 문의하기</Title>
      </SectionHeader>
      <ListMain>
        {postData.unconfirmed_p?.length !== 0 ? (
          // <PostListItem unconfirmed_p={postData.unconfirmed_p} editor={editor} />
          <PostListItem unconfirmed_p={mergePosts()} editor={editor} />
        ) : (
          <MockPostListItem />
        )}
        {!!editor && editor}
      </ListMain>
    </ListSection>
  );
};

export default PostList;

const ListSection = styled.section`
  margin-top: 69px;
  padding-bottom: 130px;
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

const ListMain = styled.ul`
  border-left: 1px solid #c8c5c5;
  border-right: 1px solid #c8c5c5;
`;
