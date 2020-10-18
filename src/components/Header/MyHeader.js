import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import Responsive from '../common/Responsive.js';

import palette from "../../lib/styles/palette.js";

const MyHeaderPosition = styled(Responsive)`
  position: relative;
  max-width: 100%;
  height: 4rem;
  box-shadow: 1px 2px 5px grey;
`;

const MyHeaderLayout = styled.div`
  height:100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;

  .myheader-item {
    color:grey;
    height:100%;
    width:80%;
    font-size:1.3rem;
    display:inherit;
    place-items:center;

  }
  .active {
    box-shadow: 0 4px 2px -2px ${palette.blue[0]};
    color: ${palette.blue[0]}
  }
`;

const MyHeader = ( props ) => {
  const { history, current } = props;

  // const [isActive, setIsActive] = useState(false);
  useEffect( () => {
    console.log("홈헤더 rendered", current);
    document.querySelector(".active").className = "myheader-item";
    if (current === undefined) {
      document.querySelector(".myheader-item").className += " active";
    } else {
      document.querySelectorAll(`.myheader-item[data-location=${current}]`)[0].className += " active";
    }
    
  })
  const onClickHeaderItem = (e) => {
    history.push(`/my?mode=${e.target.dataset.location}`);
  }
  return (
    <MyHeaderPosition className="MyHeader">
      <MyHeaderLayout>
        <div onClick={onClickHeaderItem} className="myheader-item active" data-location="profile">프로필</div>
        <div onClick={onClickHeaderItem} className="myheader-item" data-location="create-association">신규 개인투자 조합 만들기</div>
        
      </MyHeaderLayout>
    </MyHeaderPosition>
  );
}

export default withRouter(MyHeader);
