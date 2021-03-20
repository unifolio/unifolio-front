import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CreateUnion = () => {
	return (
		<CreateUnionLayout className="container">
			<section className="row">
				개인투자조합 설명 <br />
        lore Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</section>
			<section className="column">
				<div className="row">
					<h2> 개인 운용 </h2>
					<h3>다음과 같은 정보가 필요합니다.</h3>
					<br />
					업무집행조합원 정보 (학력 및 경력사항 포함), 신규 조합 정보 (출자 금액, 모집 기간, 모집 인원 등), 조합 사무소 정보, 조합 상세 모집 계획
					<br />
					<Link to="/union-create/personal">
            <button>
              개인이 운용할 신규 개인투자조합 만들기
            </button>
          </Link>
				</div>
				<div className="row">
					<h2> 법인 운용 </h2>
					<h3>다음과 같은 정보가 필요합니다.</h3>
					<br />
					법인 대표자 및 투자 심사역 정보 (학력 및 경력사항 포함), 신규 조합 정보 (출자 금액, 모집 기간, 모집 인원 등), 조합 사무소 정보, 조합 상세 모집 계획
					<br />
					<Link to="/union-create/business">
            <button>
              법인이 운용할 신규 개인투자조합 만들기
            </button>
          </Link>
				</div>
			</section>
		</CreateUnionLayout>
	);
};

const CreateUnionLayout = styled.div`
  &.container {
    margin-left: 75px;
    margin-right: 75px;
  }
  
  display:flex;
  flex-direction: column;
  
  .row {
    width: 100%;
    border: solid black 1px;
    padding: 30px 20px;

    display: flex;
    justify-content: center;
  }
  
  .column {
    display:flex;

    .row + .row {
      margin-left: 10px;
    }  
  }
`
export default CreateUnion;
