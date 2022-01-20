import React, { useEffect, useState } from 'react';

import Responsive from 'components/common/Responsive';
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from 'components/Union-manage/participation/ParticipationList';
import NoticeList from 'components/Union-manage/notice/NoticeList';
import Editor from 'components/Union-manage/Editor';

import useFetchUserToken from "hooks/useFetchUserToken";
import API from 'lib/api';

const UnionManagePage = () => {
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData,setTempParticipantsData] = useState([]);
  const { user } = useFetchUserToken();
  
  useEffect(() => {
      const fetchUnionData = async () => {
        const userId = user?.id;
        if (!userId) return;
        
        const unions = await API.get.unions();
        const unionId = unions.data.filter((union) => union.owner.id === userId)[0].id;
        const { data: unionDetails } = await API.get.unionDetail(unionId);
        console.log(unionDetails)
        setUnionData(unionDetails.union_info);
        setPostData(unionDetails.post_info);
        setParticiPationListData(unionDetails.union_info.participants);
        setTempParticipantsData(unionDetails.union_info.temp_participants);
        // console.log(data)
      }
      fetchUnionData();  
    }, [user]);
  
  // alert("본페이지는 예시페이지입니다 마무리가 늦어져서 죄송합니다")
  if (!!!user) return <></>;
  return (
    <Responsive level={2}>
      <UnionInfo unionData={unionData}/>
      <ParticipationList data={tempParticipantsData} title={"조합 참여 미확정자"} object={"대화상대"}/>
      <ParticipationList data={participationListData} title={"조합 참여 확정"} object={"확정자"}/>
      <NoticeList editor={<Editor />}/>
    </Responsive>
  );
}

export default UnionManagePage;
