import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Responsive from "components/common/Responsive";
import UnionInfoParticipate from "components/Union-manage/UnionInfoParticipate";
import ParticipationList from "components/Union-manage/participation/ParticipationList";

import NoticeList from "components/Union-manage/notice/NoticeList";
import PostList from "components/Union-manage/post/PostList";
import EditorUser from "components/Union-manage/EditorUser";

import UnionCommonModal from "components/Modal/UnionCommon";
import RequestParticipateModal from "composition/UnionParticipate/Modal/RequestParticipate";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const UnionParticipatePage = () => {
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData, setTempParticipantsData] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);

  const { user } = useFetchUserToken();
  const { id: unionId } = useParams();

  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;

      const { data: unionDetails } = await API.get.unionDetail(unionId); // 유니언의 상세 정보

      console.log(unionDetails);
      setUnionData(unionDetails.union_info);
      setPostData(unionDetails.post_info);
      setParticiPationListData(unionDetails.union_info.participants);
      setTempParticipantsData(unionDetails.union_info.temp_participants);
      // console.log(data)
    };
    fetchUnionData();
  }, [user]);

  const handleModalVisibility = (value) => {
    setIsModalActive(value ?? true);
  };

  const handleClickRequestParticipate = (requestAccount) => {
    
    const fetchUnionRequest = async () => {
      const requestResult = await API.post.unionRequest({
        user: user.id,
        union: unionData.id,
        request_invest_account: Number(requestAccount), // 출자 요청 구좌수
        amount_per_account: Number(unionData.amount_per_account) , // 1구좌당 금액 900만
      });
      alert("요청이 전송되었습니다.");
    };
    fetchUnionRequest();
  };

  if (!!!user) return <></>;
  return (
    <Responsive level={2}>
      <UnionInfoParticipate
        userData={user}
        unionData={unionData}
        handleModalVisibility={handleModalVisibility}
      />
      <NoticeList postData={postData} />
      <PostList
        postData={postData}
        editor={
          <EditorUser
            noticePrimaryInfo={
              unionData
                ? {
                    userId: user?.id,
                    unionId: unionData.id,
                    ownerId: unionData.owner.id,
                  }
                : undefined
            }
          />
        }
      />
      <UnionCommonModal
        isModalActive={isModalActive}
        handleModalVisibility={handleModalVisibility}
      >
        <RequestParticipateModal
          unionData={unionData}
          handleClickRequestParticipate={handleClickRequestParticipate}
        />
      </UnionCommonModal>
    </Responsive>
  );
};

export default UnionParticipatePage;
