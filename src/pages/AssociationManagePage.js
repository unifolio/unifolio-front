import React, { useEffect, useState } from 'react';

import Responsive from 'components/common/Responsive';
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from 'components/Union-manage/participation/ParticipationList';
import NoticeList from 'components/Union-manage/notice/NoticeList';

import useFetchUserToken from 'hooks/useFetchUserToken';

import API from 'lib/api';

const AssociationManagePage = () => {
  
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData,setTempParticipantsData] = useState([]);

  const { user } = useFetchUserToken();
  
  useEffect(() => {
      const fetchUnionData = async () => {
        console.log("user", user)
        const { data } = await API.get.unionDetail(user.id);
        console.log("unionDetail data", data);
        setUnionData(data.union_info);
        setPostData(data.post_info);
        setParticiPationListData(data.union_info.participants);
        setTempParticipantsData(data.union_info.temp_participants);
        console.log(data)
      }
      fetchUnionData();  
    }, []);
  
  // alert("본페이지는 예시페이지입니다 마무리가 늦어져서 죄송합니다")
  if (!!!user) return <></>;
  return (
    <Responsive level={2}>
      <UnionInfo unionData={unionData}/>
      <ParticipationList data={tempParticipantsData} title={"조합 참여 미확정자"} object={"대화상대"}/>
      <ParticipationList data={participationListData} title={"조합 참여 확정"} object={"확정자"}/>
      <NoticeList />
    </Responsive>
  );
}

export default AssociationManagePage;
