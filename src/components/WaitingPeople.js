import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from './common/Card';
import API from 'lib/api';
import {data} from 'pages/dummyData';

const WaitingPeopleCell = styled.div`
	margin: 0.5rem;
	place-items: center;
	display: flex;
`;

const WaitingPeople = (props) => {
	const { openModal,filterValue ,setDataLength} = props;
	const [users, setUsers] = useState([]);
	const [filteredUsers,setFilteredUsers] = useState([]);
	
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
		setFilteredUsers(data);
	 	setUsers(data);
		 setDataLength(data.length);
	}, []);

	useEffect(()=>{
		console.log(filterValue)
		if( Object.keys(filterValue["waiting-people"]).length !== 0){
			const filteredData = users.filter((item,idx)=>{
				if(filterValue["waiting-people"]["최대 출자가능액"]){
					for(let maxCost of filterValue["waiting-people"]["최대 출자가능액"]){
						if(maxCost==="5백만원 미만"&&item.maximum_investable_amount<5000000) return item;
						if(maxCost==="5백만원 ~ 1천만원 미만"&&item.maximum_investable_amount>=5000000&&item.maximum_investable_amount<10000000) return item;
						if(maxCost==="1천만원 이상"&&item.maximum_investable_amount>=10000000) return item;
	
					}
				}
				if(filterValue["waiting-people"]["회사 분야"]){
					for(let filterCategory of filterValue["waiting-people"]["회사 분야"]){
						for(let careerItem of item.career){
							if(careerItem.category === filterCategory) return item;
						}
						for(let investmentHistoryItem of item.investment_history){
							if(investmentHistoryItem === filterCategory) return item;
						}
					}
				}
			})
			setDataLength(filteredData.length)
			setFilteredUsers(filteredData);
		}else{
			setFilteredUsers(data);
		}
	},[filterValue])
	
  return (
		<>
			{filteredUsers?.map((user, i) => {
				return (
					<WaitingPeopleCell key={`${i}`}>
						<Card idx={i + 1} info={user} key={`${i}`} openModal={onOpenModal} />
					</WaitingPeopleCell>
				);
			})}
		</>
	);
};

export default WaitingPeople;
