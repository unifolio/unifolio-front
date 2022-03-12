import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Responsive from "components/common/Responsive";
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from "components/Union-manage/participation/ParticipationList";
import NoticeList from "components/Union-manage/notice/NoticeList";
import Editor from "components/Union-manage/Editor";

import ChatList from "components/Union-manage/chat/ChatList";
import ManageHeader from "components/Union-manage/ManageHeader";
import InfoSection from "composition/UnionManage/UserChat/InfoSection";

import UnionCommonModal from "components/Modal/UnionCommonModal";
import RequestReadyParticipate from "composition/UnionParticipate/Modal/RequestReadyParticipate";

import useFetchUserToken from "hooks/useFetchUserToken";
import API from "lib/api";

const ManageUserChatPage = ({ match }) => {
  const [unionData, setUnionData] = useState("");
  const [postData, setPostData] = useState("");
  const [receiverData, setReceiverData] = useState("");
  const [participationListData, setParticiPationListData] = useState([]);
  const [tempParticipantsData, setTempParticipantsData] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);

  const { user } = useFetchUserToken(); // 유저정보
  const { id } = useParams();

  useEffect(() => {
    const fetchUnionData = async () => {
      const userId = user?.id;
      if (!userId) return;

      const unions = await API.get.unionManageOwner(userId);

      // console.log(unions.data.filter((union) => union.owner.id === userId));
      // const unionId = unions.data.filter(
      //   (union) => union.owner.id === userId
      // )[0].id;

      const receiverId = id;
      const unionId = unions.data
        .filter((union) => union.owner.id === userId)
        .filter((union) =>
          union.temp_participants.find(
            (participant) => participant.id === Number(receiverId)
          )
        )[0].id;
      const { data: unionDetails } = await API.get.unionDetail(unionId); // 유니언의 상세 정보

      const { data: receiver } = await API.get.userGeneral({
        userId: receiverId,
      }); // 채팅하는 사람의 idx

      // post notice 재정의
      unionDetails.post_info.notice = await Promise.all(
        unionDetails.post_info.notice.map(async ({ post_id }) => {
          const { data: unionPost } = await API.get.posts(post_id);
          return unionPost;
        })
      );
      // unconfirmed_p 재정의
      unionDetails.post_info.unconfirmed_p = await Promise.all(
        unionDetails.post_info.unconfirmed_p.map(async ({ post_id }) => {
          const { data: unionConversation } = await API.get.posts(post_id);
          return unionConversation;
        })
      );

      // const allPosts = await API.get.posts();

      const chatPosts = unionDetails.post_info.unconfirmed_p.filter(
        ({ writer, receiver }) =>
          writer === receiverId ||
          writer === user.id ||
          receiver === receiverId ||
          receiver === user.id
      );
      console.log("chatPosts", chatPosts);

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

  const handleModalVisibility = (value) => {
    setIsModalActive(value ?? true);
  };

  const handleClickApprove = () => {
    alert("이얍");
    // API.post
    //   .unionApproveRequest({
    //     user: Number(id),
    //     union: unionData.id,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     alert("조합 참여 요청이 허용되었습니다");
    //   });
  };

  if (!!!user || !receiverData || !postData) return <> 로딩중 </>;

  return (
    <Responsive level={2}>
      <ManageHeader
        title={`${receiverData.nickname} 님과의 대화`}
        backPage={"전체"}
        handleClickApprove={handleModalVisibility}
      />
      <InfoSection unionData={unionData} receiverData={receiverData} />
      <ChatList title={"대화 내용"} postData={postData} />
      <UnionCommonModal
        isModalActive={isModalActive}
        handleModalVisibility={handleModalVisibility}
      >
        <RequestReadyParticipate
          userData={user}
          unionData={unionData}
          handleClickApprove={handleClickApprove}
        />
      </UnionCommonModal>
    </Responsive>
  );
};

export default ManageUserChatPage;
