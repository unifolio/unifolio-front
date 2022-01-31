import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Responsive from "components/common/Responsive";
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from "components/Union-manage/participation/ParticipationList";
import NoticeList from "components/Union-manage/notice/NoticeList";
import Editor from "components/Union-manage/Editor";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const UnionManagePage = () => {
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData, setTempParticipantsData] = useState([]);
  const { user } = useFetchUserToken();
  const { id: unionId } = useParams();

  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;

      const { data: unionDetails } = await API.get.unionDetail(unionId); // 유니언의 상세 정보

      // post notice 재정의
      unionDetails.post_info.notice = await Promise.all(
        unionDetails.post_info.notice.map(async ({ post_id }) => {
          const { data: unionPost } = await API.get.posts(post_id);
          return unionPost;
        })
      );
      // unconfirmed_p 재정의
      unionDetails.post_info.unconfirmed_p = await Promise.all(
        unionDetails.post_info.unconfirmed_p.map(async ({ post_id }) => {
          const unionConversation = await API.get.posts(post_id);
          return unionConversation;
        })
      );

      // GET union/manage/22 =>
      // Q : 포스트의 전체 정보를 내려줄 것인지?
      //     아니면 포스트의 primary key만 내려줘서 조회를 따로 할것인지?
      // A : 전체 정보를 보내주는 것이 원래의 의도였음.

      console.log(unionDetails);
      setUnionData(unionDetails.union_info);
      setPostData(unionDetails.post_info);
      setParticiPationListData(unionDetails.union_info.participants);
      setTempParticipantsData(unionDetails.union_info.temp_participants);
      // console.log(data)
    };
    fetchUnionData();
  }, [user]);

  if (!!!user) return <></>;
  return (
    <Responsive level={2}>
      <UnionInfo unionData={unionData} />
      {/* <ParticipationList
        data={tempParticipantsData}
        title={"조합 참여 미확정자"}
        object={"대화상대"}
      /> */}
      <ParticipationList
        data={participationListData}
        participantsConversationData={postData.unconfirmed_p}
        title={"조합 참여 확정"}
        object={"확정자"}
      />
      <NoticeList
        postData={postData}
        editor={
          <Editor
            noticePrimaryInfo={
              unionData
                ? { userId: user?.id, unionId: unionData.id }
                : undefined
            }
          />
        }
      />
    </Responsive>
  );
};

export default UnionManagePage;
