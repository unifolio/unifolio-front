import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Card from "./common/Card";
import * as API from '../lib/api';

const WaitingPeopleCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display:flex;
`;

const WaitingAssociations = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log(API.getUsers().data)
    setUsers(API.getUsers().data)
    console.log(users)
    console.log(users.length)
  }, [])
  
  return (
    <>
      { Array(1).fill(0).map((each, i) => 
        { return (
          <WaitingPeopleCell key={`${i}`}>
            {/* <Card idx={i+1}/> */}
          </WaitingPeopleCell>
        )}
      )}
    </>
  );
}

export default WaitingAssociations;
