import React from "react";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/svgs/LeftArrow.svg";

const ManageHeader = ({ title, is_participant, backPage, handleClickApprove, handleClickDeny }) => {

  const handleConfirm = (confirmMsgType) => {
    if (confirmMsgType === "approve") {
      const confirmResult = window.confirm("정말 이 유저를 참여시키겠습니까?");
      if (confirmResult) handleClickApprove();
    } else if (confirmMsgType === "deny") {
      const confirmResult = window.confirm("정말 이 유저를 퇴장시키겠습니까?");
      if (confirmResult) handleClickDeny();
    }
    
  }
  return (
    <Header>
      <BackButton>
        <LeftArrow />
        {/* <Link to={match}>{backPage}</Link> */}
      </BackButton>
      <Title>{title}</Title>
      {is_participant || (
        <div>
          <JoinButton onClick={() => handleConfirm("approve")}>
            조합 참여 승인
          </JoinButton>
          <JoinButton onClick={() => handleConfirm("deny")}>
            조합 참여 거절
          </JoinButton>
        </div>
      )}
    </Header>
  );
};

export default ManageHeader;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;
`;
const BackButton = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  & > span {
    margin-left: 17px;
  }
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  
  margin-bottom: 0;
  margin-left: 74px
`;
const JoinButton = styled.button`
  cursor: pointer;
  background: #3c2ff2;
  border-radius: 4px;
  padding: 10px 15px;
  color: #fff;
  font-weight: bold;
  border: 0;

  & + & {
    margin-left: 10px;
  }
`;
