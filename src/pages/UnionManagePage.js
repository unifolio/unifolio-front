import React, { useEffect, useState } from 'react';
// import { Link, useParams } from "react-router-dom";

import Responsive from 'components/common/Responsive';
import UnionInfo from 'components/Union-manage/UnionInfo';
import ParticipationList from 'components/Union-manage/participation/ParticipationList';
import NoticeList from 'components/Union-manage/notice/NoticeList';
import Editor from 'components/Union-manage/Editor';

import useFetchUserToken from 'hooks/useFetchUserToken';
import useFetchUnionDetailsByUnionId from 'hooks/useFetchUnionDetailsByUnionId';
import API from 'lib/api';
import UnionOrganizeConfirmModal from 'components/Modal/UnionOrganizeConfirm';

const UnionManagePage = () => {
  const [unionData, setUnionData] = useState('');
  const [postData, setPostData] = useState('');
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData, setTempParticipantsData] = useState();
  const { user } = useFetchUserToken();
  const { unionDetails } = useFetchUnionDetailsByUnionId(); // 유니언의 상세 정보
  const [isModalActive, setIsModalActive] = useState(false);
  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;

      // /unions/manage/{id}/

      // post notice 재정의
      // unionDetails.post_info.notice = await Promise.all(
      //   unionDetails.post_info.notice.map(async ({ post_id }) => {
      //     const { data: unionPost } = await API.get.posts(post_id);
      //     return unionPost;
      //   })
      // );
      // // unconfirmed_p 재정의
      // unionDetails.post_info.unconfirmed_p = await Promise.all(
      //   unionDetails.post_info.unconfirmed_p.map(async ({ post_id }) => {
      //     const { data: unionConversation } = await API.get.posts(post_id);
      //     return unionConversation;
      //   })
      // );
      console.log('unionDetails', unionDetails);
      setUnionData(unionDetails.union_info);
      setPostData(unionDetails.post_info);
      setParticiPationListData(unionDetails.union_info.participants);
      setTempParticipantsData(unionDetails.union_info.temp_participants);
    };
    fetchUnionData();
  }, [user]);

  if (!!!user || !tempParticipantsData) return <></>;
  return (
    <Responsive level={2}>
      <UnionInfo unionData={unionData} setIsModalActive={setIsModalActive} />
      <ParticipationList
        data={tempParticipantsData}
        participantsConversationData={postData.unconfirmed_p}
        title={'조합 참여 미확정자'}
      />
      <ParticipationList
        data={participationListData}
        participantsConversationData={postData.confirmed_p}
        title={'조합 참여 확정'}
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
      <UnionOrganizeConfirmModal
        isModalActive={isModalActive}
        handleModalVisibility={setIsModalActive}
        unionData={unionData}
      />
    </Responsive>
  );
};

export default UnionManagePage;
