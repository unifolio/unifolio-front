import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

const Card = ({ idx, info, openModal, type }) => {
  const $card = useRef();

  const calculateDate = (start_date, end_date) => {
    start_date = new Date(start_date);

    end_date = new Date(end_date);
    let months;
    months = (end_date.getFullYear() - start_date.getFullYear()) * 12;
    months -= start_date.getMonth();
    months += end_date.getMonth();
    return months <= 0 ? 0 : months;
    // const remainDateInteger = (new Date(end_date) - new Date(start_date)) / 1000 / 60 / 60 / 24;
    // if (remainDateInteger >= 1) {
    //   return `${Math.floor(remainDateInteger)}일 남음`;
    // }
    // return `${Number(remainDateInteger * 24)}시간 남음`;
  };

  return (
    <CardLayout type={type}>
      <CardInnerLayout ref={$card}>
        <CardHeader>
          <CardHeaderLeft>
            <UserName>{info.nickname} </UserName>
            <span>님</span>
          </CardHeaderLeft>
          <CardHeaderRight>
            <CommonText>최대 출자 가능액</CommonText>
            <MoneyText>{info.maximum_investable_amount}만원</MoneyText>
          </CardHeaderRight>
        </CardHeader>
        <InfomationTitle>
          <CommonText>학력</CommonText>
        </InfomationTitle>
        <SectionPosition>
          {info.education?.map((educate, index) => (
            <InfomationRow key={index}>
              <InfomationMain>{educate.school_name}</InfomationMain>
              <InfomationMiddle>{educate.major}</InfomationMiddle>
              <InfomationRight>
                {((educate.attend_status === 'complete' ||
                  educate.attend_status === 'graduate') &&
                  '졸업') ||
                  (educate.attend_status === 'ongoing' && '재학')}
              </InfomationRight>
            </InfomationRow>
          ))}
        </SectionPosition>

        <InfomationTitle>
          <CommonText>경력</CommonText>
        </InfomationTitle>
        <SectionPosition>
          {info.career?.map((career, index) => (
            <InfomationRow key={index}>
              <InfomationMain>{career.category.category}</InfomationMain>
              <InfomationMiddle>{career.company}</InfomationMiddle>
              <InfomationMiddle>{career.job}</InfomationMiddle>
              <InfomationRight>
                {calculateDate(career.start_date, career.end_date)}개월
              </InfomationRight>
            </InfomationRow>
          ))}
          {info.investment_history?.map((history, index) => (
            <InfomationRow key={`${index}-${history}`}>
              <InfomationMain>{history.category}</InfomationMain>
              <InfomationMiddle>{history.company}</InfomationMiddle>
              <InfomationRight>24개월</InfomationRight>
            </InfomationRow>
          ))}
        </SectionPosition>
      </CardInnerLayout>
      {type !== 'modal' && (
        <ButtonPosition>
          <Button
            onClick={() =>
              openModal({ idx, info, $card: $card.current.cloneNode(true) })
            }
          >
            문의하기
          </Button>
        </ButtonPosition>
      )}
    </CardLayout>
  );
};

const CardLayout = styled.div`
  width: 100%;
  height: 100%;
  ${({ type }) => {
    return (
      type !== 'modal' &&
      css`
        min-width: 297px;
        max-height: 329px;
        box-shadow: 0 5px 7px -1px gray;
        padding: 1rem 1.5rem;
      `
    );
  }}
`;
const CardInnerLayout = styled.div`
  // ref로 가져감.
  width: 100%;

  /* min-width:297px; */
`;
const CardHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CardHeaderLeft = styled.div`
  padding: 5px 0;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;
const CardHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const CommonText = styled.span`
  font-size: 0.625rem;
  color: rgba(132, 127, 127, 1);
  font-weight: 500;
  line-height: 1rem;
`;
const MoneyText = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
`;

const SectionPosition = styled.section`
  max-height: 80px;
  min-height: 80px;
  height: 80px;
  overflow-y: scroll;
`;

const InfomationTitle = styled.div`
  border-bottom: 1px solid rgba(196, 196, 196, 1);
`;
const InfomationRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 6px 0;
`;
const InfomationMain = styled(CommonText)`
  display: block;
  width: 69px;
  color: rgba(60, 47, 242, 1);
  font-weight: 700;
`;
const InfomationRight = styled(CommonText)`
  width: 45px;
`;
const InfomationMiddle = styled(CommonText)`
  flex: 1;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ButtonPosition = styled.div`
  align-self: flex-end;
  width: 100%;
`;
const Button = styled.button`
  width: 100%;
  height: 2.5rem;
  font-size: 1rem;
  color: rgba(60, 47, 242, 1);
  border: 1px solid rgba(60, 47, 242, 1);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0);
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(60, 47, 242, 1);
    color: white;
  }
`;

export default Card;
