import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Responsive from 'components/common/Responsive';
import AssociationCreateHeader from 'components/Header/AssociationCreateHeader';

import UnionCreateContainer from 'containers/UnionCreateContainer';

const UnionPagePosition = styled(Responsive)`
	position: relative;
	max-width: 100%;
	display: flex;
`;

const UnionMainSection = styled.div`
	width: 100%;
	height: calc(100vh - 8rem);
	padding-right: 8rem;
	padding-left: 8rem;

	display: flex;
	align-items: center;
	/* justify-items: center; */
`;

const UnionCreatePage = () => {
	// console.log('props', props);
	// const { location } = props;
	// const query = qs.parse(location.search, { ignoreQueryPrefix: true });
	const mainRef = React.createRef();

	// const mainSectionSelector = (current) => {
	// 	console.log('mainSectionSelector', current);
	// 	switch (current) {
	// 		case 'personal-1':
	// 			return <PersonalAssociationCreate01 />;
	// 		case 'personal-2':
	// 			return <PersonalAssociationCreate02 />;
	// 		case 'personal-3':
	// 			return <PersonalAssociationCreate03 />;
	// 		case 'personal-4':
	// 			return <PersonalAssociationCreate04 />;
	// 		case 'personal-5':
	// 			return <PersonalAssociationCreate05 />;
	// 		default:
	// 			return <div style={{ width: '100%' }}> 상단의 메뉴를 선택해주세요 </div>;
	// 	}
	// };

	return (
		<>
			{/* <AssociationCreateHeader current={location.pathname.split('').slice(-1)[0]}></AssociationCreateHeader> */}
			<br />
			<UnionPagePosition className="UnionPage">
				<UnionCreateContainer />
				{/* <AssociationMainSection ref={mainRef}>{mainSectionSelector(location.pathname.split('/').slice(-1)[0])}</AssociationMainSection> */}
			</UnionPagePosition>
		</>
	);
};

export default UnionCreatePage;
