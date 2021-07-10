import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import {ReactComponent as BottomArrow} from "../../../assets/svgs/BottomArrow-S.svg";
import {ReactComponent as UpArrow} from "../../../assets/svgs/UpArrow-S.svg";
import Conditional from 'components/common/Conditional';

const NoticeListItem = () => {
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
    return(
        <li>
            <ListItemHeader>
                <Category>가입 승인관련</Category>
                <Contents>현재 가입 승인이 지연되는 점에 대하여 안내드립니다</Contents>
                <Date>
                    <span>수정(0000.00.00)</span>
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
                <form ref={childRef}>
                    <header>
                        <input />
                        <input />
                    </header>
                    <section>
                        <textarea />
                    </section>
                </form>
            </FormWrapper>
        </li>
    );
}

export default NoticeListItem;

const ListItemHeader = styled.header`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #C8C5C5;
    background: #F7F7F7;
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
    flex:1;
    display:flex;
    align-items: center;
    font-size: 16px;
    word-break: keep-all;
    line-height: 18px;
    margin:0;
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
`;