import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Responsive from 'components/common/Responsive';
import UnionCreateHeaderBusiness from 'components/Header/UnionCreateHeaderBusiness';
import UnionCreateContainer from 'containers/UnionCreateContainer';

import styles from "lib/styles";

const UnionCreateBusinessPage = () => {
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
		<UnionPageLayout>
      <UnionPagePosition>
      <UnionCreateHeaderBusiness current={1}></UnionCreateHeaderBusiness>
			<br />
      <UnionCreateContainer />
      {/* <AssociationMainSection ref={mainRef}>{mainSectionSelector(location.pathname.split('/').slice(-1)[0])}</AssociationMainSection> */}
      </UnionPagePosition>
		</UnionPageLayout>
	);
};

const UnionPagePosition = styled(Responsive)`
	position: relative;
	max-width: 1280px;
`;

const UnionPageLayout = styled.div`
  width: 100%;
`;
export default UnionCreateBusinessPage;