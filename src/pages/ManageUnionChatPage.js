import React from "react";

import { useParams } from "react-router-dom";

import Responsive from "components/common/Responsive";
import ChatList from "components/Union-manage/chat/ChatList";
import ManageHeader from "components/Union-manage/ManageHeader";
import InfoSection from "composition/UnionManage/UnionChat/InfoSection";

const ManageUionChatPage = () => {
  const { id } = useParams();

  return (
    <Responsive level={2}>
      <ManageHeader
        title={"000000조합"}
        backPage={"대화중인 조합"}
        userId={id}
      />
      <InfoSection />
      <ChatList title={"운용사에 문의하기"} />
    </Responsive>
  );
};

export default ManageUionChatPage;
