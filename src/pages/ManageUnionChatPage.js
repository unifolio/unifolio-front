import Responsive from 'components/common/Responsive';
import ChatList from 'components/Union-manage/chat/ChatList';
import ManageHeader from 'components/Union-manage/ManageHeader';
import InfoSection from 'composition/UnionManage/UnionChat/InfoSection';
import React from 'react';
const ManageUionChatPage = () => {
    return(
      <Responsive level={2}>
        <ManageHeader title={"000000조합"} backPage={"대화중인 조합"}/>
        <InfoSection/>
        <ChatList title={"운용사에 문의하기"}/>
      </Responsive>
    )
}

export default ManageUionChatPage;