import React from 'react';
import styled from "styled-components";

import CreateUnion from 'composition/Profile/CreateUnion';

import Responsive from 'components/common/Responsive';

const UnionNewPage = () => {
  return (
    <UnionNewPageLayout>
      <CreateUnion />
    </UnionNewPageLayout>
  )
}

const UnionNewPageLayout = styled(Responsive)`
	height: calc(100vh - 8rem); /* 레거시 */
	max-width: 1280px;
  margin: auto;

	display: flex;
	flex-direction: column;
`;

export default UnionNewPage;
