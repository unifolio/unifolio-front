import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import qs from "qs";

import Responsive from "components/common/Responsive";

import UnionManageListHeader from "components/Header/UnionManageListHeader";

import UnionManageLists from "composition/UnionManage/UnionManageLists";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const UnionManageListPage = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const $mainRef = useRef();
  const { user } = useFetchUserToken();
  const [myUnions, setMyUnions] = useState();
  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;

      const { data: myUnionsData } = await API.get.unionManageOwner(userId);
      setMyUnions(myUnionsData);
      // const { data: unionDetails } = await API.get.unionDetail(unionId); // 유니언의 상세 정보

      // GET union/manage/22 =>
      // Q : 포스트의 전체 정보를 내려줄 것인지?
      //     아니면 포스트의 primary key만 내려줘서 조회를 따로 할것인지?
      // A : 전체 정보를 보내주는 것이 원래의 의도였음.

      // setUnionData(unionDetails.union_info);
      // setPostData(unionDetails.post_info);
      // setParticiPationListData(unionDetails.union_info.participants);
      // setTempParticipantsData(unionDetails.union_info.temp_participants);
      // console.log(data)
    };
    fetchUnionData();
  }, [user]);

  const mainSectionSelector = (current = "my-unions-manage") => {
    switch (current) {
      case "my-unions-manage":
        return <UnionManageLists myUnions={myUnions} />;
      default:
        return (
          <div style={{ width: "100%" }}> 상단의 메뉴를 선택해주세요 </div>
        );
    }
  };

  if (!user || !myUnions) return <></>;
  return (
    <>
      <UnionManageListHeader current={query.mode ?? "my-unions-manage"} />
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
export default UnionManageListPage;
