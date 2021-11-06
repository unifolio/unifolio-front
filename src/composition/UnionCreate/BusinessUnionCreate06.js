import React, { useRef } from 'react';
import styled from 'styled-components';

import { Button, Checkbox, Card } from 'antd';

const BusinessUnionCreate06 = ({ user, unionCreateInputData, onClickNext, onClickBack }) => {

	const handleNext = () => {
		// 데이터 넘김
		// console.log('handleNext', layoutRef.current);
		onClickNext({}, 6);
	};

  const handlePrev = () => {
    onClickBack(5)
  }

	return (
		<BusinessUnionCreate06Layout>
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
          <AdditionalInfoRow style={{ alignItems: "center" }}>
            <NextButton onClick={handleNext}>완료</NextButton><br />
            <NextButton onClick={handlePrev}>이전 단계로 돌아가기</NextButton>
          </AdditionalInfoRow>
				</div>
			</div>
		</BusinessUnionCreate06Layout>
	);
};

const BusinessUnionCreate06Layout = styled.div`
  span {
    margin-left: 10px;
    margin-right: 10px;

    display:flex;
    align-items: center;
    flex-shrink: 0; // == flex-basis: content-size 
  }
`;

const AdditionalInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  
  & + & {
    margin-top: 24px;
  } 
`;

const NextButton = styled.button`
  width: 50%;
  height: 3rem;
  border: none;
  padding: 0 1rem;
`
export default BusinessUnionCreate06;