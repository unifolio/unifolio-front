import React from 'react';
import styled from 'styled-components';

import Card from './common/Card';

import { useSelector } from 'react-redux';
import useSWR from 'swr';
import fetcher from 'util/fetcher';
import { generateApiLinkPeople } from 'util/generateApiLink';
const WaitingPeopleCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display: flex;
`;

const WaitingPeople = ({ openModal }) => {
  const { amountRange, careersId } = useSelector(
    (state) => state.finding.waitingPeople,
  );

  const { data, isLoading } = useSWR(
    generateApiLinkPeople(amountRange, careersId),
    fetcher,
  );
  const onOpenModal = (cardObj) => {
    openModal(cardObj);
  };
  return (
    <>
      {!isLoading &&
        data?.map((user, i) => {
          return (
            <WaitingPeopleCell key={`${i}`}>
              <Card idx={i + 1} info={user} openModal={onOpenModal} />
            </WaitingPeopleCell>
          );
        })}
    </>
  );
};

export default WaitingPeople;
