import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import styled from 'styled-components';
import Responsive from '../common/Responsive.js';

import palette from '../../lib/styles/palette.js';

const AssociationCreateHeaderPosition = styled.div`
	position: relative;
	z-index: -1;
	height: 4rem;
	box-shadow: 1px 2px 5px grey;
	background-color: rgba(74, 85, 104, 0.7);
`;

const AssociationCreateHeaderLayout = styled.div`
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: space-around;

	.associationheader-item {
		color: white;
		font-size: 1rem;

		display: flex;
	}
	.active {
		color: ${palette.blue[0]};
	}
`;

const AssociationCreateHeader = (props) => {
	const { location, current } = props;
	const [titleIdx, setTitileIdx] = useState(current - 1);
	const url = location.pathname;
	const titles = ['Step 1. 업무진행조합원 개인정보 입력', 'Step 2. 조합 정보 입력', 'Step 3. 조합 사무소 정보 입력', 'Step 4. 조합원 상세 모집계획', 'Step 5. 최종 확인'];
	if (titleIdx !== current - 1) {
		setTitileIdx(current - 1);
	}

	const titleSelector = () => {
		return titles[titleIdx];
		// return titles[0];
	};

	return (
		<AssociationCreateHeaderPosition className="AssociationCreateHeader">
			<AssociationCreateHeaderLayout>
				<div className="associationheader-item">{titleSelector()}</div>
				<div className="associationheader-item">
					<span>
						<span className="active">1</span> > 2 > 3 > 4
					</span>
				</div>
			</AssociationCreateHeaderLayout>
		</AssociationCreateHeaderPosition>
	);
};

export default withRouter(AssociationCreateHeader);
