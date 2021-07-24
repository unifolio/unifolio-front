import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import qs from 'qs';

import Responsive from '../components/common/Responsive';
import HomeHeader from '../components/Header/HomeHeader';

import WaitingPeople from '../components/WaitingPeople';

import WaitingUnions from '../components/Modal/WaitingUnions';
import MoreInfoPerson from '../components/Modal/MoreInfoPerson';
import MoreInfoUnion from '../components/Modal/MoreInfoUnion';
import Filter from 'components/common/Filter';

import API from '../lib/api';


const MainPage = (props) => {
	const { location } = props;
	const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  	const [modalContents, setModalContents] = useState({});
	const [filterVisible, setFilterVisible] = useState(false);
	const [filterValue, setFilterValue] = useState({"waiting-people":{},
	'waiting-unions':{}});
	const [categories, setCategories] = useState();
	const [dataLength, setDataLength] = useState();
	const $mainRef = React.createRef(),
		$modalRef = React.createRef();

	useEffect(() => {
    if (Object.keys(modalContents).length !== 0 ) {
			document.querySelector('body').style.overflow = 'hidden';
			$modalRef.current.style.display = 'flex';
		} else {
      $modalRef.current.style.display = 'none';
    }
	}, [$modalRef, modalContents]);
	
	useEffect(()=>{
		(async()=>{
			const fetchCategories = await API.get.all_categories();			
			setCategories(fetchCategories.data.data)
		})();
	},[])
	
  const modalSectionSelector = (current='waiting-people') => {
    switch (current) {
			case 'waiting-people':
        return <MoreInfoPerson idx={modalContents.idx} $dom={modalContents.$card} toggleModal={toggleModal} />
        // api 경력 조회 프로세스 만든 후
        // return isLogin() 
        // ? <WaitingInfo info={modalContents.info} idx={modalContents.idx} toggleModal={toggleModal} />
        // : <MoreInfoPerson idx={modalContents.idx} $dom={modalContents.$card} toggleModal={toggleModal} />
        
			case 'waiting-unions':
        return <MoreInfoUnion toggleModal={toggleModal} />
        // api 경력 조회 프로세스 만든 후
        // return isLogin() 
        // ? <WaitingUnions info={modalContents.info} idx={modalContents.idx} toggleModal={toggleModal} />
        // : <MoreInfoUnion toggleModal={toggleModal} />
			default:
				return <div style={{ width: '100%' }}> 상단의 메뉴를 선택해주세요 </div>;
		}
  }

	const mainSectionSelector = (current='waiting-people') => {
		
		switch (current) {
			case 'waiting-people':
				return <WaitingPeople openModal={toggleModal} filterValue={filterValue} setDataLength={setDataLength} />;
			case 'waiting-unions':
			  return <WaitingUnions openModal={toggleModal} />;
			default:
				return <div style={{ width: '100%' }}> 상단의 메뉴를 선택해주세요 </div>;
		}
	};




	const toggleModal = (cardObj) => {
		console.log("====toggleModal====", cardObj)
    // 모달 닫기
		if (typeof cardObj === 'boolean' && !cardObj) {
			document.querySelector('body').style.overflow = '';
			$modalRef.current.style.display = 'none';
      setModalContents({});
			return;
		}
    
    // 모달 set
		if (typeof cardObj.idx === 'number') {
      setModalContents(cardObj)
		}

		if (modalContents.idx !== null || cardObj !== null) {
			document.querySelector('body').style.overflow = 'hidden';
			$modalRef.current.style.display = 'flex';
		}
	};

	return (
		<>
			<HomeHeader current={query.mode??'waiting-people'} />
			<HomePagePosition className="HomePage">
				<HomeMainSectionPosition>
					<HomeMainSection ref={$mainRef}>{mainSectionSelector(query.mode)}</HomeMainSection>
				</HomeMainSectionPosition>
				<HomeSideSectionPosition filterVisible={filterVisible}>
					<Filter setFilterVisible={setFilterVisible} filterVisible={filterVisible} mode={query.mode} filterValue={filterValue} setFilterValue={setFilterValue} categories={categories} dataLength={dataLength} />
				</HomeSideSectionPosition>
			</HomePagePosition>
			<HomeModalPosition ref={$modalRef} onClick={() => { toggleModal(false); }} >
				<HomeModalMain onClick={(e) => { e.stopPropagation(); }} >
          {/* 위치 판별 후 렌더 */}
          {modalSectionSelector(query.mode)}
				</HomeModalMain>
			</HomeModalPosition>
		</>
	);
};

const HomePagePosition = styled(Responsive)`
	position: relative;
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
	padding-right:0;
	padding-left:0;
`;

const HomeMainSectionPosition = styled.div`
	width: 100%;
	max-width:1009px;
	height: 100%;
	margin-left:auto;

	display:flex;
	justify-content:center;
	align-items:center;
`

const HomeMainSection = styled.main`
	width: 100%;
	height: 100%;
	padding: 2rem 1rem 2rem 1rem;
	display: inline-grid;
	grid-template-columns: repeat(3,minmax(297px,329px));
	grid-template-rows: 1fr 1fr 1fr;
	gap: 36px 27px;
	/* @media screen and (max-width:1435px){
		grid-template-columns: repeat(auto-fill,minmax(297px,319px));
	} */
	@media screen and (max-width:1270px){
		grid-template-columns: repeat(auto-fill,minmax(297px,329px));
	} 
`;

const HomeModalPosition = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	right:0;
	bottom:0;
	z-index: 2;

	background-color: rgba(255, 255, 255, 0.5);
	display: none;
	justify-content: center;
	align-items: center;
`;


const HomeModalMain = styled.div`
	width: 30vw;
	min-width: 720px;
	min-height: 426px;
	border-radius:10px;
	background-color: white;
	box-shadow: 0 5px 7px -1px gray;

	z-index: 3;

	@media screen and (max-width:720px){
		width:100%;
		min-width: 0;

		margin:0 1rem;
	}
`;
const HomeSideSectionPosition = styled.aside`
	width: 267px;
	min-height: calc(100vh - 8rem);
	position: sticky;
	top: 4rem;
	overflow:scroll;

	${props =>
    props.filterVisible ?
    css`
		border-left: 1px solid #C4C4C4;
		box-shadow: -2px 0px 3px  rgba(0, 0, 0, 0.1);
    ` 
	:
	css`
		display:flex;
		align-items : flex-start;
		justify-content : center;
		margin-top:35px;
	`
	}

	@media all and (max-width:500px){
		display:none;
	}

`;

export default MainPage;
