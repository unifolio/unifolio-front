import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Responsive from '../components/common/Responsive';
import HomeHeader from '../components/Header/HomeHeader';
import FilterSection from '../components/common/FilterSection';

import WaitingPeople from '../components/WaitingPeople';
import WaitingUnions from '../components/WaitingUnions';
import WaitingInfo from '../components/WaitingInfo';

const HomePagePosition = styled(Responsive)`
	position: relative;
	max-width: 100%;
	display: flex;
`;

const HomeMainSection = styled.div`
	width: 79%;
	height: 100%;
	padding-right: 1rem;
	display: inline-grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
`;

const HomeModalPosition = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;

	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HomeModalMain = styled.div`
	width: 40vw;
	height: 30vw;
	background-color: white;

	display: flex;
	flex-flow: column;
	z-index: 3;
`;

const HomeSideSection = styled.div`
	width: 20%;
	height: calc(100vh - 8rem);
	position: sticky;
	top: 4rem;

	border-color: gray;
	border-left-style: solid;
	border-width: thin;

	display: inline-grid;
	grid-template-rows: 1fr repeat(5, 3fr);
`;

const MainPage = (props) => {
	const { location } = props;
	const query = qs.parse(location.search, { ignoreQueryPrefix: true });
	const [modalContentIdx, setModalContentIdx] = useState(null);
	const [modalContent, setModalContent] = useState(null);
	const mainRef = React.createRef(),
		sideRef = React.createRef(),
		modalRef = React.createRef();

	useEffect(() => {
		console.log('modalRef.style', modalRef.current);
		modalRef.current.style.display = 'none';
	}, []);

	const mainSectionSelector = (current) => {
		console.log('mainSectionSelector', current);
		switch (current) {
			case 'waiting-people':
				return <WaitingPeople openModal={toggleModal} />;
			case 'waiting-unions':
				// return <WaitingPeople openModal={toggleModal} />;
			  return <WaitingUnions openModal={toggleModal} />;
			default:
				return <div style={{ width: '100%' }}> 상단의 메뉴를 선택해주세요 </div>;
		}
	};

	const sideSectionSelector = (current) => {
		console.log('sideSectionSelector', current);
		switch (current) {
			case 'waiting-people':
				return ['최대 출자 가능액', '경력 분야'];
			case 'waiting-unions':
				return ['조합 상태', '투자 분야', '출자 총액', '최소 출자액'];
			default:
				return [];
		}
	};

	const toggleFilter = (flag) => {
		if (flag) {
			mainRef.current.style.width = '100%';
			sideRef.current.style.display = 'none';
			document.querySelector('#filterOpenButton').style.display = '';
		} else {
			sideRef.current.style.width = '20%';
			sideRef.current.style.display = 'inline-grid';
			mainRef.current.style.width = '79%';
			document.querySelector('#filterOpenButton').style.display = 'none';
		}
	};

	const toggleModal = (cardObj) => {
		console.log(typeof cardObj);
		console.log(cardObj);
		if (typeof cardObj == 'boolean' && cardObj === false) {
			document.querySelector('body').style.overflow = '';
			modalRef.current.style.display = 'none';
			return;
		}
		if (typeof cardObj.idx == 'number') {
			setModalContentIdx(cardObj.idx);
			setModalContent(cardObj.info);
		}

		if (modalContentIdx != null || cardObj != null) {
			document.querySelector('body').style.overflow = 'hidden';
			modalRef.current.style.display = 'flex';
		}
	};

	return (
		<>
			<HomeHeader current={query.mode} />
			<br />
			<HomePagePosition className="HomePage">
				<HomeMainSection ref={mainRef}>{mainSectionSelector(query.mode)}</HomeMainSection>
				<HomeSideSection ref={sideRef}>
					<div style={{ display: 'inherit', gridTemplateColumns: '1fr 1fr', fontSize: '1.3rem', paddingLeft: '1rem', paddingRight: '1rem', alignItems: 'center' }}>
						<b> 필터 검색 </b>
						<div onClick={() => { toggleFilter(true); }} style={{ display: 'inherit', justifyItems: 'center' }}> 
              X
            </div>
					</div>
					{sideSectionSelector(query.mode).map((filterTitle, idx) => {
						console.log(filterTitle, '-', idx, '-', idx);
						return <FilterSection title={filterTitle} key={`${idx}-${idx}`} />;
					})}
				</HomeSideSection>
				<button
					id="filterOpenButton"
					onClick={() => {
						toggleFilter(false);
					}}
					style={{ position: 'absolute', left: '90%', display: 'none' }}
				>
					필터 열기
				</button>
			</HomePagePosition>
			<HomeModalPosition
				ref={modalRef}
				onClick={() => {
					toggleModal(false);
				}}
			>
				<HomeModalMain
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<WaitingInfo info={modalContent} idx={modalContentIdx} />
				</HomeModalMain>
			</HomeModalPosition>
		</>
	);
};

export default MainPage;
