import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Responsive from '../components/common/Responsive';
import AssociationCreateHeader from '../components/Header/AssociationCreateHeader';

import PersonalAssociationCreate01 from "../components/association_create/PersonalAssociationCreate01";
import PersonalAssociationCreate02 from "../components/association_create/PersonalAssociationCreate02";
import PersonalAssociationCreate03 from "../components/association_create/PersonalAssociationCreate03";
import PersonalAssociationCreate04 from "../components/association_create/PersonalAssociationCreate04";
import PersonalAssociationCreate05 from "../components/association_create/PersonalAssociationCreate05";

const AssociationPagePosition = styled(Responsive)`
  position: relative;
  max-width: 100%;
  display: flex;
`;

const AssociationMainSection = styled.div`
  width:100%;
  height:calc(100vh - 8rem);
  padding-right:1rem;
  padding-left:10rem;
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  /* justify-items: center; */
`;

const AssociationCreatePage = (props) => {
  console.log("props", props)
  const { location } = props;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const mainRef = React.createRef();
  
  const mainSectionSelector = (current) => {
    console.log("mainSectionSelector",  current);
    switch(current){
      case "personal-1":
        return <PersonalAssociationCreate01 />;
      case "personal-2":
        return <PersonalAssociationCreate02 />;
      case "personal-3":
        return <PersonalAssociationCreate03 />;
      case "personal-4":
        return <PersonalAssociationCreate04 />;
      case "personal-5":
        return <PersonalAssociationCreate05 />;
      default:
        return <div style={{width:"100%"}}> 상단의 메뉴를 선택해주세요 </div>
    }
  }

  return (
    <>
      <AssociationCreateHeader current={location.pathname.split("").slice(-1)[0]}></AssociationCreateHeader>
      <br />
      <AssociationPagePosition className="AssociationPage">
        <AssociationMainSection ref={mainRef}>
          { mainSectionSelector(location.pathname.split("/").slice(-1)[0]) }
        </AssociationMainSection>
      </AssociationPagePosition>
    </>
  );
}

export default AssociationCreatePage;
