import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as BottomArrow } from "../../../assets/svgs/BottomArrow-S.svg";
import { ReactComponent as UpArrow } from "../../../assets/svgs/UpArrow-S.svg";
import Conditional from "components/common/Conditional";

const ChatListItem = ({ post }) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );
  return (
    <li>
      <ListItemHeader>
        <Category>달리는 토끼 바람</Category>
        <Contents>뭐요ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ</Contents>
        <Date>
          <span>0000.00.00 / 0000.00.00</span>
          <ButtonGroup>
            <Conditional condition={isCollapse}>
              <SUpArrow onClick={handleButtonClick} />
            </Conditional>
            <Conditional condition={!isCollapse}>
              <SBottomArrow onClick={handleButtonClick} />
            </Conditional>
          </ButtonGroup>
        </Date>
      </ListItemHeader>
      <FormWrapper ref={parentRef}>
        <ContentSection ref={childRef}>
          <NoticeContents>
            여기에 공지사랑이 들어가는거 같아요오오
          </NoticeContents>
          <Button>수정하기</Button>
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
