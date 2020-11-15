import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Card from "./common/Card";
import * as API from '../lib/api';

const WaitingPeopleCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display:flex;
`;

const WaitingPeople = (props) => {
  const { openModal } = props;
  const [users, setUsers] = useState([]);
  const openModalEmit = (cardObj) => {
    openModal(cardObj);
  }

  useEffect(() => {
    const fetchData = async () => {
      // 임시
      const fetchUsers = await API.getUsers();
      setUsers(fetchUsers.data.results);
      // setUsers([]);
    }
    fetchData();
  }, []);

  if (users == []) {
    return;
  } else {
    console.log(users);
  }
  return (
    <>
      { users.map((user, i) => 
        { return (
          <WaitingPeopleCell key={`${i}`}>
            <Card idx={i+1} info={user} openModal={openModalEmit}/>
          </WaitingPeopleCell>
        )}
      )}
    </>
  );
}

export default WaitingPeople;
