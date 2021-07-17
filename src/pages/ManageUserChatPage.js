import Responsive from 'components/common/Responsive';
import NoticeList from 'components/Union-manage/notice/NoticeList';
import ParticipationList from 'components/Union-manage/participation/ParticipationList';
import InfoSection from 'composition/UnionManage/UserChat/InfoSection';
import React from 'react';
const ManageUserChat = () => {
    return(
      <Responsive level={2}>
        <InfoSection/>
        <ParticipationList title={"조합 참여 미확정자"} object={"대화상대"}/>
        <ParticipationList title={"조합 참여 확정"} object={"확정자"}/>
        <NoticeList />
      </Responsive>
    )
}

export default ManageUserChat;