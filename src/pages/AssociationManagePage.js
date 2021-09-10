import Responsive from 'components/common/Responsive';
import React, { useEffect, useState } from 'react';
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from 'components/Union-manage/participation/ParticipationList';
import NoticeList from 'components/Union-manage/notice/NoticeList';
import API from 'lib/api';

const AssociationManagePage = () => {
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData,setTempParticipantsData] = useState([]);
  useEffect(() => {
      const fetchUnionData = async () => {
        const {data:{data}} = await API.get.union_detail(18);
        setUnionData(data.union_info);
        setPostData(data.post_info);
        setParticiPationListData(data.union_info.participants);
        setTempParticipantsData(data.union_info.temp_participants);
        console.log(data)
      }
      fetchUnionData();  
    }, []);
    
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
