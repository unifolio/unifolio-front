import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import Responsive from '../common/Responsive.js';

import palette from "../../lib/styles/palette.js";

const HomeHeaderPosition = styled(Responsive)`
  position: relative;
  height: 4rem;
  box-shadow: 0 4px 4px -4px gray;
  z-index:3;

`;

const HomeHeaderLayout = styled.div`
  height:100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  max-width: 1440px;
	margin: 0 auto;
	@media (max-width: 1440px) {
		width: 100%;
	}

  .homeheader-item {
    width:80%;
    height:100%;
    color:grey;
    font-size:1.3rem;
    
    display:inherit;
    place-items:center;

  }
  .active {
    box-shadow: 0 4px 2px -2px ${palette.blue[0]};
    color: ${palette.blue[0]}
    /* border-bottom-style: solid;
    border-width: thin; */
  }
`;

const HomeHeader = ( props ) => {
  const { history, current } = props;

  // const [isActive, setIsActive] = useState(false);
  useEffect( () => {
    console.log("홈헤더 rendered", current);
    // 이터러블 객체이지만 Array를 상속받지 않아서 map()사용은 안됨.
    if (document.querySelector(".active") != null)
        document.querySelector(".active").className = "homeheader-item";
    if (current === undefined){
      return;
    } 
    document.querySelectorAll(`.homeheader-item[data-location=${current}]`)[0].className += " active";
  })
  const onClickHeaderItem = (e) => {
    history.push(`/finding?mode=${e.target.dataset.location}`);
  }
  return (
    <HomeHeaderPosition className="HomeHeader">
      <HomeHeaderLayout>
        <div onClick={onClickHeaderItem} className="homeheader-item" data-location="waiting-people">출자 대기중인 출자자</div>
        <div onClick={onClickHeaderItem} className="homeheader-item" data-location="waiting-unions">결성 대기중인 개인투자조합</div>
        {/* <div onClick={onClickHeaderItem} className="homeheader-item" data-location="create-association">신규 개인투자 조합 만들기</div>*/}
      </HomeHeaderLayout>
    </HomeHeaderPosition>
  );
}

export default withRouter(HomeHeader);
