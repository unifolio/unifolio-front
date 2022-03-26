import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Responsive from "components/common/Responsive";
import ChatList from "components/Union-manage/chat/ChatList";
import ManageHeader from "components/Union-manage/ManageHeader";
import Editor from "components/Union-manage/Editor";

import InfoSection from "composition/UnionManage/UnionChat/InfoSection";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const UnionManageChatPage = () => {
  const { unionId, receiverId } = useParams();
  const [unionData, setUnionData] = useState();
  const [userMessageData, setUserMessageData] = useState();
  const { user } = useFetchUserToken();
  
  console.log("unionId, receiverId", unionId, receiverId)
  
  useEffect(() => {
    const fetchUnionData = async () => {

      const { data: unionManageUserData } = await API.get.unionManageUser({
        unionId: unionId,
        userId: receiverId,
      });
      const {union, user_message} = unionManageUserData;
      
      console.log("unionManageUserData", unionManageUserData)
      
      setUnionData(union);
      setUserMessageData(user_message);
    };
    fetchUnionData();
  }, []);

  if (!unionId || !receiverId || !unionData || !userMessageData || !user) return <></>;

  return (
    <UnionManageChatPageLayout level={2}>
      <ManageHeader
        title={`${unionData.name} 조합`}
        backPage={"대화중인 조합"}
        // userId={user}
      />
      <InfoSection unionData={unionData} />
      <ChatList title={"대화하기"} postData={userMessageData} />
      <Editor
        noticePrimaryInfo={
          unionData
            ? { userId: user?.id, unionId }
            : undefined
        }
      />
    </UnionManageChatPageLayout>
  );
};

const UnionManageChatPageLayout = styled(Responsive)`
  padding-bottom: 150px;
`

export default UnionManageChatPage;
