import Responsive from 'components/common/Responsive';
import ChatList from 'components/Union-manage/chat/ChatList';
import ManageHeader from 'components/Union-manage/ManageHeader';
import InfoSection from 'composition/UnionManage/UserChat/InfoSection';
import React from 'react';
const ManageUserChatPage = () => {
    return(
      <Responsive level={2}>
        <ManageHeader title={"달리는 토끼바람 님과의 대화"} backPage={"전체"}/>
        <InfoSection/>
        <ChatList title={"대화 내용"}/>
      </Responsive>
    )
}

export default ManageUserChatPage;