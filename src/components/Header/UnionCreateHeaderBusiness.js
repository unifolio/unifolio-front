import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import styles from 'lib/styles';
import useFetchUserToken from "modules/hooks/useFetchUserToken";

const UnionCreateHeaderBusiness = ({ location, current }) => {
	const [titleIdx, setTitileIdx] = useState(current - 1);
  const { user } = useFetchUserToken();
	
	const titles = [
    'Step 1. 업무집행조합원 개인정보 입력: 법인 대표자',
    'Step 2. 업무집행조합원 개인정보 입력: 투자심사역', 
    'Step 3. 조합 정보 입력', 
    'Step 4. 조합 사무소 정보 입력', 
    'Step 5. 조합원 상세 모집계획',
  ];
	
  if (titleIdx !== current - 1) {
		setTitileIdx(current - 1);
	}
  
  useEffect(() => {
    if (user === null) return;
    if (user.education.length === 0 || !user.address_business) {
      alert("유저 정보를 올바르게 수정 후 다시 시도해 주세요.");
      window.location.href = "/profile"
    }
  }, [ user ])

	return (
		<UnionCreateHeaderPosition className="UnionCreateHeader">
			<UnionCreateHeaderLayout>
				<div className="associationheader-item">{titles[titleIdx]}</div>
				<div className="associationheader-item">
          {titles.map((title, i) => {
            return (
              <React.Fragment key={title}>
                <UnionCreateIndicator isActive={(current >= i+1)}> {i+1} </UnionCreateIndicator>
                {i+1 !== titles.length && <UnionCreateIndicatorHr />}
              </React.Fragment>
            )
          })}					
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
    align-items: center;
	}
	.active {
		color: ${styles.palette.unifolioBlue};
	}
`;

const UnionCreateIndicator = styled.div`
  width: 25px;
  height: 25px;
  
  border-radius: 50%;
  box-sizing: border-box;
  
  ${({ isActive }) => {
    return isActive 
    ? 
    css`
      border: 1px solid ${styles.palette.unifolioBlue};
      color: ${styles.palette.unifolioBlue};
    `
    :
    css`
      border: 1px solid #c4c4c4;
      color: #c4c4c4;
    `
  }}
  /* font-weight: bold; */

  display: flex;
  align-items: end;
  justify-content: center;
`

const UnionCreateIndicatorHr = styled.hr`
  width: 10px;

`

export default withRouter(UnionCreateHeaderBusiness);