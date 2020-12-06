import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Select } from 'antd';

import SchoolInput from '../../components/association_create/SchoolInput';

const AdditionalInfo = (props) => {
	const {} = props;

	const [schoolSelect, setSchoolSelect] = useState(null);
	const [schoolInputs, setSchoolInputs] = useState([]);
	const [schoolCount, setSchoolCount] = useState(2);

	const addSchoolInput = (count) => {
		let selected = schoolSelect;
		let tmpSchoolInputs = schoolInputs;
		tmpSchoolInputs.push([count, selected, '']);
		setSchoolInputs(tmpSchoolInputs);
		setSchoolCount(count + 1);
	};

	const onChangeSchoolSelect = (val) => {
		setSchoolSelect(val);
	};

	const onSchoolChange = (schoolInfo) => {
		console.log(schoolInfo);
		let tmpSchoolInputs = schoolInputs;
		tmpSchoolInputs.map((schoolInput) => {
			schoolInput[0] == schoolInfo.count ? (schoolInput[2] = schoolInfo.value) : (schoolInput[2] = schoolInput[2]);
		});
		setSchoolInputs(tmpSchoolInputs);
	};

	return (
		<AdditionalInfoLayout>
			<h1> 추가 정보 </h1>
			<HeadlineBottomBorder />
			학력 사항
			<div className="row">
				<div className="flex items-center" style={{ display: 'flex' }}>
					<Form layout="horizontal" size="large" style={{ width: '100%' }}>
						<Form.Item label="학력 사항" required tooltip="필수 기입 사항입니다" id="school-select">
							<Select onChange={onChangeSchoolSelect} placeholder="입력하실 학력 사항을 선택해주세요">
								<Select.Option value="high">고등학교</Select.Option>
								<Select.Option value="univ">대학교(학사)</Select.Option>
								<Select.Option value="grad">대학원(석사)</Select.Option>
								<Select.Option value="doc">대학원(박사)</Select.Option>
							</Select>
						</Form.Item>
					</Form>
					<Button
						size="large"
						style={{ display: 'flex' }}
						onClick={() => {
							addSchoolInput(schoolCount);
						}}
					>
						+
					</Button>
				</div>
			</div>
			<div className="row">
				<div className="school-inputs">
					{schoolInputs.map((each, index) => (
						<SchoolInput type={each[1]} count={each[0]} key={index} onSchoolChange={onSchoolChange} />
					))}
				</div>
			</div>
			<div className="row">
				<div className="left-column">연락처</div>
				<div className="right-column">000</div>
			</div>
		</AdditionalInfoLayout>
	);
};

const AdditionalInfoLayout = styled.section`
	display: flex;
	flex-direction: column;
	.row {
		display: flex;
		.left-column {
			color: blue;
			flex: 1 1 0;
		}
		.right-column {
			color: blue;
			flex: 3 1 0;
		}
	}
`;

const HeadlineBottomBorder = styled.div`
	border-bottom: 2px solid;
	margin-bottom: 2rem;
`;
const AdditionalInfoColumn = styled.section`
	display: flex;
`;

export default AdditionalInfo;
