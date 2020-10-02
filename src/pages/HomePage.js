import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Responsive from '../components/common/Responsive';
import HomeHeader from '../components/common/HomeHeader';
import FilterSection from '../components/common/FilterSection';

import WaitingPeople from '../components/WaitingPeople';
import WaitingAssociations from '../components/WaitingAssociations';
import CreateAssociation from '../components/CreateAssociation';

const HomePagePosition = styled(Responsive)`
  position: relative;
  height: calc(100vh - 8rem);
  max-width: 100%;
  display: flex;
`;

const HomeMainSection = styled.div`
  width:79%;
  height:100%;
  padding-right:1rem;
  display:inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const HomeSideSection = styled.div`
  display: inline-grid;
  grid-template-rows: 1fr repeat(5, 3fr);
  width:20%;
  height:100%;
  border-color: gray;  
  border-left-style: solid;
  border-width: thin;
`;

const MainPage = (props) => {
  const { location } = props;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });  
  const mainRef = React.createRef();
  const sideRef = React.createRef();

  const mainSectionSelector = (current) => {
    console.log("mainSectionSelector",  current);
    switch(current){
      case "waiting-people":
        return <WaitingPeople />;
      case "waiting-associations":
        return <WaitingAssociations />;
      case "create-association":
        return <CreateAssociation />;
      case "manage-association":
        console.log("manage-association not usable");
        return;
      default:
        return <div style={{width:"100%"}}> 상단의 메뉴를 선택해주세요 </div>
    }
  }

  const sideSectionSelector = (current) => {
    console.log("sideSectionSelector",  current);
    switch(current){
      case "waiting-people":
        return ["최대 출자 가능액", "경력 분야"];
      case "waiting-associations":
        return ["조합 상태","투자 분야", "출자 총액", "최소 출자액"];
      case "create-association":
        return [];
      case "manage-association":
        return [];
      default:
        return <div style={{width:"100%"}}> 상단의 메뉴를 선택해주세요 </div>
      }
    }

  const onCloseFilter = () => {
    mainRef.current.style.width = "100%";
    sideRef.current.style.display = "none";
    
  }

  return (
    <>
      <HomeHeader current={query.mode} />
      <br />
      <HomePagePosition className="HomePage">
        <HomeMainSection ref={mainRef}>
          { mainSectionSelector(query.mode) }
        </HomeMainSection>
        <HomeSideSection ref={sideRef}>
          <div style={{"display":"inherit","gridTemplateColumns":"1fr 1fr","fontSize":"1.3rem", "paddingLeft":"1rem","paddingRight":"1rem", "alignItems":"center"}}>
            <b> 필터 검색 </b>
            <div onClick={ onCloseFilter } style={{"display":"inherit", "justifyItems":"center"}}> X </div>
          </div>
          { sideSectionSelector(query.mode).map((filterTitle,idx) => {
            return (<FilterSection title={filterTitle} key={`${idx}-${idx}`}/>)
          }) }
        </HomeSideSection>
      </HomePagePosition>
    </>
  );
}

export default MainPage;
