import React from 'react';
import styled from 'styled-components';

import UnionCard from 'components/common/UnionCard';
import useSWR from 'swr';
import { generateApiLinkUnion } from 'util/generateApiLink';
import { useSelector } from 'react-redux';
import fetcher from 'util/fetcher';

const WaitingUnionsCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display: flex;
`;

const WaitingUnions = ({ openModal }) => {
  const onOpenModal = (cardObj) => {
    openModal(cardObj);
  };
  const {
    collectAmountRange,
    amountRange: unionAmountRange,
    categoriesId: unionCategoriesId,
    endDate,
  } = useSelector((state) => state.finding.waitingUnions);
  const { data: waitingUnionsData } = useSWR(
    generateApiLinkUnion(
      endDate,
      collectAmountRange,
      unionAmountRange,
      unionCategoriesId,
    ),
    fetcher,
  );
  if (waitingUnionsData?.length === 0) {
    console.log(`unions ${waitingUnionsData.length}`);
    return <></>;
  }

  return (
    <>
      {waitingUnionsData?.map((union, i) => {
        return (
          <WaitingUnionsCell key={`${i}`}>
            <UnionCard union={union} idx={i + 1} openModal={onOpenModal} />
          </WaitingUnionsCell>
        );
      })}
    </>
  );
};

export default WaitingUnions;
