import React, { useEffect, useRef, useState, createRef } from "react";
import styled from "styled-components";
import { ReactComponent as BottomArrow } from "../../../assets/svgs/BottomArrow-S.svg";
import { ReactComponent as UpArrow } from "../../../assets/svgs/UpArrow-S.svg";
import Conditional from "components/common/Conditional";

const NoticeListItem = ({ unconfirmed_p }) => {
  console.log("unconfirmed_p", unconfirmed_p);
  const $parentRefs = useRef(null);
  const $childRefs = useRef(null);
  //   const [isCollapse, setIsCollapse] = useState(false);
  const [isCollapses, setIsCollapses] = useState();

  useEffect(() => {
    if (!unconfirmed_p) return;
    setIsCollapses(unconfirmed_p?.map((_) => false));
    $parentRefs.current = unconfirmed_p?.map((_) => createRef());
    $childRefs.current = unconfirmed_p?.map((_) => createRef());
    console.log("$parentRefs.current", $parentRefs.current);
  }, [unconfirmed_p]);

  const handleButtonClick = (idx) => {
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
    }
    setIsCollapses((prevIsCollapses) =>
      prevIsCollapses.map((prevState, stateIdx) =>
        idx === stateIdx ? !prevState : prevState
      )
    );
  };

  if (!unconfirmed_p || !isCollapses) return <></>;
  return unconfirmed_p.map(
    ({ id, title, content, writer, writer_id, created_at }, idx) => (
      <li key={id}>
        <ListItemHeader>
          <Category>{created_at}</Category>
          <Contents>{title}</Contents>
          <Date>
            <ButtonGroup>
              <Conditional condition={isCollapses[idx]}>
                <SUpArrow onClick={() => handleButtonClick(idx)} />
              </Conditional>
              <Conditional condition={!isCollapses[idx]}>
                <SBottomArrow onClick={() => handleButtonClick(idx)} />
              </Conditional>
            </ButtonGroup>
          </Date>
        </ListItemHeader>
        <FormWrapper ref={$parentRefs.current[idx]}>
          <ContentSection ref={$childRefs.current[idx]}>
            <NoticeContents> {content} </NoticeContents>
            <Button> 수정하기 </Button>
          </ContentSection>
        </FormWrapper>
      </li>
    )
  );
};

export default NoticeListItem;

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
