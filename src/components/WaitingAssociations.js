import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from './common/Card';
import API from '../lib/api';

const WaitingPeopleCell = styled.div`
	margin: 0.5rem;
	place-items: center;
	display: flex;
`;

const WaitingAssociations = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const fetchUsers = await API.get.users().data;
			setUsers(fetchUsers.data);
		};
		fetchData();
	}, []);

	return (
		<>
			{Array(1)
				.fill(0)
				.map((each, i) => {
					return (
						<WaitingPeopleCell key={`${i}`}>
							<Card idx={i + 1} />
						</WaitingPeopleCell>
					);
				})}
		</>
	);
};

export default WaitingAssociations;
