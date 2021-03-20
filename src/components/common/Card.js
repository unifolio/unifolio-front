import React from 'react';
import styled from 'styled-components';

const CardLayout = styled.div`
	width: 100%;
	height: 100%;
	box-shadow: 0 5px 7px -1px gray;
	padding: 1rem;
	display: grid;
`;

const Card = (props) => {
	const { idx, info, openModal } = props;
	console.log(info);
	const univ = ['', '경희', '한양', '서울', '고려', '연세', '국민', '명지', '동양', '부산', '경북', '전북', '전남', '강원'];
	return (
		<CardLayout>
			<h3>{idx}</h3>
			이름 : {info.name} <br />
			소개 : {info.introduction} <br />
			<h4>학력</h4>
			학력 : {info.univ == undefined ? univ[idx] : info.univ} 대학교 <br />
			<h4>경력</h4>
			경력 : 경력이 없습니다.{info.corporate_name} <br />
			<button onClick={() => openModal({ idx, info })}>문의하기</button>
		</CardLayout>
	);
};

export default Card;
