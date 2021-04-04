import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Card } from 'antd';

const PersonalUnionCreate05 = (props) => {
	const { onClickNext, className } = props;

	const layoutRef = useRef();
	const handleSuccess = (e) => {
		// 데이터 넘김
		// console.log('handleNext', layoutRef.current);
		onClickNext({}, 5, layoutRef.current);
	};

	return (
		<PersonalUnionCreate05Layout className={className} ref={layoutRef}>
			<div className="container w-2/5 mx-auto">
				<div className="my-5">
					<div className="flex items-center">
						<h2> 신규 개인투자조합 동의 </h2>
						<Card hoverable>
							<Checkbox /> 모집 계획에 대한 심사 결과 및 피드백은 영업일을 기준으로 최대 2일이 소요됩니다.
						</Card>
						<Card hoverable>
							<Checkbox /> 심사 결과 및 피드백이 완료되면 계정에 등록된 이메일 주소 및 연락처로 관련 내용을 받아볼 수 있습니다.
						</Card>
						<Card hoverable>
							<Checkbox /> 심사 후 조합 결성 완료 시, 조합 관리 메뉴 내의 결성 대기 중인 개인투자조합에서 현황을 확인하실 수 있습니다.
						</Card>
						{/* <Card hoverable>
							<Checkbox /> 모두 확인했습니다.
						</Card> */}
					</div>
					<br />
					<Button onClick={handleSuccess} size="large">
						완료
					</Button>
				</div>
			</div>
		</PersonalUnionCreate05Layout>
	);
};

const PersonalUnionCreate05Layout = styled.div`
  
  span {
    margin-left: 10px;
    margin-right: 10px;

    display:flex;
    align-items: center;
    flex-shrink: 0; // == flex-basis: content-size 
  }

`;

export default PersonalUnionCreate05;
