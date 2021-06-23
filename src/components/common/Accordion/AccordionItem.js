import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Ximage } from "../../../assets/svgs/X.svg";
import { ReactComponent as Arropwimage } from "../../../assets/svgs/BottomArrow.svg";
import Conditional from "../Conditional";


function AccordionItem(props) {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const titleRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        titleRef.current.style.color = "rgba(132, 127, 127, 1)";
        titleRef.current.style.fontWeight=400;

      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        titleRef.current.style.color = "rgba(60, 47, 242, 1)";
        titleRef.current.style.fontWeight=700;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );


  return (
    <Container>
      <Header onClick={handleButtonClick}>
        <QustionTitle ref={titleRef}>{props.title}</QustionTitle>
        <Button>
            <Conditional condition={isCollapse}>
                <Ximage />
            </Conditional>
            <Conditional condition={!isCollapse}>
                <Arropwimage />
            </Conditional>
        </Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.li`
  width:100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px;
  margin: 20px 0px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0.5px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const QustionTitle = styled.span`
  font-size: 28px;
  line-height: 28px;
  height: 32px;
  /* margin: 0 32px 0 8px; */
  color: rgba(132, 127, 127, 1);
  font-weight: 400;
`;

const Button = styled.div`

`;

const ContentsWrapper = styled.section`
  height: 0;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

const Contents = styled.p`
  padding: 20px 0;
  font-size: 20px;
  word-break:keep-all;

`;

export default React.memo(AccordionItem);
