import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Conditional from "components/common/Conditional";
import Editor from "components/Union-manage/Editor";

import { ReactComponent as BottomArrow } from "../../../assets/svgs/BottomArrow-S.svg";
import { ReactComponent as UpArrow } from "../../../assets/svgs/UpArrow-S.svg";

import useFetchUserToken from "hooks/useFetchUserToken";

const ChatListItem = ({ post }) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState({isCollapse: false, isModifing: false});
  const { user } = useFetchUserToken();
  
  const handleButtonClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
      } else {
        parentRef.current.style.height = "100%";
      }
      setIsCollapse({isCollapse: !isCollapse, isModifing: false});
    },
    [isCollapse]
  );

  const handleClickModifyButton = (post_id) => {
    console.log("수정!!", post_id)
    setIsCollapse((prevState) => ({...prevState, isModifing: !prevState.isModifing}));
  }
  
  if (!user) return <></>
  
  return (
    <li>
      <ListItemHeader>
        <Category>{post.writer.name ?? post.writer.corporate_name}</Category>
        <Contents>{post.title}</Contents>
        <Date>
          {/* <span>0000.00.00 / 0000.00.00</span> */}
          {/* <span>{new window.Date().toLocaleString()}</span> */}
          <ButtonGroup>
            <Conditional condition={isCollapse.isCollapse}>
              <SUpArrow onClick={handleButtonClick} />
            </Conditional>
            <Conditional condition={!isCollapse.isCollapse}>
              <SBottomArrow onClick={handleButtonClick} />
            </Conditional>
          </ButtonGroup>
        </Date>
      </ListItemHeader>
      <FormWrapper ref={parentRef}>
        <ContentSection ref={childRef}>
        <NoticeContents id={`editor-post-${post.id}`}> 
            {isCollapse.isModifing 
              ? <Editor is_notice={false} modifyingInfo={{...post, post_id: post.id, receiver_id: post.receiver, writer_id: post.writer_id ?? user?.id}} /> 
              : post.content
            }  
          </NoticeContents>
          {/* {writer_id === user?.id && <Button onClick={() => handleClickModifyButton(post_id, idx)}> 수정하기 </Button>} */}
          {post.writer.id === user.id && isCollapse.isModifing 
            ? (<Button onClick={() => handleClickModifyButton(post.id)}> 취소하기 </Button>)
            : (<Button onClick={() => handleClickModifyButton(post.id)}> 수정하기 </Button>) 
          }
          {/* <NoticeContents>{post.content}</NoticeContents>
          {post.writer.id === user.id && <Button>수정하기</Button>} */}
        </ContentSection>
      </FormWrapper>
    </li>
  );
};

export default ChatListItem;

const ListItemHeader = styled.header`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f7f7;
`;

const Category = styled.span`
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
  display: flex;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SBottomArrow = styled(BottomArrow)`
  margin: 0 21px;
  cursor: pointer;
`;
const SUpArrow = styled(UpArrow)`
  margin: 0 21px;
  cursor: pointer;
`;

const FormWrapper = styled.section`
  height: 0;
  width: inherit;
  overflow: hidden;
  transition: height 0.35s ease;
  border-bottom: 1px solid #c8c5c5;
`;

const ContentSection = styled.div`
  padding: 16px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
`;
const NoticeContents = styled.p`
  margin-bottom: 30px;
`;
const Button = styled.button`
  background-color: #fff;
  border: 1px solid #3c2ff2;
  color: #3c2ff2;
  border-radius: 4px;
  width: 66px;
  align-self: flex-end;
`;
