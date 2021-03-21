import React, { useEffect } from 'react';

import styled from 'styled-components';
import Responsive from 'components/common/Responsive.js';

const Union = (props) => {
	const { unionData, createDocument, downloadDocument } = props;
	useEffect(() => {
		console.log(unionData);
		if (unionData == null) return;
	});

	const onClickCreate = () => {
		alert('조합 책임 서류를 만듭니다. 잠시만 기다려주세요.');
		createDocument(true);
	};

	const onClickDownload = () => {
		alert('조합 책임 서류를 다운로드 합니다. 잠시만 기다려주세요.');
		downloadDocument(true);
	};
	return (
		<UnionPosition>
			<UnionBlock>
				<h1> 조합명 : {unionData?.name}</h1>
				<h3> 예상 집행액 : {unionData?.expected_amount}</h3>
				<div>조합 설명 : 새로운 조합 테스트 플랜입니다.</div>
			</UnionBlock>
			<button onClick={onClickCreate}>조합 책임 서류 만들기</button>
			<button onClick={onClickDownload} className={'download-button'} style={{ display: 'none' }}>
				조합 책임 서류 다운로드하기
			</button>
		</UnionPosition>
	);
};

// const UnionPosition = styled.div`
// 	display: flex;
// 	height: 600px;
// 	justify-content: center;
// 	align-items: center;
// `;

// const UnionBlock = styled.div`
// 	display: block;
// `;

const UnionPosition = styled(Responsive)`
	position: relative;
	height: calc(100vh - 10rem);
	max-width: 100%;

	display: flex;
	flex-direction: column;
`;

const UnionBlock = styled.div`
	width: 100%;
	height: 70%;
	margin-top: 5rem;
	padding-right: 1rem;

	display: flex;
	flex-direction: column;
	section {
		margin-bottom: 3rem;
	}

	.column {
		display: flex;
		flex-direction: row;

		.row {
			display: flex;
			flex-direction: column;
		}
	}

	.row {
		display: flex;
		flex-direction: column;

		.column {
			display: flex;
			flex-direction: row;
		}
	}
`;

export default Union;
