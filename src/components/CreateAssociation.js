import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CreateAssociation = () => {
	return (
		<>
			<section className="row">
				개인투자조합 설명 lore Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</section>
			<section className="column">
				<div className="row">
					<h3> 개인 운용 </h3>
					다음과 같은 정보가 필요합니다.
					<br />
					업무집행조합원 정보 (학력 및 경력사항 포함), 신규 조합 정보 (출자 금액, 모집 기간, 모집 인원 등), 조합 사무소 정보, 조합 상세 모집 계획
					<br />
					<Link to="/association-create/personal-1">조합 결성하기</Link>
				</div>
				<div className="row">
					<h3> 법인 운용 </h3>
					다음과 같은 정보가 필요합니다.
					<br />
					법인 대표자 및 투자 심사역 정보 (학력 및 경력사항 포함), 신규 조합 정보 (출자 금액, 모집 기간, 모집 인원 등), 조합 사무소 정보, 조합 상세 모집 계획
					<br />
					<Link to="/association-create/business-1">조합 결성하기</Link>
				</div>
			</section>
		</>
	);
};

export default CreateAssociation;
