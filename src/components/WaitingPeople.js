import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from './common/Card';
import API from '../lib/api';
import {data} from "../pages/dummyData"

const WaitingPeopleCell = styled.div`
	margin: 0.5rem;
	place-items: center;
	display: flex;
`;

const WaitingPeople = (props) => {
	const { openModal,filterValue } = props;
	const [users, setUsers] = useState([]);
	
  const onOpenModal = (cardObj) => {
		openModal(cardObj);
	};

	useEffect(() => {
	// 	const fetchData = async () => {
    //   const fetchUsers = await API.get.usersGeneral();
    //   if (fetchUsers.status === 500) {
    //     console.error("fetchUsers is 500");
    //   } else if (fetchUsers.status === 200) {
	// 		  setUsers(fetchUsers.data.results);
    //   }
	// 	};
	// 	fetchData();
	 	setUsers(data);
	}, []);
	
  return (
		<>
			{users?.map((user, i) => {
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
