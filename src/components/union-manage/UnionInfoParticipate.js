import React from "react";
import styled from "styled-components";

import Conditional from "components/common/Conditional";
import { amountFormating } from "lib/amountFormat";
import { dateFormating } from "lib/dateFormat";

import API from "lib/api";

const UnionInfoParticipate = ({ userData, unionData }) => {
  console.log("&&&& userData", userData);

  const handleClickRequest = () => {
    API.post
      .unionRequest({
        user: userData.id,
        union: unionData.id,
        request_invest_account: 10,
        amount_per_account: 10,
      })
      .then((res) => {
        console.log(res);
        alert(res);
      });
  };
  return (
    <Conditional condition={unionData}>
      <InfoSection>
        <Header>
          <Title>{unionData.name} 조합 정보</Title>
          <Button onClick={handleClickRequest}>조합 참여 요청하기</Button>
        </Header>
        <InfoMain>
          <InfoRow>
            <Category>운용사</Category>
            <InfoSummary>{unionData?.owner?.corporate_name}</InfoSummary>
          </InfoRow>
          <InfoRow>
            <Category>조합설명</Category>
            <InfoSummary> {unionData.description} </InfoSummary>
          </InfoRow>
          <InfoRow>
            <Category>투자 분야</Category>
            <InfoSummary>
              {unionData?.invest_category?.map((item, idx) => (
                <CategoryBG key={idx}>{item.category}</CategoryBG>
              ))}
            </InfoSummary>
          </InfoRow>
          <InfoRow>
            <Category>모집 기간</Category>
            <InfoSummary>
              {" "}
              {dateFormating(unionData.recruitment_end_date)}{" "}
            </InfoSummary>
          </InfoRow>
          <InfoRow>
            <Category>출자총액 / 현재 출자액</Category>
            <InfoSummary>
              {" "}
              {amountFormating(unionData.expected_amount)} /{" "}
              {amountFormating(unionData.collected_amount)} (목표금액의{" "}
              {(unionData.collected_amount / unionData.expected_amount) * 100}%){" "}
            </InfoSummary>
          </InfoRow>
          <InfoRow>
            <Category>최소출자액 / 최소구좌수</Category>
            <InfoSummary>
              {" "}
              {amountFormating(
                unionData.amount_per_account * unionData.min_of_account
              )}{" "}
              / {unionData.min_of_account}구좌{" "}
            </InfoSummary>
          </InfoRow>
        </InfoMain>
      </InfoSection>
    </Conditional>
  );
};

export default UnionInfoParticipate;

const InfoSection = styled.section`
  margin-top: 80px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
`;

const Button = styled.button`
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  background-color: #3d31e4;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
`;
const InfoMain = styled.main`
  border-top: 1px solid #847f7f;
  border-bottom: 1px solid #847f7f;
  padding-top: 40px;
  padding-bottom: 18px;
  margin-top: 18px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 16px;
`;

const Category = styled.span`
  display: block;
  color: rgba(132, 127, 127, 1);
  width: 200px;
  height: auto;
`;

const InfoSummary = styled.p`
  flex: 1;
  word-break: keep-all;
  font-weight: ${(props) => props.name && 700};
  display: flex;
`;

const CategoryBG = styled.span`
  padding: 6px 15px;
  border: 1px solid black;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0px;
  }
`;
