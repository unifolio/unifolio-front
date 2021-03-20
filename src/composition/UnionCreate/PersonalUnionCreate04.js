import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Table, Space } from 'antd';

const PersonalUnionCreate04 = (props) => {
	const { onClickNext, className } = props;
	const { TextArea } = Input;
	useEffect(() => {
		document.querySelector('.ant-pagination').style.display = 'none';
	}, []);
	const columns = [
		{
			title: '회차',
			dataIndex: '회차',
			key: '회차',
		},
		{
			title: '투자',
			dataIndex: '투자',
			key: '투자',
			render: () => <Input />,
		},
		{
			title: '회수',
			dataIndex: '회수',
			key: '회수',
			render: () => <Input />,
		},
	];

	const data = [
		{
			key: '1',
			회차: '1차 연도',
		},
		{
			key: '2',
			회차: '2차 연도',
		},
		{
			key: '3',
			회차: '3차 연도',
		},
		{
			key: '4',
			회차: '4차 연도',
		},
		{
			key: '5',
			회차: '총합',
		},
	];

	const layoutRef = useRef();
	const handleNext = (e) => {
		// 데이터 넘김
		// console.log('handleNext', layoutRef.current);
		// onClickNext({ EducationInputs, careerInputs }, 1, layoutRef.current);
	};

	return (
		<div className={className} ref={layoutRef}>
			<div className="container">
				<div className="my-5">
					<div className="flex items-center my-1 mb-3">
						<h2> 사모 방식에 의한 조합원 모집 계획 </h2>
						<TextArea rows={4} />
					</div>
					<div className="flex items-center my-1 mb-3">
						<h2> 연도별 투자 및 회수 예정 금액 서술 </h2>
						<Table columns={columns} dataSource={data} />
					</div>
					<div className="flex items-center my-1 mb-3">
						<h2> 관리 보수 지급 및 시기 서술 </h2>
						<TextArea rows={4} placeholder="관리보수 지급 시기(연초, 연말, 매월, 매분기, 매반기 등), 보수 지급 규모 등 입력" />
					</div>
					<div className="flex items-center my-1 mb-3">
						<h2> 추가 정보 기재</h2>
						1. 투자 대상 기업 선정시 운영위원회에서 일반조합원은 <Input name={`detail_address`} style={{ width: '10%' }} size="small" /> 인 이상 구성 <br />
						2. 조합 해산 시 자금 분배 절차를 위해 전체 조합원의 <Input name={`detail_address`} style={{ width: '10%' }} size="small" /> % 이상 참석 <br />
						3. 전체 조합원 대상 연 <Input name={`detail_address`} style={{ width: '10%' }} size="small" /> 회 이상의 투자보고회를 개최하고 투자 보고서 작성 <br />
						4. 목표 수익률 <Input name={`detail_address`} style={{ width: '10%' }} size="small" /> % 이상이면 초과 수익의 <Input name={`detail_address`} style={{ width: '10%' }} size="small" /> % 를 업무집행조합원(GP)에게 지급 <br />
					</div>
					<br />
					<Button onClick={handleNext} size="large">
						다음 단계 진행하기
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PersonalUnionCreate04;
