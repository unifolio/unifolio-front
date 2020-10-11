import React, {useState, useEffect} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import qs from 'qs';

import Responsive from '../components/common/Responsive';
import MyHeader from '../components/Header/MyHeader';

import CreateAssociation from '../components/CreateAssociation';
// import ManageAssociation from '../components/ManageAssociation';

const styleVar = createGlobalStyle`
  --create-association-1-cols: 1fr 1fr;
  --create-association-1-rows: 1fr 3fr;
  --create-association-1-col-child-grid-column: auto / span 2;
`

const MyPagePosition = styled(Responsive)`
  position: relative;
  height: calc(100vh - 8rem);
  max-width: 100%;
  display: flex;
`;

const MyMainSection = styled.div`
  width:100%;
  height:100%;
  padding-right:1rem;
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1.5fr 1.5fr;
  
  .MyPageMainSection:nth-child(1) {
    --create-association-1-col-child-grid-column: auto / span 2;
    grid-column: var(--create-association-1-col-child-grid-column);
  }
  .MyPageMainSection:nth-child(2) {
    --create-association-1-col-child-grid-column: auto / span 2;
    grid-column: var(--create-association-1-col-child-grid-column);
  }
`;

const MyPage = (props) => {
  const { location } = props;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });  
  const mainRef = React.createRef();
  
  const [status, setStatus] = useState(query.mode !== undefined ? query.mode : "profile");
  // const [status, setStatus] = useState("");
  
  useEffect(() => {
    mainRef.current.classList.remove(mainRef.current.classList.item(2));
    mainRef.current.classList.add(status);
  }, [status]);

  const mainSectionSelector = (current) => {
    console.log("mainSectionSelector",  current);
    if (status !== current && current !== undefined) {
      setStatus(current);
    }
    switch(current){
      case "create-association":   
        return <CreateAssociation />;
      case "manage-association":
        console.log("manage-association not usable");
        return <div style={{width:"100%"}}> manage-association </div>
      case "profile":
        console.log("profile not usable");
        return <div style={{width:"100%"}}> profile </div>;
      default:
        return <div style={{width:"100%"}}> profile </div>;
    }
  }

  return (
    <>
      <MyHeader current={query.mode} />
      <br />
      <MyPagePosition className="MyPage">
        <MyMainSection ref={mainRef}>
          <div className="MyPagePadding"></div>
          <div className="MyPageMainSection" >
            개인투자조합 설명 lore Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          { mainSectionSelector(query.mode) }
        </MyMainSection>
      </MyPagePosition>
    </>
  );
}

export default MyPage;
