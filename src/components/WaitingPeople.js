import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from './common/Card';
import API from 'lib/api';
import Conditional from './common/Conditional';

const WaitingPeopleCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display: flex;
`;

const WaitingPeople = ({ openModal, filterValue, setDataLength }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  console.log('filteredUsers', filteredUsers);

  const onOpenModal = (cardObj) => {
    openModal(cardObj);
  };

  useEffect(() => {
    (async () => {
      const fetchUsers = await API.get.usersGeneral();
      console.log(fetchUsers);
      if (fetchUsers.status === 500) {
        console.error('fetchUsers is 500');
      } else if (fetchUsers.status === 200) {
        // 임시 API 변경에 따른 수정 전
        // setFilteredUsers(fetchUsers.data.results);
        // setUsers(fetchUsers.data.results);
        // 임시 API 변경에 따른 수정 후
        setFilteredUsers(fetchUsers.data);
        setUsers(fetchUsers.data);

        setDataLength(fetchUsers.data.length);
      }
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(filterValue['waiting-people']).length !== 0 && users) {
      const filteredData = users.filter((item, idx) => {
        if (filterValue['waiting-people']['최대 출자가능액']) {
          for (let maxCost of filterValue['waiting-people'][
            '최대 출자가능액'
          ]) {
            if (
              maxCost === '5백만원 미만' &&
              item.maximum_investable_amount < 500
            )
              if (filterValue['waiting-people']['회사 분야']) {
                for (let filterCategory of filterValue['waiting-people'][
                  '회사 분야'
                ]) {
                  for (let careerItem of item.career) {
                    if (careerItem.category.category === filterCategory)
                      return item;
                  }
                }
              } else {
                return item;
              }
            if (
              maxCost === '5백만원 ~ 1천만원 미만' &&
              item.maximum_investable_amount >= 500 &&
              item.maximum_investable_amount < 1000
            )
              if (filterValue['waiting-people']['회사 분야']) {
                for (let filterCategory of filterValue['waiting-people'][
                  '회사 분야'
                ]) {
                  for (let careerItem of item.career) {
                    if (careerItem.category.category === filterCategory)
                      return item;
                  }
                }
              } else {
                return item;
              }
            if (
              maxCost === '1천만원 이상' &&
              item.maximum_investable_amount >= 1000
            )
              if (filterValue['waiting-people']['회사 분야']) {
                for (let filterCategory of filterValue['waiting-people'][
                  '회사 분야'
                ]) {
                  for (let careerItem of item.career) {
                    if (careerItem.category.category === filterCategory)
                      return item;
                  }
                }
              } else {
                return item;
              }
          }
        }
        if (filterValue['waiting-people']['회사 분야']) {
          for (let filterCategory of filterValue['waiting-people'][
            '회사 분야'
          ]) {
            for (let careerItem of item.career) {
              if (careerItem.category.category === filterCategory) return item;
            }
          }
        }
      });
      setDataLength(filteredData.length);
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(users);
      setDataLength(users.length);
    }
  }, [filterValue]);

  return (
    <>
      {filteredUsers?.map((user, i) => {
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
