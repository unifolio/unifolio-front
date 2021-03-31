import React from 'react';
import styled from 'styled-components';
import CancelImage from '../assets/images/cancel.png';

const WaitingInfoPosition = styled.section`
	width:100%;
	height:100%;
	display: flex;
	
`;

const WaitingInfoBlock = styled.div`
	width:100%;
	height:100%;
	display: block;
	padding: 2rem 5rem;
	position: relative;
`;

const CancelButton = styled.button`
	
	border:0;
	outline:0;
	background-color: rgba(225,255,255,0);
	cursor: pointer;
	position: absolute;
	top:2rem;
	right:2rem;
`

const WaitingInfo = (props) => {
	const { idx, info,toggleModal } = props;

	if (info === null) {
		return <></>;
	}

	return (
		<WaitingInfoPosition>
			<WaitingInfoBlock>
				<CancelButton onClick={()=>toggleModal(false)}>
					<img src={CancelImage} alt="닫기"/>
				</CancelButton>
				<h3>{idx}</h3>
				{console.log('모달', info)}
				이름 : {info.name} <br />
				소개 : {info.introduction} <br />
				<h4>학력</h4>
				학력 : 경희대학교 <br />
				<h4>경력</h4>
				경력 : 경력이 없습니다.{info.corporate_name} <br />
			</WaitingInfoBlock>
		</WaitingInfoPosition>
	);
};

export default WaitingInfo;
