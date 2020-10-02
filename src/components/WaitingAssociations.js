import React from 'react';
import styled from 'styled-components';

import Card from "./common/Card";

const WaitingPeopleCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display:flex;
`;

const WaitingAssociations = () => {
  return (
    <>
      { Array(9).fill(0).map((each, i) => 
        { return (
          <WaitingPeopleCell>
            <Card idx={i+1}/>
          </WaitingPeopleCell>
        )}
      )}
    </>
  );
}

export default WaitingAssociations;
