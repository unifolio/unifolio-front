import React from 'react';
import styled from 'styled-components';
import CancelImage from '../assets/images/cancel.png';

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
				<InfoSection>
					<HeadCategory>운용사 정보</HeadCategory>
					<HeadSummary>
						<BigFont>A 엑셀러레이터</BigFont>
						<Discription>A 엑셀러레이터는 인공지능 전문가들을 필두로 하여 가능성이 높은 스타트업에 투자를 해왔습니다. 총 N 년간의 노하우로 보다 높은 수익률을 보장합니다.</Discription>
					</HeadSummary>
				</InfoSection>
				<InfoSection>
					<Category>투자 분야</Category>
					<FieldList>
						<li>
							<Tag>커머스</Tag>
						</li>
						<li>
							<Tag>IT</Tag>
						</li>
					</FieldList>
				</InfoSection>
				<InfoSection>
					<Category>투자 이력</Category>
					<RecordList>
						<RecordListItem>
							<RecordTag>커머스</RecordTag>
							<RecordBigFont>티몬 A 시리즈에 펀딩했습니다</RecordBigFont>
						</RecordListItem>
						<RecordListItem>
							<RecordTag>커머스</RecordTag>
							<RecordBigFont>티몬 A 시리즈에 펀딩했습니다</RecordBigFont>
						</RecordListItem>
						<RecordListItem>
							<RecordTag>커머스</RecordTag>
							<RecordBigFont>티몬 A 시리즈에 펀딩했습니다</RecordBigFont>
						</RecordListItem>
					</RecordList>
				</InfoSection>
			</WaitingInfoBlock>
		</WaitingInfoPosition>
	);
};

const WaitingInfoPosition = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const WaitingInfoBlock = styled.div`
	display: block;
`;

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
	@media screen and (max-width:545px){
		padding: 2rem 2rem;
	}
`;

const CancelButton = styled.button`
	
	border:0;
	outline:0;
	background-color: rgba(225,255,255,0);
	cursor: pointer;
	position: absolute;
	top:1rem;
	right:1rem;
	@media screen and (max-width:545px){
		top:0.5rem;
		right:0.5rem;
	}
`;
const InfoSection = styled.section`
	display:flex;
	align-items:flex-start;
`;
const Category = styled.span`
	display:block;
	min-width:85px;
	color:rgba(60, 47, 242, 1);
	font-size:0.75rem;
	font-weight:700;
	@media screen and (max-width:450px){
		min-width:65px;
	}
`;
const HeadCategory = styled(Category)`
	line-height:2.3rem;

`;
const HeadSummary = styled.div`
	margin-bottom:3.375rem;
`
const BigFont = styled.span`
	display:block;
	font-size:1.25rem;
	flex:1;
`;
const Discription = styled.p`
	font-size:0.875rem;
	color:rgba(150, 150, 150, 1);
	margin-bottom:0;
`;
const FieldList = styled.ul`
	list-style:none;
   	padding-left:0px;
	display:flex;
`;

const Tag = styled.span`
	color:rgba(60, 47, 242, 1);
	font-size:0.75rem;
	font-weight:700;
	border: 1px solid rgba(60, 47, 242, 1);
	border-radius:30px;
	padding: 1px 10px;
	text-align:center;
	margin-right: 0.75rem;
	@media screen and (max-width:450px){
		font-size:0.5rem;
		margin-right: 0.5rem;

	}
`;

const RecordList = styled.ul`
	list-style:none;
   	padding-left:0px;
`;
const RecordListItem = styled.li`
	display:flex;
	align-items: flex-start;
	margin-bottom:1rem;
`;
const RecordTag = styled(Tag)`
	margin-right: 2.5rem;
	@media screen and (max-width:570px){
		margin-right: 1rem;
	}
`;
const RecordBigFont = styled(BigFont)`
	@media screen and (max-width:620px){
		font-size:1rem;
	}
	@media screen and (max-width:450px){
		font-size:0.75rem;
	}
`;

export default WaitingInfo;
