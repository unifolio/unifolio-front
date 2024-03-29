import React, { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as BottomArrow } from "../../../assets/svgs/BottomArrow-S.svg";
import { ReactComponent as UpArrow } from "../../../assets/svgs/UpArrow-S.svg";

import Conditional from "components/common/Conditional";
import ParticipationListItem from "./ParticipationListItem";

const ParticipationList = ({ title, data, participantsConversationData }) => {
  console.log( "=== participantsConversationData ===", data, participantsConversationData);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const mergeConversationData = () => {
    console.log("participantsConversationDataparticipantsConversationData", participantsConversationData)
    const targetData = [...participantsConversationData].reverse();
    
    return targetData.filter((participantConversation, idx) => {
      const foundIndex = data.findIndex((iteratedConversationUser) => iteratedConversationUser.id === participantConversation.writer_id || iteratedConversationUser.id === participantConversation.receiver_id);
      return foundIndex === idx || foundIndex === -1
    })
  }

  useEffect(() => {
    setIsLoading(false);
  }, [participantsConversationData, data]);

  if (isLoading) return <></>;
  return (
    <ListSection>
      <SectionHeader>
        <Title>{title}</Title>
        <ButtonGroup>
          <ParticipationCount>
            대화상대 {mergeConversationData().length}명
          </ParticipationCount>
          <Conditional condition={isCollapse}>
            <SUpArrow onClick={handleButtonClick} />
          </Conditional>
          <Conditional condition={!isCollapse}>
            <SBottomArrow onClick={handleButtonClick} />
          </Conditional>
        </ButtonGroup>
      </SectionHeader>
      <ListWrapper ref={parentRef}>
        <ul ref={childRef}>
          <ParticipationListItem participantConversationData={mergeConversationData()} />
        </ul>
      </ListWrapper>
    </ListSection>
  );
};

export default ParticipationList;

const ListSection = styled.section`
  margin-top: 69px;
`;

const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000000;
  padding-bottom: 18px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ParticipationCount = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const SBottomArrow = styled(BottomArrow)`
  margin: 0 21px;
  cursor: pointer;
`;
const SUpArrow = styled(UpArrow)`
  margin: 0 21px;
  cursor: pointer;
`;
const ListWrapper = styled.section`
  height: 0;
  width: inherit;
  overflow: hidden;
  transition: height 0.35s ease;
`;
