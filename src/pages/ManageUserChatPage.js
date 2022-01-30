import React, { useEffect, useState } from "react";

import Responsive from "components/common/Responsive";
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from "components/Union-manage/participation/ParticipationList";
import NoticeList from "components/Union-manage/notice/NoticeList";
import Editor from "components/Union-manage/Editor";

import ChatList from "components/Union-manage/chat/ChatList";
import ManageHeader from "components/Union-manage/ManageHeader";
import InfoSection from "composition/UnionManage/UserChat/InfoSection";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const ManageUserChatPage = ({ match }) => {
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [receiverData, setReceiverData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData, setTempParticipantsData] = useState([]);
  const { user } = useFetchUserToken(); // 유저정보

  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;

      const receiverId = match.params.id;
      const { data: receiver } = await API.get.userGeneral({
        userId: receiverId,
      }); // 채팅하는 사람의 idx

      const unions = await API.get.unions();
      const unionId = unions.data.filter(
        (union) => union.owner.id === userId
      )[0].id;
      const { data: unionDetails } = await API.get.unionDetail(unionId);

      const allPosts = await API.get.posts();

      const chatPosts = allPosts.filter(
        ({ writer, receiver }) => writer === user.id || receiver === receiverId
      );

      // writer의 id로 post를 조회, receiver의 id로 post를 조회
      // left join -> writer 전체 post 조회 중 -> receiver의 id로 조회
      setReceiverData(receiver);
      setUnionData(unionDetails.union_info);
      setPostData(chatPosts);

      setParticiPationListData(unionDetails.union_info.participants);
      setTempParticipantsData(unionDetails.union_info.temp_participants);
      // console.log(data)
    };
    fetchUnionData();
  }, [user]);

  if (!!!user || !receiverData || !postData) return <> 로딩중 </>;

  return (
    <Responsive level={2}>
      <ManageHeader
        title={`${receiverData.nickname} 님과의 대화`}
        backPage={"전체"}
      />
      <InfoSection unionData={unionData} receiverData={receiverData} />
      <ChatList title={"대화 내용"} postData={postData} />
    </Responsive>
  );
};

export default ManageUserChatPage;
