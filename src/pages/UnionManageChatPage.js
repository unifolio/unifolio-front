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
  const [chatData, setChatData] = useState();
  const [userRequestedData, setUserRequestedData] = useState();
  const { user } = useFetchUserToken();
  
  const handleClickApprove = () => {
    
    const fetchApprove = async () => {
      const approveResult = await API.post.unionApproveRequest({
        user: Number(receiverId),
        union: Number(unionId),
        my_invest_account: Number(userRequestedData.request_invest_account), // 출자 요청 구좌수
        amount_per_account: Number(userRequestedData.amount_per_account), // 1구좌당 금액 900만
      });
      console.log(approveResult);
      alert("승인되었습니다.");
    };
    fetchApprove();
  };
  const handleClickDeny = () => {
    const fetchDeny = async () => {
      const denyResult = await API.put.unionDenyRequest({
        user: Number(receiverId),
        union: Number(unionId),
        my_invest_account: Number(userRequestedData.request_invest_account), // 출자 요청 구좌수
        amount_per_account: Number(userRequestedData.amount_per_account), // 1구좌당 금액 900만
      });
      console.log(denyResult);
      alert("거절되었습니다.");
    }
    fetchDeny();
  }
  
  useEffect(() => {
    const fetchUnionData = async () => {

      const { data: unionManageUserData } = await API.get.unionManageUser({
        unionId: unionId,
        userId: receiverId,
      });
      const {union, user_message, union_message, amount_per_account, request_invest_account, is_participant} = unionManageUserData;
      
      console.log("unionManageUserData", unionManageUserData)
      
      setUnionData(union);
      // setChatData([...user_message, ...union_message.filter(({ receiver }) => receiver === receiverId)]);
      setChatData([...user_message, ...union_message.filter(({receiver}) => receiver !== null)]);
      setUserRequestedData({amount_per_account, request_invest_account, is_participant});
    };
    fetchUnionData();
  }, []);

  if (!unionId || !receiverId || !unionData || !chatData || !user) return <></>;

  return (
    <UnionManageChatPageLayout level={2}>
      <ManageHeader
        title={`${unionData.name} 조합`}
        backPage={"대화중인 조합"}
        is_participant={userRequestedData.is_participant}
        handleClickApprove={handleClickApprove}
        handleClickDeny={handleClickDeny}
        // userId={user}
      />
      <InfoSection unionData={unionData} />
      <ChatList title={"대화하기"} postData={chatData} />
      <Editor
        is_notice={false}
        noticePrimaryInfo={
          unionData
            ? { userId: user?.id, unionId, is_notice: false, receiverId }
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
