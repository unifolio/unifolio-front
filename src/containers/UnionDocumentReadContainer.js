import React, { useState, useEffect } from 'react';

import Union from 'composition/Union';
import Loading from 'components/Loading';
import API from '../lib/api';

const UnionDocumentReadContainer = () => {
	const [unionData, setUnionData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			// 임시
			const fetchUnion = await API.get.unions(1);
			setUnionData(fetchUnion.data.data);
			// setUsers([]);
		};
		fetchData();
	}, []);

	const createDocument = async (bool) => {
		setIsLoading(true);
		const response = await API.get.create_protocol(1);
		if (response.status === 403) {
			alert('문서 오류 입니다.');
		} else {
			console.log(response.data);
			setIsLoading(false);
			alert('문서 제작이 완료되었습니다.');
			document.querySelector('.download-button').style.display = 'block';
		}
	};

	const downloadDocument = async (bool) => {
		const response = await API.get.get_protocol(1);
		if (response.status === 403) {
			alert('문서 오류 입니다.');
		} else {
			console.log(response.data);
			window.location.href = response.data.url;
		}
	};
	return (
		<>
			{isLoading && <Loading />}
			<Union unionData={unionData} createDocument={createDocument} downloadDocument={downloadDocument} />
		</>
	);
};

export default UnionDocumentReadContainer;
