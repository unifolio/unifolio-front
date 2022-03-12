import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as UpArrow } from '../../../assets/svgs/UpArrow.svg';
import { ReactComponent as DownArrow } from '../../../assets/svgs/BottomArrow.svg';
import Conditional from '../Conditional';

function AccordionItem(props) {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const titleRef = useRef(null);
  const headerRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
        titleRef.current.style.color = 'rgba(132, 127, 127, 1)';
        titleRef.current.style.fontWeight = 400;
        headerRef.current.style.borderBottom = 0;
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        headerRef.current.style.borderBottom = '1px solid #A9A9A9';
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  return (
    <Container>
      <Header ref={headerRef}>
        <HeaderContent onClick={handleButtonClick}>
          <Button>
            <Conditional condition={isCollapse}>
              <UpArrow />
            </Conditional>
            <Conditional condition={!isCollapse}>
              <DownArrow />
            </Conditional>
          </Button>
          <QustionTitle ref={titleRef}>{props.title}</QustionTitle>
        </HeaderContent>

        {props.checkBox}
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.li`
  background-color: #fff;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  margin: 10px 0px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0.5px rgba(0, 0, 0, 0.25);
`;
const HeaderContent = styled.div`
  display: flex;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const QustionTitle = styled.span`
  font-size: 18px;
  line-height: 24px;
  color: rgba(132, 127, 127, 1);
  font-weight: 400;
  word-break: keep-all;
`;

const Button = styled.div`
  padding-right: 10px;
`;

const ContentsWrapper = styled.section`
  height: 0;
  width: inherit;
  overflow: hidden;
  transition: height 0.35s ease;
`;

const Contents = styled.p`
  padding: 30px 0;
  word-break: keep-all;
  font-weight: 300;
  font-size: 18px;
  color: #847f7f;
`;

export default React.memo(AccordionItem);
