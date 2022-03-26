import React, { useEffect, useRef, useState, createRef } from "react";
import styled from "styled-components";
import Conditional from "components/common/Conditional";
// import Editor from "components/Union-manage/Editor";
import Editor from "components/Union-manage/EditorUser";

import { ReactComponent as BottomArrow } from "../../../assets/svgs/BottomArrow-S.svg";
import { ReactComponent as UpArrow } from "../../../assets/svgs/UpArrow-S.svg";

const PostListItem = ({ unconfirmed_p }) => {
  const $parentRefs = useRef(null);
  const $childRefs = useRef(null);
  const [postStates, setPostStates] = useState();
  // console.log("unconfirmed_p", unconfirmed_p);

  useEffect(() => {
    if (!unconfirmed_p) return;
    setPostStates(unconfirmed_p?.map((_) => ({isCollapse: false, isModifing: false}) ));
    $parentRefs.current = unconfirmed_p?.map((_) => createRef());
    $childRefs.current = unconfirmed_p?.map((_) => createRef());
    console.log("$parentRefs.current", $parentRefs.current);
  }, [unconfirmed_p]);

  const handleArrowButtonClick = (idx) => {
    console.log("isclicked", $parentRefs.current[idx]);
    // if (parentRef.current === null || childRef.current === null) {
    //   return;
    // }

    if ($parentRefs.current[idx].current.clientHeight > 0) {
      $parentRefs.current[idx].current.style.height = "0";
    } else {
      $parentRefs.current[
        idx
      ].current.style.height = `${$childRefs.current[idx].current.clientHeight}px`;
      $parentRefs.current[idx].current.style.height = "100%";
    }
    setPostStates((prevStates) =>
      prevStates.map((prevState, stateIdx) => idx === stateIdx ? {...prevState, isCollapse: !prevState.isCollapse} : {...prevState, isCollapse: prevState.isCollapse} 
    ));
  };

  const handleClickModifyButton = (post_id, idx) => {
    console.log("수정!!", post_id, idx)
    setPostStates((prevStates) =>
      prevStates.map((prevState, stateIdx) => idx === stateIdx ? {...prevState, isModifing: !prevState.isModifing} : {...prevState, isModifing: prevState.isModifing} 
    ));
  }
  if (!unconfirmed_p || !postStates) return <></>;
  return unconfirmed_p.map(
    ({ post_id, title, content, writer, writer_id, created_at, receiver_id }, idx) => (
      <li key={post_id}>
        <ListItemHeader>
          <Category>{created_at}</Category>
          {}
          <Contents>{title}</Contents>

          <Date>
            <ButtonGroup>
              <Conditional condition={postStates[idx].isCollapse}>
                <SUpArrow onClick={() => handleArrowButtonClick(idx)} />
              </Conditional>
              <Conditional condition={!postStates[idx].isCollapse}>
                <SBottomArrow onClick={() => handleArrowButtonClick(idx)} />
              </Conditional>
            </ButtonGroup>
          </Date>
        </ListItemHeader>
        <FormWrapper ref={$parentRefs.current[idx]}>
          <ContentSection ref={$childRefs.current[idx]}>
            <NoticeContents id={`editor-post-${post_id}`}> 
              {postStates[idx].isModifing ? <Editor modifyingInfo={ {post_id, title, content, writer_id, receiver_id} } /> : content} 
            </NoticeContents>
            <Button onClick={() => handleClickModifyButton(post_id, idx)}> 수정하기 </Button>
            
          </ContentSection>
        </FormWrapper>
      </li>
    )
  );
};

export default PostListItem;

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
