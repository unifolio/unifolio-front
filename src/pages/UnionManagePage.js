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
      console.log("unionDetails", unionDetails)

      // 유니언 post검증
      const unionId = unionDetails?.union_info.id;
      const {data: unionInfo} = await API.get.union(unionId)
      console.log("unionInfo", unionInfo)
      
      
      const allPostData = [...unionDetails.post_info.unconfirmed_p, ...unionDetails.post_info.confirmed_p].sort((prev, next) => prev.post_id - next.post_id);
      console.log(allPostData)
      
      const participants = allPostData.filter(post => unionInfo.participants.includes(post.writer_id) || unionInfo.participants.includes(post.receiver_id))
      // const participants = unionInfo.participants.map(participantId => {
      //   return lastPickPostData[lastPickPostData.findIndex(post => post.writer_id === participantId || post.receiver_id === participantId)]
      // });
      // console.log("==== ==== , participants", participants)
      const uniqTempParticipants = unionInfo.temp_participants.filter((temp, idx) => unionInfo.temp_participants.findIndex(target => target === temp) === idx)
      const tempParticipants = allPostData.filter(post => uniqTempParticipants.includes(post.writer_id) || uniqTempParticipants.includes(post.receiver_id))

      setUnionData(unionDetails.union_info);
      // setPostData(unionDetails.post_info);
      setPostData({confirmed_p: participants, unconfirmed_p: tempParticipants, notice: unionDetails.post_info.notice})
      setParticiPationListData(unionDetails.union_info.participants);
      setTempParticipantsData(unionDetails.union_info.temp_participants);
    };
    fetchUnionData();
  }, [user]);

  if (!user || !tempParticipantsData) return <></>;
  return (
    <Responsive level={2}>
      <UnionInfo unionData={{...unionData, description: user.introduction }} setIsModalActive={setIsModalActive} />
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
            is_notice={true}
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
