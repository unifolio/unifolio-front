import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import qs from "qs";

import Responsive from "components/common/Responsive";
import UnionParticipateListHeader from "components/Header/UnionParticipateListHeader";

import UnionList from "composition/UnionParticipate/UnionList";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const UnionParticipateListPage = ({location}) => {
  const $mainRef = useRef();
  const { user } = useFetchUserToken();
  const [myReadyUnions, setMyReadyUnions] = useState();
  const [myCompleteUnions, setMyCompleteUnions] = useState();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;
      
      const unionList = await API.get.unionCommunicatedList({userId});
      // setMyReadyUnions(unionList);

      // const { data: myUnionsData } = await API.get.unionManageOwner(userId);
      setMyReadyUnions(unionList.filter((union) => !union.is_recruited));
      setMyCompleteUnions(unionList.filter((union) => union.is_recruited));
    };
    fetchUnionData();
  }, [user]);

  const mainSectionSelector = (current = "ready") => {
    switch (current) {
      case "ready":
        return <UnionList myUnions={myReadyUnions} />;
      case "complete":
        return <UnionList myUnions={myCompleteUnions} />;
      default:
        return (
          <div style={{ width: "100%" }}> 상단의 메뉴를 선택해주세요 </div>
        );
    }
  };

  if (!(user && myReadyUnions)) return <></>;
  return (
    <>
      <UnionParticipateListHeader current={query.mode ?? "my-participate-unions"} />
      <FindingPagePosition className="UnionManageListPage">
        <MainSectionPosition>
          <MainSection ref={$mainRef}>
            {mainSectionSelector(query.mode)}
          </MainSection>
        </MainSectionPosition>
      </FindingPagePosition>
    </>
  );
};

const FindingPagePosition = styled(Responsive)`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  padding-right: 0;
  padding-left: 0;
`;

const MainSectionPosition = styled.div`
  width: 100%;
  max-width: 1009px;
  height: 100%;
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainSection = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem 1rem 2rem 1rem;
  display: inline-grid;
  grid-template-columns: repeat(3, minmax(297px, 329px));
  grid-template-rows: 1fr 1fr 1fr;
  gap: 36px 27px;
  /* @media screen and (max-width:1435px){
		grid-template-columns: repeat(auto-fill,minmax(297px,319px));
	} */
  @media screen and (max-width: 1270px) {
    grid-template-columns: repeat(auto-fill, minmax(297px, 329px));
  }
`;
export default UnionParticipateListPage;