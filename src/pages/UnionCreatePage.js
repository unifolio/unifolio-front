import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Responsive from 'components/common/Responsive';
import UnionCreateHeader from 'components/Header/UnionCreateHeader';
import UnionCreateContainer from 'containers/UnionCreateContainer';

import styles from "lib/styles";

const UnionCreatePage = () => {
	// console.log('props', props);
	// const { location } = props;
	// const query = qs.parse(location.search, { ignoreQueryPrefix: true });
	const mainRef = React.createRef();

	return (
		<UnionPageLayout>
      <UnionPagePosition>
      <UnionCreateHeader current={1}></UnionCreateHeader>
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
export default UnionCreatePage;
