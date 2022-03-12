import React, { useState } from "react";
import styled from "styled-components";

const RequestReadyParticipate = ({
  unionData,
  userData,
  handleClickApprove,
}) => {
  // console.log(unionData);
  console.log(userData);
  const [requestAccount, setRequestAccount] = useState(0);
  const {
    participants,
    expected_amount,
    collected_amount,
    min_of_account,
    amount_per_account,
  } = unionData;
  const min_of_amount_per_account = min_of_account * amount_per_account;
  const amountCalculator = (value) => (value * 1000000).toLocaleString();
  const UnionRowData = [
    { left: "현재 조합 참여인원", right: `${participants.length}명` },
    {
      left: "출자총액 / 현재 출자 총액",
      right: `${amountCalculator(expected_amount)}원 / ${amountCalculator(
        collected_amount
      )}원 (${(collected_amount / expected_amount) * 100}%)`,
    },
    {
      left: "최소출자액 / 최소구좌수",
      right: `${amountCalculator(
        min_of_amount_per_account
      )}원 / ${min_of_account} 구좌`,
    },
    {
      left: "1구좌당 금액",
      right: `${amountCalculator(amount_per_account)}원`,
    },
  ];

  const handleChangeRequestAccount = ({ target }) =>
    setRequestAccount(target.value);
  const requestAmount = (value) => value * 1000000 * amount_per_account;
  const UserRowData = [
    {
      left: "출자 요청 구좌수",
      right: (
        <>
          <input
            type="number"
            value={requestAccount}
            onChange={handleChangeRequestAccount}
          />
          구좌
        </>
      ),
    },
    {
      left: "출자 요청액",
      right: (
        <>
          <input
            type="text"
            value={requestAmount(requestAccount).toLocaleString("ko-kr")}
            disabled
          />
          만원
        </>
      ),
    },
    {
      left: "남은 출자액",
      right: `${(
        expected_amount * 1000000 -
        requestAmount(requestAccount)
      ).toLocaleString("ko-kr")}`,
    },
  ];

  return (
    <ModalContentsLayout>
      <ModalContentsHeaderLayout>
        <h3>{userData.name}님의 조합참여 요청</h3>
      </ModalContentsHeaderLayout>
      <ModalContentsBodyLayout>
        {UnionRowData.map(({ left, right }, idx) => (
          <Row key={`${left}-${idx}`}>
            <div>{left}</div>
            <div>{right}</div>
          </Row>
        ))}
        {UserRowData.map(({ left, right }, idx) => (
          <Row key={`${left}-${idx}`}>
            <div>{left}</div>
            <div>{right}</div>
          </Row>
        ))}
        <button onClick={handleClickApprove}> 조합참여 승인 </button>
        <button onClick={() => {}}> 조합참여 불허 </button>
      </ModalContentsBodyLayout>
    </ModalContentsLayout>
  );
};

const ModalContentsLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;

  display: flex;
  flex-flow: column;
`;

const ModalContentsHeaderLayout = styled.div``;
const ModalContentsBodyLayout = styled.div`
  margin: 70px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default RequestReadyParticipate;
