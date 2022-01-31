import React from "react";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/svgs/LeftArrow.svg";

const ManageHeader = ({ match, title, backPage }) => {
  console.log(match);
  return (
    <Header>
      <BackButton>
        <LeftArrow />
        {/* <Link to={match}>{backPage}</Link> */}
      </BackButton>
      <Title>{title}</Title>
      <JoinButton>조합 참여 요청</JoinButton>
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
`;
const JoinButton = styled.button`
  cursor: pointer;
  background: #3c2ff2;
  border-radius: 4px;
  padding: 10px 15px;
  color: #fff;
  font-weight: bold;
  border: 0;
`;
