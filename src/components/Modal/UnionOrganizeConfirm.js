import React from 'react';
import styled from 'styled-components';
import UnionCommonModal from './UnionCommon';
import CancelImage from '../../assets/images/cancel.png';
import { axiosInstance } from 'lib/api';

const UnionOrganizeConfirmModal = ({
  isModalActive,
  handleModalVisibility,
  unionData,
}) => {
  console.log(unionData);

  return (
    <UnionCommonModal
      isModalActive={isModalActive}
      handleModalVisibility={handleModalVisibility}
      color='#f3f3f3'
    >
      <ModalLayout>
        <ModalHeader>
          <CancelButton onClick={() => handleModalVisibility(false)}>
            <img src={CancelImage} alt='닫기' />
          </CancelButton>
          <HeaderTitleGroup>
            {unionData.name} 조합
            <CategoryBGGroup>
              {unionData.invest_category.map((category) => {
                return (
                  <CategoryBG key={category.category}>
                    {category.category}
                  </CategoryBG>
                );
              })}
            </CategoryBGGroup>
          </HeaderTitleGroup>
          <SubTitleModule>
            <HeaderSubTitle>모집인원</HeaderSubTitle>
            <HeaderSubTitleContents>
              {unionData.participants.length}명
            </HeaderSubTitleContents>
          </SubTitleModule>
          <SubTitleModule>
            <HeaderSubTitle>출자 총액</HeaderSubTitle>
            <HeaderSubTitleContents>
              {unionData.collected_amount || 0}억원
            </HeaderSubTitleContents>
          </SubTitleModule>
          <ConfirmButton>현재 상태에서 조합 결성하기</ConfirmButton>
        </ModalHeader>
        <ModalBody>
          <BodyContentsRow>
            <SubTitle>운용사(GP)</SubTitle>
            <GPName>{`황철순 엑셀러레이터 5천만원 (10%)`}</GPName>
          </BodyContentsRow>
          <BodyContentsRowLP>
            <SubTitle>출자자(LP)</SubTitle>
            <LPGrid>
              <LPCard>
                <span>신지훈</span>
                <LPCardAmount>{`5천만원  (10%)`}</LPCardAmount>
              </LPCard>
              <LPCard>
                <span>신지훈</span>
                <LPCardAmount>{`5천만원  (10%)`}</LPCardAmount>
              </LPCard>
              <LPCard>
                <span>신지훈</span>
                <LPCardAmount>{`5천만원  (10%)`}</LPCardAmount>
              </LPCard>
              <LPCard>
                <span>신지훈</span>
                <LPCardAmount>{`5천만원  (10%)`}</LPCardAmount>
              </LPCard>
              <LPCard>
                <span>신지훈</span>
                <LPCardAmount>{`5천만원  (10%)`}</LPCardAmount>
              </LPCard>
            </LPGrid>
          </BodyContentsRowLP>
        </ModalBody>
      </ModalLayout>
    </UnionCommonModal>
  );
};

const ModalLayout = styled.div`
  word-break: keep-all;
`;

const ModalHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 120px 20px 60px;
  background: #ffffff;
  border-radius: 10px 10px 0 0;
  flex-wrap: nowrap;
  position: relative;
`;
const CancelButton = styled.button`
  border: 0;
  outline: 0;
  background-color: rgba(225, 255, 255, 0);
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  @media screen and (max-width: 545px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;
const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
  margin-right: 40px;
`;
const CategoryBGGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CategoryBG = styled.span`
  padding: 3px 8px;
  border: 1px solid #3c2ff2;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0px;
  }
`;
const SubTitleModule = styled.div`
  margin-right: 40px;
`;
const SubTitle = styled.span`
  display: block;
  width: 68px;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #3c2ff2;
`;
const HeaderSubTitle = styled(SubTitle)`
  padding-bottom: 4px;
  border-bottom: 1px solid #000000;
`;
const HeaderSubTitleContents = styled.span`
  display: flex;
  height: 70%;
  align-items: center;
`;
const ConfirmButton = styled.button`
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

const ModalBody = styled.section`
  padding: 20px 120px 60px 100px;
`;
const BodyContentsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const GPName = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
const BodyContentsRowLP = styled.div`
  display: flex;
  align-items: flex-start;
`;
const LPGrid = styled.div`
  display: grid;
  gap: 8px 12px;
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const LPCard = styled.div`
  max-width: 134px;
  min-width: 134px;
  min-height: 70px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #fff;
  padding: 6px 10px;
`;
const LPCardAmount = styled.span`
  font-size: 14px;
`;
export default UnionOrganizeConfirmModal;
