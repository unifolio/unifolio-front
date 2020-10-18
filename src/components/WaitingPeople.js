import React from 'react';
import styled from 'styled-components';

import Card from "./common/Card";

const WaitingPeopleCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display:flex;
`;

const WaitingPeople = (props) => {
  const { openModal } = props;
  const openModalEmit = (idx) => {
    openModal(idx);
  }
  return (
    <>
      { Array(27).fill(0).map((each, i) => 
        { return (
          <WaitingPeopleCell key={`${i}`}>
            <Card idx={i+1} openModal={openModalEmit}/>
          </WaitingPeopleCell>
        )}
      )}
    </>
  );
}

export default WaitingPeople;
