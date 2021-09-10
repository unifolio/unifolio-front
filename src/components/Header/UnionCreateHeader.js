import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import styles from 'lib/styles';

const UnionCreateHeader = ({ location, current }) => {
	const [titleIdx, setTitileIdx] = useState(current - 1);
	
  const url = location.pathname;
	const titles = ['Step 1. 업무진행조합원 개인정보 입력', 'Step 2. 조합 정보 입력', 'Step 3. 조합 사무소 정보 입력', 'Step 4. 조합원 상세 모집계획', 'Step 5. 최종 확인'];
	if (titleIdx !== current - 1) {
		setTitileIdx(current - 1);
	}

	const titleSelector = () => {
		return titles[titleIdx];
	};

	return (
		<UnionCreateHeaderPosition className="UnionCreateHeader">
			<UnionCreateHeaderLayout>
				<div className="associationheader-item">{titleSelector()}</div>
				<div className="associationheader-item">
					<span>
						<span className="active">1</span> > 2 > 3 > 4
					</span>
				</div>
			</UnionCreateHeaderLayout>
		</UnionCreateHeaderPosition>
	);
};

const UnionCreateHeaderPosition = styled.div`
	position: relative;
	z-index: -1;
	height: 4rem;
`;

const UnionCreateHeaderLayout = styled.div`
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.associationheader-item {
		font-size: 1rem;

		display: flex;
	}
	.active {
		color: ${styles.palette.unifolioBlue};
	}
`;

export default withRouter(UnionCreateHeader);
